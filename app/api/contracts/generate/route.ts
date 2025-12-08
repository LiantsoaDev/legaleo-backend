import fs from "fs/promises";
import path from "path";

import { NextRequest, NextResponse } from "next/server";
import { Agent, fetch as undiciFetch } from "undici";
import { prisma } from "@/lib/prisma";
import { getAllOnboardingDataForContract } from "@/utils/functions/contractGeneration";

interface QAItem {
  question: string;
  answer: string;
}

// Fonction pour créer un nouvel agent à chaque tentative (évite les problèmes de connexion persistante)
const createAnthropicAgent = () => new Agent({
  headersTimeout: 1800_000, // 30 minutes pour les headers
  bodyTimeout: 3600_000, // 60 minutes pour le body (génération de contrat très longue)
  connectTimeout: 120_000, // 2 minutes pour la connexion initiale
  keepAliveTimeout: 60_000, // 1 minute de keep-alive
  keepAliveMaxTimeout: 120_000, // 2 minutes max de keep-alive
  maxHeaderSize: 16384, // 16 KB pour les headers
});

/**
 * Charge le prompt depuis le fichier texte
 */
async function loadPromptTemplate(): Promise<string> {
  try {
    const promptPath = path.join(process.cwd(), "prompts", "contract-generation.txt");
    const promptText = await fs.readFile(promptPath, "utf-8");
    return promptText;
  } catch (error) {
    console.warn("Impossible de charger le fichier de prompt, utilisation du prompt par défaut");
    return "Tu es un juriste expert qui rédige un contrat de franchise complet en français.";
  }
}

/**
 * Construit le contenu du prompt avec les données Q/A
 */
function buildPromptContent(qaItems: QAItem[], promptTemplate: string): string {
  const qaContent = qaItems
    .map((item) => `Q: ${item.question}\nR: ${item.answer}`)
    .join("\n\n");

  return `${promptTemplate}\n\n${qaContent}`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "La clé ANTHROPIC_API_KEY est absente du fichier .env." },
      { status: 500 },
    );
  }

  try {
    const body = await req.json();
    const { contractId, userId } = body;

    if (!contractId || !userId) {
      return NextResponse.json(
        { error: "contractId et userId sont requis." },
        { status: 400 },
      );
    }

    // Récupérer le contrat depuis la base de données
    const contract = await prisma.contract.findUnique({
      where: { id: contractId },
      include: { contractType: true },
    });

    if (!contract) {
      return NextResponse.json(
        { error: "Contrat non trouvé." },
        { status: 404 },
      );
    }

    // Vérifier que l'utilisateur est le propriétaire du contrat
    if (contract.userId !== userId) {
      return NextResponse.json(
        { error: "Accès non autorisé à ce contrat." },
        { status: 403 },
      );
    }

    // Récupérer les données d'onboarding
    console.log(`[contracts/generate] Récupération des données d'onboarding pour l'utilisateur ${userId}...`);
    const qaItems = await getAllOnboardingDataForContract(userId);
    
    if (qaItems.length === 0) {
      return NextResponse.json(
        { error: "Aucune donnée d'onboarding trouvée. Veuillez compléter l'onboarding avant de générer un contrat." },
        { status: 400 },
      );
    }

    console.log(`[contracts/generate] ${qaItems.length} questions/réponses récupérées.`);

    // Ajouter les informations spécifiques du contrat aux Q/A
    if (contract.duration) {
      qaItems.push({
        question: "Durée du contrat",
        answer: contract.duration,
      });
    }
    if (contract.jurisdiction) {
      qaItems.push({
        question: "Juridiction",
        answer: contract.jurisdiction,
      });
    }
    if (contract.specificClause) {
      qaItems.push({
        question: "Clause spécifique",
        answer: contract.specificClause,
      });
    }

    // Charger le prompt template
    const promptTemplate = await loadPromptTemplate();

    // Construire le prompt final
    const promptText = buildPromptContent(qaItems, promptTemplate);

    // Charger le PDF de référence
    const pdfPath = path.join(process.cwd(), "private", "contrat_type", "contrat_type_v1.pdf");
    const pdfBuffer = await fs.readFile(pdfPath);
    const pdfBase64 = pdfBuffer.toString("base64");

    const messageContent = [
      {
        type: "text",
        text: promptText,
      },
      {
        type: "document",
        source: {
          type: "base64",
          media_type: "application/pdf",
          data: pdfBase64,
        },
      },
    ];

    // Mettre à jour le statut du contrat
    await prisma.contract.update({
      where: { id: contractId },
      data: { status: "generating" },
    });

    console.log("[contracts/generate] Appel Anthropic en cours…");
    console.log(`[contracts/generate] Taille du payload: ${JSON.stringify(messageContent).length} caractères`);
    
    let response;
    let retries = 5; // Augmenter à 5 tentatives
    let lastError: Error | null = null;
    let attempt = 0;
    
    // Tentative avec retry en cas d'erreur de connexion
    while (retries > 0) {
      attempt++;
      try {
        console.log(`[contracts/generate] Tentative ${attempt}/${5 - retries + 1}...`);
        
        const requestBody = {
          model: "claude-sonnet-4-5-20250929",
          max_tokens: 64000,
          temperature: 0.2,
          system:
            "Génère un contrat de franchise complet, directement exploitable et aligné sur le document de référence joint.",
          messages: [
            {
              role: "user",
              content: messageContent,
            },
          ],
        };

        const bodyString = JSON.stringify(requestBody);
        const bodySize = Buffer.byteLength(bodyString, 'utf8');
        console.log(`[contracts/generate] Taille du body: ${(bodySize / 1024 / 1024).toFixed(2)} MB`);

        response = await undiciFetch(
          "https://api.anthropic.com/v1/messages",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01",
              "Content-Length": bodySize.toString(),
            },
            dispatcher: createAnthropicAgent(), // Créer un nouvel agent à chaque tentative
            body: bodyString,
            // Options supplémentaires pour gérer les gros payloads
            signal: undefined, // Pas de signal d'annulation pour éviter les timeouts prématurés
          }
        );
        
        console.log(`[contracts/generate] Connexion réussie à la tentative ${attempt}`);
        break; // Succès, sortir de la boucle
      } catch (error: any) {
        lastError = error;
        retries--;
        
        const isSocketError = 
          error.code === 'UND_ERR_SOCKET' || 
          error.message?.includes('closed') ||
          error.message?.includes('ECONNRESET') ||
          error.message?.includes('ETIMEDOUT') ||
          error.message?.includes('ECONNREFUSED') ||
          error.message?.includes('ENOTFOUND') ||
          error.cause?.code === 'UND_ERR_SOCKET' ||
          (error.cause as any)?.code === 'UND_ERR_SOCKET';
        
        // Si c'est une erreur de connexion et qu'il reste des tentatives
        if (retries > 0 && isSocketError) {
          const delay = Math.min(10000 * attempt, 60000); // Délai progressif : 10s, 20s, 30s, 40s, 50s (max 60s)
          console.warn(
            `[contracts/generate] Erreur de socket (${error.code || error.message || 'unknown'}), ` +
            `nouvelle tentative dans ${delay / 1000} secondes... (${retries} tentatives restantes)`
          );
          console.warn(`[contracts/generate] Détails de l'erreur:`, {
            code: error.code,
            message: error.message,
            cause: error.cause,
            bytesWritten: (error as any).socket?.bytesWritten,
            bytesRead: (error as any).socket?.bytesRead,
          });
          
          // Attendre avant de réessayer
          await new Promise(resolve => setTimeout(resolve, delay));
          
          // Forcer le garbage collection si possible (aide à libérer les ressources)
          if (global.gc) {
            global.gc();
          }
          
          continue;
        }
        
        // Si ce n'est pas une erreur de connexion ou qu'il n'y a plus de tentatives, propager l'erreur
        console.error(`[contracts/generate] Erreur fatale après ${attempt} tentatives:`, error);
        throw error;
      }
    }
    
    if (!response) {
      const errorMessage = lastError 
        ? `Impossible d'obtenir une réponse de l'API Anthropic après ${attempt} tentatives. Dernière erreur: ${lastError.message}`
        : "Impossible d'obtenir une réponse de l'API Anthropic après plusieurs tentatives";
      throw new Error(errorMessage);
    }

    const anthropicRequestId =
      response.headers.get("x-request-id") ||
      response.headers.get("anthropic-request-id") ||
      "inconnu";
    console.log(
      `[contracts/generate] Réponse Anthropic reçue (status ${response.status}, requestId: ${anthropicRequestId})`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Anthropic API error", errorText);
      
      // Mettre à jour le statut en erreur
      await prisma.contract.update({
        where: { id: contractId },
        data: { status: "draft" },
      });

      return NextResponse.json(
        { error: "Échec de l'appel à l'API Anthropic.", details: errorText },
        { status: 502 },
      );
    }

    const { content } = (await response.json()) as {
      content?: { text?: string }[];
    };

    const generatedContract = content?.[0]?.text;

    if (!generatedContract) {
      await prisma.contract.update({
        where: { id: contractId },
        data: { status: "draft" },
      });

      return NextResponse.json(
        { error: "Aucun texte de contrat reçu depuis l'API Anthropic." },
        { status: 502 },
      );
    }

    console.log(
      `[contracts/generate] Contrat reçu (${generatedContract.length} caractères).`
    );

    // Sauvegarder le contrat généré dans la base de données
    await prisma.contract.update({
      where: { id: contractId },
      data: {
        content: generatedContract,
        status: "generated",
      },
    });

    return NextResponse.json({
      contract: generatedContract,
      contractId: contractId,
    });
  } catch (error) {
    console.error("Failed to generate franchise contract", error);
    return NextResponse.json(
      { error: "Impossible de générer le contrat de franchise.", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
