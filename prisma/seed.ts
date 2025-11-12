// prisma/seed.ts
import { prisma } from "@/lib/prisma";
import { onboardingData, onboardingDataJeuneReseau } from "@/utils/data/data";
import { hashPassword } from "@/utils/functions";

async function main() {
  console.log("🌱 Seeding database...");

  // Vérifier si l'admin existe déjà
  let adminUser = await prisma.user.findUnique({
    where: { email: "admin@admin.com" },
  });

  // Créer l'admin si besoin
  if (!adminUser) {
    const hashedPassword = await hashPassword("admin@admin.com");
    adminUser = await prisma.user.create({
      data: {
        email: "admin@admin.com",
        name: "Super Admin",
        password: hashedPassword,
      },
    });
    console.log("👤 Admin créé :", adminUser.email);
  } else {
    console.log("👤 Admin déjà existant :", adminUser.email);
  }

  // Supprimer les anciennes données d'onboarding
  console.log("🧹 Suppression des anciennes données d'onboarding...");
  await prisma.file.deleteMany({});
  await prisma.onboardingAnswer.deleteMany({});
  await prisma.onboardingStep.deleteMany({});
  await prisma.onboarding.deleteMany({});
  console.log("✅ Données d'onboarding supprimées.");

  // Créer l'onboarding principal
  console.log("🚀 Création de l'onboarding principal...");
  await prisma.onboarding.create({
    data: {
      title: "Onboarding principal",
      steps: {
        create: onboardingData.step.map((step, index) => ({
          user: { connect: { id: adminUser.id } }, // ✅ user garanti existant
          stepNumber: index,
          title: step.title,
          description: step.description,
          duration: step.onboarding?.duration ?? null,
          placeholder: step.onboarding?.placeholder ?? null,
          tips: step.onboarding?.tips ?? null,
          options: step.onboarding?.options ?? [],
          now: step.onboarding?.now ?? [],
          prevision: step.onboarding?.prevision ?? [],
          optionsMultiples: step.onboarding?.optionsMultiples ?? [],
          File: step.onboarding?.files
            ? {
                create: step.onboarding.files.map((file) => ({
                  name: file.name,
                  accept: file.accept,
                  placeholder: file.placeholder,
                })),
              }
            : undefined,
        })),
      },
    },
  });

  // Créer l'onboarding jeune réseau
  console.log("🚀 Création de l'onboarding jeune réseau...");
  await prisma.onboarding.create({
    data: {
      title: "Onboarding jeune reseau",
      steps: {
        create: onboardingDataJeuneReseau.step.map((step, index) => ({
          user: { connect: { id: adminUser.id } }, // ✅ même admin
          stepNumber: index,
          title: step.title,
          description: step.description,
          duration: step.onboarding?.duration ?? null,
          placeholder: step.onboarding?.placeholder ?? null,
          tips: step.onboarding?.tips ?? null,
          options: step.onboarding?.options ?? [],
          now: step.onboarding?.now ?? [],
          prevision: step.onboarding?.prevision ?? [],
          optionsMultiples: step.onboarding?.optionsMultiples ?? [],
          File: step.onboarding?.files
            ? {
                create: step.onboarding.files.map((file) => ({
                  name: file.name,
                  accept: file.accept,
                  placeholder: file.placeholder,
                })),
              }
            : undefined,
        })),
      },
    },
  });

  console.log("✅ Seed terminé avec succès !");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Erreur durant le seed :", e);
    await prisma.$disconnect();
    process.exit(1);
  });
