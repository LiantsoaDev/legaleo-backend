"use client";
import { OnboardingStep } from "@/app/generated/prisma";
import { handleNextStep, handlePrevStep, saveStepData } from "@/server";
import { renderStep } from "@/utils/functions";
import { OnboardingWithSteps } from "@/utils/types";
import {
  faLongArrowLeft,
  faLongArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useCallback } from "react";
import { OnboardingCard } from "../../Card";

interface OnboardingsProps {
  user: any;
  onboardingDatas: OnboardingWithSteps[] | null;
  onboardingSteps: OnboardingStep[];
  onboardingStep: number;
  setOnboardingStep: React.Dispatch<React.SetStateAction<number>>;
  setFormDataState: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  internalStep: number;
  setinternalStep: React.Dispatch<React.SetStateAction<number>>;
  internalCurrentStep: number;
  setInternalCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  type: "general" | "jeuneReseau" | "juridique";
}

export const Onboardings = ({
  user,
  onboardingDatas,
  onboardingSteps,
  onboardingStep,
  setOnboardingStep,
  setFormDataState,
  internalStep,
  setinternalStep,
  internalCurrentStep,
  setInternalCurrentStep,
  type,
}: OnboardingsProps) => {
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      saveStepData(setFormDataState, onboardingDatas, user);
    },
    [setFormDataState, onboardingDatas, user]
  );

  return (
    <div className="flex flex-row justify-between">
      <form
        onSubmit={handleSubmit}
        className="w-2/3 justify-between flex flex-col relative select-none"
      >
        {renderStep(
          onboardingStep,
          setinternalStep,
          internalStep,
          setInternalCurrentStep,
          internalCurrentStep,
          onboardingSteps,
          setOnboardingStep,
          setFormDataState,
          user,
          onboardingDatas,
          type
        )}
        <div className="fixed bottom-10 items-center right-[20%] translate-[-50%] bg-blue px-5 py-5 rounded-full flex gap-10 text-white text-xl">
          <button
            type="submit"
            onClick={() =>
              handlePrevStep(
                internalCurrentStep,
                internalStep,
                setOnboardingStep,
                setInternalCurrentStep,
                setFormDataState,
                user,
                onboardingDatas
              )
            }
          >
            <FontAwesomeIcon
              icon={faLongArrowLeft}
              className={`cursor-pointer transition ${
                onboardingStep === 0
                  ? "opacity-40 pointer-events-none"
                  : "opacity-100"
              }`}
            />
          </button>

          <button
            type="submit"
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
          >
            <FontAwesomeIcon
              icon={faLongArrowRight}
              className={`cursor-pointer transition`}
            />
          </button>
        </div>
      </form>
      <div className="bg-[#1F120E] w-[480px] rounded-l-4xl h-full px-16 py-20 flex flex-col gap-7 justify-center overflow-y-auto select-none">
        {onboardingSteps &&
          onboardingSteps.length > 0 &&
          onboardingSteps.map((onboarding: OnboardingStep, index) => (
            <OnboardingCard
              key={index}
              title={onboarding.title || "Bienvenu sur legaleo"}
              isActive={index + 1 === onboardingStep}
              isCompleted={index < onboardingStep}
              step={index + 1}
              isLast={index === onboardingSteps.length - 1}
              setOnboardingStep={setOnboardingStep}
            />
          ))}
      </div>
    </div>
  );
};
