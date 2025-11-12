import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { onboarding_id, userId, value } = await req.json();

  console.log("Received data:", { onboarding_id, userId, value });

  try {
    const onboadingAnswer = await prisma.onboardingAnswer.upsert({
      where: {
        userId_onboarding_id: {
          userId: String(userId),
          onboarding_id: String(onboarding_id),
        },
      },
      update: {
        value,
      },
      create: {
        userId: String(userId),
        onboarding_id: String(onboarding_id),
        value,
      },
    });
    return new Response(
      JSON.stringify({
        success: 1,
        message: "Reponse enregistrée",
        data: onboadingAnswer,
      }),
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return new Response(
      JSON.stringify({
        success: 0,
        message: "Erreur lors de l'enregistrement de la reponse",
      })
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // récupère le paramètre "name" de la requête
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("title");

    // si "name" est fourni, on cherche par nom
    if (name) {
      const onboarding = await prisma.onboarding.findFirst({
        where: {
          title: {
            equals: name,
            mode: "insensitive", // ignore majuscules/minuscules
          },
        },
        include: {
          steps: {
            include: { File: true },
          },
        },
      });

      if (!onboarding) {
        return new Response(
          JSON.stringify({
            success: 0,
            message: `Aucun onboarding trouvé avec le nom "${name}"`,
          }),
          { status: 404 }
        );
      }

      return new Response(
        JSON.stringify({
          success: 1,
          message: "Onboarding trouvé",
          data: onboarding,
        }),
        { status: 200 }
      );
    }

    // sinon, retourne tous les onboardings
    const allOnboardings = await prisma.onboarding.findMany({
      include: {
        steps: {
          include: { File: true },
        },
      },
    });

    return new Response(
      JSON.stringify({
        success: 1,
        message: "Liste complète des onboardings",
        data: allOnboardings,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: 0,
        message: "Erreur lors de la récupération des onboardings",
      }),
      { status: 500 }
    );
  }
}
