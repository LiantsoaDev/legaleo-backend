import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Vérifier que le modèle est disponible
    if (!prisma || !('contractType' in prisma)) {
      console.error("Le modèle ContractType n'est pas disponible dans le client Prisma. Veuillez exécuter 'npx prisma generate' et redémarrer le serveur.");
      return NextResponse.json(
        { 
          error: "Le modèle ContractType n'est pas disponible. Veuillez exécuter 'npx prisma generate' et redémarrer le serveur de développement." 
        },
        { status: 500 }
      );
    }

    const contractTypes = await prisma.contractType.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(contractTypes);
  } catch (error) {
    console.error("Erreur lors de la récupération des types de contrats:", error);
    return NextResponse.json(
      { 
        error: "Erreur lors de la récupération des types de contrats",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

