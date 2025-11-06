// prisma/seed.ts
import { prisma } from "@/lib/prisma";
import { onboardingData, onboardingDataJeuneReseau } from "@/utils/data/data";
import { hashPassword } from "@/utils/functions";

async function main() {
  console.log("🌱 Seeding database...");
  // Créer un onboarding global
  const onboarding = await prisma.onboarding.create({
    data: {
      title: "Onboarding principal",
      steps: {
        create: onboardingData.step.map((step, index) => ({
          stepNumber: index,
          title: step.title,
          description: step.description,
          duration: step.onboarding?.duration || null,
          placeholder: step.onboarding?.placeholder || null,
          tips: step.onboarding?.tips || null,
          options: step.onboarding?.options || [],
          now: step.onboarding?.now || [],
          prevision: step.onboarding?.prevision || [],
          optionsMultiples: step.onboarding?.optionsMultiples || [],

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

  const onboardingJeuneReseau = await prisma.onboarding.create({
    data: {
      title: "Onboarding jeune reseau",
      steps: {
        create: onboardingDataJeuneReseau.step.map((step, index) => ({
          stepNumber: index,
          title: step.title,
          description: step.description,
          duration: step.onboarding?.duration || null,
          placeholder: step.onboarding?.placeholder || null,
          tips: step.onboarding?.tips || null,
          options: step.onboarding?.options || [],
          now: step.onboarding?.now || [],
          prevision: step.onboarding?.prevision || [],
          optionsMultiples: step.onboarding?.optionsMultiples || [],

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

  const isExistingAdminUsers = await prisma.user.findUnique({
    where: {
      email: "admin@admin.com",
    },
  });

  let adminUser = null;
  const hashedPassword = await hashPassword("admin@admin.com");

  if (!isExistingAdminUsers) {
    adminUser = await prisma.user.create({
      data: {
        email: "admin@admin.com",
        name: "Super Admin",
        password: hashedPassword,
      },
    });
    console.log("✅ Seed terminé !");
    console.log("👤 Admin créé :", adminUser.email);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
