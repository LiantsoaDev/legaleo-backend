import { prisma } from "./prisma";

export const ONBOARDING_WORKFLOW_KEY = "onboarding" as const;
export const LEGAL_ONBOARDING_WORKFLOW_KEY = "legal_onboarding" as const;

export type WorkflowKey =
  | typeof ONBOARDING_WORKFLOW_KEY
  | typeof LEGAL_ONBOARDING_WORKFLOW_KEY;

export interface WorkflowStepDefinition {
  key: string;
  label: string;
}

export interface WorkflowDefinition {
  key: WorkflowKey;
  title: string;
  steps: WorkflowStepDefinition[];
  ctaHref?: string;
}

export const ONBOARDING_WORKFLOW: WorkflowDefinition = {
  key: ONBOARDING_WORKFLOW_KEY,
  title: "Mes premiers pas sur Legaleo",
  ctaHref: "/onboarding",
  steps: [
    { key: "identity", label: "Identité" },
    { key: "network_name", label: "Nom du réseau" },
    { key: "network_activity", label: "Secteur d'activité" },
    { key: "franchisee_count", label: "Nombre de franchisés" },
    { key: "network_type", label: "Type de réseau" },
    { key: "legal_support", label: "Accompagnement juridique" },
  ],
};

export const LEGAL_ONBOARDING_WORKFLOW: WorkflowDefinition = {
  key: LEGAL_ONBOARDING_WORKFLOW_KEY,
  title: "Onboarding juridique",
  ctaHref: "/dashboard/revision",
  steps: [
    { key: "diagnostic", label: "Diagnostic juridique" },
    { key: "documentation", label: "Collecte documentaire" },
    { key: "compliance", label: "Mise en conformité" },
    { key: "validation", label: "Validation finale" },
  ],
};

export const WORKFLOWS: WorkflowDefinition[] = [
  ONBOARDING_WORKFLOW,
  LEGAL_ONBOARDING_WORKFLOW,
];

export interface WorkflowProgress {
  definition: WorkflowDefinition;
  completedSteps: number;
  totalSteps: number;
  isCompleted: boolean;
}

export const getWorkflowDefinition = (
  key: WorkflowKey
): WorkflowDefinition => {
  const definition = WORKFLOWS.find((workflow) => workflow.key === key);
  if (!definition) {
    throw new Error(`Unknown workflow key: ${key}`);
  }
  return definition;
};

export const getUserWorkflowProgress = async (userId: string) => {
  const completions = await prisma.userStepCompletion.findMany({
    where: { userId },
  });

  const workflowProgress = WORKFLOWS.map<WorkflowProgress>((workflow) => {
    const completedSteps = completions.filter(
      (completion) => completion.workflow === workflow.key
    ).length;

    const totalSteps = workflow.steps.length;

    return {
      definition: workflow,
      completedSteps,
      totalSteps,
      isCompleted: completedSteps >= totalSteps && totalSteps > 0,
    };
  });

  const currentWorkflow =
    workflowProgress.find((workflow) => !workflow.isCompleted) ??
    workflowProgress[workflowProgress.length - 1];

  return {
    currentWorkflow,
    workflowProgress,
  };
};

export const hasCompletedOnboarding = async (userId: string) => {
  const onboardingDefinition = ONBOARDING_WORKFLOW;
  const completedSteps = await prisma.userStepCompletion.count({
    where: {
      userId,
      workflow: onboardingDefinition.key,
    },
  });

  if (completedSteps >= onboardingDefinition.steps.length) {
    return true;
  }

  const onboardingResponse = await prisma.onboardingResponse.findUnique({
    where: { userId },
    select: { id: true },
  });

  if (!onboardingResponse) {
    return false;
  }

  await prisma.userStepCompletion.createMany({
    data: onboardingDefinition.steps.map((step) => ({
      userId,
      workflow: onboardingDefinition.key,
      stepKey: step.key,
    })),
    skipDuplicates: true,
  });

  return true;
};
