// types/prisma.ts

import { Onboarding, OnboardingStep } from "@/app/generated/prisma";

// Type manuel pour Onboarding avec steps
export type OnboardingWithSteps = Onboarding & {
  steps: OnboardingStep[];
};

// Type manuel pour OnboardingStep avec onboarding
export type OnboardingStepWithOnboarding = OnboardingStep & {
  onboarding: Onboarding;
};
