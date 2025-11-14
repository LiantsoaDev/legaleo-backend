// types/prisma.ts

import {
  Onboarding,
  OnboardingAnswer,
  OnboardingStep,
} from "@/app/generated/prisma";

// Type manuel pour Onboarding avec steps
export type OnboardingWithSteps = Onboarding & {
  steps: OnboardingStep[];
  answers: OnboardingAnswer[];
};

// Type manuel pour OnboardingStep avec onboarding
export type OnboardingStepWithOnboarding = OnboardingStep & {
  onboarding: Onboarding;
};
