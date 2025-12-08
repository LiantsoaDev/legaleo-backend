import { prisma } from "@/lib/prisma";

interface QAItem {
  question: string;
  answer: string;
}

/**
 * Récupère les données d'onboarding général pour un utilisateur
 */
export async function getGeneralOnboardingData(userId: string): Promise<Record<string, any> | null> {
  try {
    const onboarding = await prisma.onboarding.findFirst({
      where: {
        title: {
          equals: "Onboarding principal",
          mode: "insensitive",
        },
      },
    });

    if (!onboarding) {
      console.warn("Onboarding général non trouvé");
      return null;
    }

    const answer = await prisma.onboardingAnswer.findUnique({
      where: {
        userId_onboarding_id: {
          userId,
          onboarding_id: onboarding.id,
        },
      },
    });

    return answer?.value as Record<string, any> || null;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'onboarding général:", error);
    return null;
  }
}

/**
 * Récupère les données d'onboarding juridique pour un utilisateur
 */
export async function getJuridiqueOnboardingData(userId: string): Promise<Record<string, any> | null> {
  try {
    const onboarding = await prisma.onboarding.findFirst({
      where: {
        OR: [
          { title: { contains: "juridique", mode: "insensitive" } },
          { title: { contains: "reseau etabli", mode: "insensitive" } },
        ],
      },
    });

    if (!onboarding) {
      console.warn("Onboarding juridique non trouvé");
      return null;
    }

    const answer = await prisma.onboardingAnswer.findUnique({
      where: {
        userId_onboarding_id: {
          userId,
          onboarding_id: onboarding.id,
        },
      },
    });

    return answer?.value as Record<string, any> || null;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'onboarding juridique:", error);
    return null;
  }
}

/**
 * Récupère les steps d'onboarding juridique pour mapper les questions
 */
export async function getJuridiqueOnboardingSteps(): Promise<Array<{ stepNumber: number; title: string | null; description: string | null }>> {
  try {
    const onboarding = await prisma.onboarding.findFirst({
      where: {
        OR: [
          { title: { contains: "juridique", mode: "insensitive" } },
          { title: { contains: "reseau etabli", mode: "insensitive" } },
        ],
      },
      include: {
        steps: {
          orderBy: {
            stepNumber: "asc",
          },
        },
      },
    });

    if (!onboarding) {
      return [];
    }

    return onboarding.steps.map((step) => ({
      stepNumber: step.stepNumber,
      title: step.title,
      description: step.description,
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des steps juridiques:", error);
    return [];
  }
}

/**
 * Convertit les données d'onboarding en format Q/A pour la génération de contrat
 */
export function convertOnboardingToQA(
  generalData: Record<string, any> | null,
  juridiqueData: Record<string, any> | null,
  steps: Array<{ stepNumber: number; title: string | null; description: string | null }>
): QAItem[] {
  const qaItems: QAItem[] = [];

  // Ajouter les données générales
  if (generalData) {
    Object.entries(generalData).forEach(([key, value]) => {
      if (value && typeof value === "string" && value.trim()) {
        // Formater la clé en question lisible
        const question = formatKeyToQuestion(key);
        qaItems.push({
          question,
          answer: value,
        });
      } else if (Array.isArray(value) && value.length > 0) {
        const question = formatKeyToQuestion(key);
        qaItems.push({
          question,
          answer: value.join(", "),
        });
      }
    });
  }

  // Ajouter les données juridiques avec leurs questions correspondantes
  if (juridiqueData && steps.length > 0) {
    // Créer un mapping des steps par numéro
    const stepMap = new Map(
      steps.map((step) => [step.stepNumber, step])
    );

    Object.entries(juridiqueData).forEach(([key, value]) => {
      if (value && (typeof value === "string" || Array.isArray(value))) {
        // Essayer de trouver la question correspondante depuis les steps
        let question = formatKeyToQuestion(key);
        
        // Si la clé contient un numéro de step, essayer de récupérer la question du step
        const stepMatch = key.match(/step(\d+)/i) || key.match(/(\d+)/);
        if (stepMatch) {
          const stepNum = parseInt(stepMatch[1]);
          const step = stepMap.get(stepNum);
          if (step?.title) {
            question = step.title;
          } else if (step?.description) {
            question = step.description;
          }
        }

        const answer = Array.isArray(value) ? value.join(", ") : value;
        if (answer && answer.trim()) {
          qaItems.push({
            question,
            answer: answer.trim(),
          });
        }
      } else if (value && typeof value === "object") {
        // Gérer les objets imbriqués
        Object.entries(value as Record<string, any>).forEach(([subKey, subValue]) => {
          if (subValue && typeof subValue === "string" && subValue.trim()) {
            const question = `${formatKeyToQuestion(key)} - ${formatKeyToQuestion(subKey)}`;
            qaItems.push({
              question,
              answer: subValue.trim(),
            });
          }
        });
      }
    });
  }

  return qaItems;
}

/**
 * Formate une clé de données en question lisible
 */
function formatKeyToQuestion(key: string): string {
  // Remplacer les underscores et tirets par des espaces
  let formatted = key.replace(/[_-]/g, " ");
  
  // Capitaliser la première lettre de chaque mot
  formatted = formatted
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return formatted;
}

/**
 * Récupère et merge toutes les données d'onboarding pour un utilisateur
 */
export async function getAllOnboardingDataForContract(userId: string): Promise<QAItem[]> {
  const [generalData, juridiqueData, steps] = await Promise.all([
    getGeneralOnboardingData(userId),
    getJuridiqueOnboardingData(userId),
    getJuridiqueOnboardingSteps(),
  ]);

  return convertOnboardingToQA(generalData, juridiqueData, steps);
}
