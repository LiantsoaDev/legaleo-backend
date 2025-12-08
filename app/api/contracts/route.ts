import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/contracts - Créer un nouveau contrat
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, contractTypeId, name, duration, jurisdiction, specificClause, cocontractantId } = body;

    if (!userId || !contractTypeId || !name) {
      return NextResponse.json(
        { error: "userId, contractTypeId et name sont requis." },
        { status: 400 },
      );
    }

    // Vérifier que le type de contrat existe
    const contractType = await prisma.contractType.findUnique({
      where: { id: contractTypeId },
    });

    if (!contractType) {
      return NextResponse.json(
        { error: "Type de contrat non trouvé." },
        { status: 404 },
      );
    }

    // Vérifier que l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé." },
        { status: 404 },
      );
    }

    // Créer le contrat
    const contract = await prisma.contract.create({
      data: {
        userId,
        contractTypeId,
        name,
        duration: duration || null,
        jurisdiction: jurisdiction || null,
        specificClause: specificClause || null,
        cocontractantId: cocontractantId || null,
        status: "draft",
      },
      include: {
        contractType: true,
      },
    });

    return NextResponse.json({
      success: true,
      contract,
    }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du contrat:", error);
    return NextResponse.json(
      { error: "Impossible de créer le contrat.", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

/**
 * GET /api/contracts - Récupérer un contrat par ID
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const contractId = searchParams.get("id");

    if (!contractId) {
      return NextResponse.json(
        { error: "Le paramètre 'id' est requis." },
        { status: 400 },
      );
    }

    const contract = await prisma.contract.findUnique({
      where: { id: contractId },
      include: {
        contractType: true,
        user: {
          select: {
            id: true,
            name: true,
            last_name: true,
            email: true,
          },
        },
      },
    });

    if (!contract) {
      return NextResponse.json(
        { error: "Contrat non trouvé." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      contract,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du contrat:", error);
    return NextResponse.json(
      { error: "Impossible de récupérer le contrat.", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
