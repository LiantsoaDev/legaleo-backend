import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

const toRecord = (value: unknown): Record<string, any> => {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return value as Record<string, any>;
  }
  return {};
};

export async function POST(req: NextRequest) {
  const { onboarding_id, userId, value } = await req.json();

  if (!onboarding_id || !userId) {
    return new Response(
      JSON.stringify({
        success: 0,
        message: "onboarding_id et userId sont requis",
      }),
      { status: 400 }
    );
  }

  const payloadValue = toRecord(value);

  try {
    const identifier = {
      userId: String(userId),
      onboarding_id: String(onboarding_id),
    };

    const existing = await prisma.onboardingAnswer.findUnique({
      where: {
        userId_onboarding_id: identifier,
      },
    });

    const existingValue = toRecord(existing?.value ?? {});
    const mergedValue = { ...existingValue, ...payloadValue };

    const onboadingAnswer = await prisma.onboardingAnswer.upsert({
      where: {
        userId_onboarding_id: identifier,
      },
      update: {
        value: mergedValue,
      },
      create: {
        userId: identifier.userId,
        onboarding_id: identifier.onboarding_id,
        value: mergedValue,
      },
    });
    return new Response(
      JSON.stringify({
        success: 1,
        message: "Reponse enregistrée",
        data: onboadingAnswer,
        value: mergedValue,
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
    const userId = searchParams.get("userId");

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

      let answer = null;
      if (userId) {
        const storedAnswer = await prisma.onboardingAnswer.findUnique({
          where: {
            userId_onboarding_id: {
              userId,
              onboarding_id: onboarding.id,
            },
          },
        });
        answer = storedAnswer?.value ?? null;
      }

      return new Response(
        JSON.stringify({
          success: 1,
          message: "Onboarding trouvé",
          data: onboarding,
          answer,
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
