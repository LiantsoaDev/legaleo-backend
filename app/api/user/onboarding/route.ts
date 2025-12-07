import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

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

type FileDescriptor = { name: string; type: string; content: string };

const isFileDescriptor = (value: unknown): value is FileDescriptor =>
  Boolean(
    value &&
    typeof value === "object" &&
    "name" in value &&
    "content" in value &&
    typeof (value as any).content === "string"
  );

const ensureDirectory = async (dir: string) => {
  await fs.mkdir(dir, { recursive: true });
};

const saveFileAndReturnPath = async (
  descriptor: FileDescriptor,
  userId: string
): Promise<string> => {
  const uploadDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    "juridique",
    userId
  );
  await ensureDirectory(uploadDir);

  const sanitizedName = path.basename(descriptor.name);
  const fileName = `${Date.now()}-${sanitizedName}`;
  const base64Content = descriptor.content.includes("base64,")
    ? descriptor.content.split("base64,")[1]
    : descriptor.content;
  const buffer = Buffer.from(base64Content, "base64");

  const absolutePath = path.join(uploadDir, fileName);
  await fs.writeFile(absolutePath, buffer);

  return path.posix.join("/uploads", "juridique", userId, fileName);
};

const transformPayloadValue = async (
  value: any,
  userId: string
): Promise<any> => {
  if (isFileDescriptor(value)) {
    return saveFileAndReturnPath(value, userId);
  }

  if (Array.isArray(value)) {
    const resolved = await Promise.all(
      value.map((item) => transformPayloadValue(item, userId))
    );
    return resolved;
  }

  if (value && typeof value === "object") {
    const entries = await Promise.all(
      Object.entries(value).map(async ([key, val]) => [
        key,
        await transformPayloadValue(val, userId),
      ])
    );
    return Object.fromEntries(entries);
  }

  return value;
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

  // Vérifier que l'utilisateur existe dans la base de données
  const userExists = await prisma.user.findUnique({
    where: { id: String(userId) },
  });

  if (!userExists) {
    return new Response(
      JSON.stringify({
        success: 0,
        message: "Utilisateur non trouvé",
      }),
      { status: 404 }
    );
  }

  const payloadValue = toRecord(value);

  try {
    const identifier = {
      userId: String(userId),
      onboarding_id: String(onboarding_id),
    };

    const userIdString = String(userId);
    const transformedValue = await transformPayloadValue(payloadValue, userIdString);

    const existing = await prisma.onboardingAnswer.findUnique({
      where: {
        userId_onboarding_id: identifier,
      },
    });

    const existingValue = toRecord(existing?.value ?? {});
    const mergedValue = { ...existingValue, ...transformedValue };

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
        // Vérifier que l'utilisateur existe
        const userExists = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (!userExists) {
          return new Response(
            JSON.stringify({
              success: 0,
              message: "Utilisateur non trouvé",
            }),
            { status: 404 }
          );
        }

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
