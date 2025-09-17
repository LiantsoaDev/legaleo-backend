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
    const onboarding = await prisma.onboarding.findMany({
      include: {
        steps: {
          include: { File: true },
        },
      },
    });
    return new Response(
      JSON.stringify({
        success: 1,
        message: "Reponse enregistrée",
        data: onboarding,
      }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: 0,
        message: "Erreur lors de la generation des reponses",
      })
    );
  }
}
