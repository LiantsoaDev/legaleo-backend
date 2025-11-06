import { OnboardingStep } from "@/app/generated/prisma";
import { ConsentementRGPD, Welcome } from "@/components/Pages/Onboarding";
import { RecrutementFranchiser } from "@/components/Pages/Onboarding/RecrutementFranchiser";
import { RedactionContrat } from "@/components/Pages/Onboarding/RedactionContrat";
import { UserName } from "@/components/Pages/Onboarding/UserName";
import { VotreEnseigne } from "@/components/Pages/Onboarding/VotreEnseigne";
import { VotreReseau } from "@/components/Pages/Onboarding/VotreReseau";
import { handleNextStep } from "@/server";
import { OnboardingWithSteps } from "../types";

export const renderStep = (
  onboardingStep: number,
  setinternalStep: React.Dispatch<React.SetStateAction<number>>,
  internalStep: number,
  setInternalCurrentStep: React.Dispatch<React.SetStateAction<number>>,
  internalCurrentStep: number,
  onboardingSteps: OnboardingStep[],
  setOnboardingStep: React.Dispatch<React.SetStateAction<number>>,
  setFormDataState: React.Dispatch<React.SetStateAction<Record<string, any>>>,
  user: any,
  onboardingDatas: OnboardingWithSteps[] | null,
  type: "general" | "jeuneReseau" | "juridique"
) => {
  if (type === "general") {
    switch (onboardingStep) {
      case 1:
        return (
          <Welcome
            onClick={() =>
              handleNextStep(
                internalCurrentStep,
                internalStep,
                onboardingSteps,
                onboardingStep,
                setOnboardingStep,
                setInternalCurrentStep,
                setFormDataState,
                "/dashboard",
                user,
                onboardingDatas
              )
            }
          />
        );
      case 2:
        return <UserName />;
      case 3:
        return <VotreEnseigne />;
      case 4:
        return (
          <VotreReseau
            setInternatStep={setinternalStep}
            internalStep={internalStep}
            setCurrentStep={setInternalCurrentStep}
            currentStep={internalCurrentStep}
          />
        );
      case 5:
        return (
          <RecrutementFranchiser
            setInternatStep={setinternalStep}
            internalStep={internalStep}
            setCurrentStep={setInternalCurrentStep}
            currentStep={internalCurrentStep}
          />
        );
      case 6:
        return (
          <RedactionContrat
            setInternatStep={setinternalStep}
            internalStep={internalStep}
            setCurrentStep={setInternalCurrentStep}
            currentStep={internalCurrentStep}
            onClick={() =>
              handleNextStep(
                internalCurrentStep,
                internalStep,
                onboardingSteps,
                onboardingStep,
                setOnboardingStep,
                setInternalCurrentStep,
                setFormDataState,
                "/dashboard",
                user,
                onboardingDatas
              )
            }
          />
        );
      case 7:
        return <ConsentementRGPD />;
    }
  } else if (type === "jeuneReseau") {
    switch (onboardingStep) {
      case 1:
        return (
          <Welcome
            onClick={() =>
              handleNextStep(
                internalCurrentStep,
                internalStep,
                onboardingSteps,
                onboardingStep,
                setOnboardingStep,
                setInternalCurrentStep,
                setFormDataState,
                "/dashboard",
                user,
                onboardingDatas
              )
            }
          />
        );
      case 2:
        return <UserName />;
      case 3:
        return <VotreEnseigne />;
      case 4:
        return (
          <VotreReseau
            setInternatStep={setinternalStep}
            internalStep={internalStep}
            setCurrentStep={setInternalCurrentStep}
            currentStep={internalCurrentStep}
          />
        );
      case 5:
        return (
          <RecrutementFranchiser
            setInternatStep={setinternalStep}
            internalStep={internalStep}
            setCurrentStep={setInternalCurrentStep}
            currentStep={internalCurrentStep}
          />
        );
      case 6:
        return (
          <RedactionContrat
            setInternatStep={setinternalStep}
            internalStep={internalStep}
            setCurrentStep={setInternalCurrentStep}
            currentStep={internalCurrentStep}
            onClick={() =>
              handleNextStep(
                internalCurrentStep,
                internalStep,
                onboardingSteps,
                onboardingStep,
                setOnboardingStep,
                setInternalCurrentStep,
                setFormDataState,
                "/dashboard",
                user,
                onboardingDatas
              )
            }
          />
        );
      case 7:
        return <ConsentementRGPD />;
    }
  }
};
