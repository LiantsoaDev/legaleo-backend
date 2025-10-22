import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ONBOARDING_WORKFLOW } from "@/lib/workflows";
import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const DOCUMENT_KEYS = [
  "status_entreprise",
  "kbis",
  "pacte_associe",
] as const;

type DocumentKey = (typeof DOCUMENT_KEYS)[number];

const ensureUploadDirectory = async (targetPath: string) => {
  await fs.mkdir(targetPath, { recursive: true });
};

const saveDocument = async (
  userId: string,
  key: DocumentKey,
  file: File
) => {
  const uploadsRoot = path.join(process.cwd(), "public", "uploads", userId);
  await ensureUploadDirectory(uploadsRoot);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const extension = path.extname(file.name) || "";
  const fileName = `${randomUUID()}${extension}`;
  const filePath = path.join(uploadsRoot, fileName);

  await fs.writeFile(filePath, buffer);

  return {
    name: key,
    path: path.join("uploads", userId, fileName),
    originalName: file.name,
    mimeType: file.type,
    size: file.size,
  };
};

const parseFranchiseeCount = (rawValue: FormDataEntryValue | null): string[] => {
  if (typeof rawValue !== "string") {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);
    if (Array.isArray(parsed)) {
      return parsed.filter((item) => typeof item === "string");
    }
  } catch (error) {
    console.error("Unable to parse franchiseeCount", error);
  }

  return [];
};

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { success: 0, message: "Utilisateur non authentifié" },
      { status: 401 }
    );
  }

  try {
    const formData = await req.formData();
    const firstName = (formData.get("firstName") as string | null)?.trim() ?? "";
    const lastName = (formData.get("lastName") as string | null)?.trim() ?? "";
    const networkName = (formData.get("networkName") as string | null)?.trim() ?? "";
    const networkActivity =
      (formData.get("networkActivity") as string | null)?.trim() ?? "";
    const networkType = (formData.get("networkType") as string | null)?.trim();
    const networkTypeOther =
      (formData.get("networkTypeOther") as string | null)?.trim() ?? "";
    const legalSupportPreference =
      (formData.get("legalSupportPreference") as string | null)?.trim() ?? "";
    const franchiseeCount = parseFranchiseeCount(
      formData.get("franchiseeCount")
    );

    const uploadedDocuments = [] as Array<{
      name: DocumentKey;
      path: string;
      originalName: string;
      mimeType: string;
      size: number;
    }>;

    await Promise.all(
      DOCUMENT_KEYS.map(async (key) => {
        const file = formData.get(key);
        if (file instanceof File) {
          const savedDocument = await saveDocument(session.user.id, key, file);
          uploadedDocuments.push(savedDocument);
        }
      })
    );

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: lastName,
        last_name: firstName,
      },
    });

    const onboarding = await prisma.onboardingResponse.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        firstName,
        lastName,
        networkName,
        networkActivity,
        franchiseeCount,
        networkType: networkType || null,
        networkTypeOther: networkTypeOther || null,
        legalSupportPreference: legalSupportPreference || null,
        documents:
          uploadedDocuments.length > 0
            ? {
                create: uploadedDocuments.map((doc) => ({
                  name: doc.name,
                  path: doc.path,
                  originalName: doc.originalName,
                  mimeType: doc.mimeType,
                  size: doc.size,
                })),
              }
            : undefined,
      },
      update: {
        firstName,
        lastName,
        networkName,
        networkActivity,
        franchiseeCount,
        networkType: networkType || null,
        networkTypeOther: networkTypeOther || null,
        legalSupportPreference: legalSupportPreference || null,
        documents:
          uploadedDocuments.length > 0
            ? {
                deleteMany: {},
                create: uploadedDocuments.map((doc) => ({
                  name: doc.name,
                  path: doc.path,
                  originalName: doc.originalName,
                  mimeType: doc.mimeType,
                  size: doc.size,
                })),
              }
            : undefined,
      },
      include: {
        documents: true,
      },
    });

    await prisma.userStepCompletion.createMany({
      data: ONBOARDING_WORKFLOW.steps.map((step) => ({
        userId: session.user.id,
        workflow: ONBOARDING_WORKFLOW.key,
        stepKey: step.key,
      })),
      skipDuplicates: true,
    });

    return NextResponse.json({
      success: 1,
      message: "Vos informations d'onboarding ont été enregistrées.",
      data: onboarding,
    });
  } catch (error) {
    console.error("Unable to save onboarding", error);
    return NextResponse.json(
      {
        success: 0,
        message: "Une erreur est survenue lors de l'enregistrement de vos informations.",
      },
      { status: 500 }
    );
  }
}
