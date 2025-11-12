"use client";
import { OnboardingStep } from "@/app/generated/prisma";

import {
  handleNextStep,
  handlePrevStep,
  saveStepData,
} from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { AppDispatch } from "@/lib/store";
import { OnboardingWithSteps } from "@/utils/types";
import {
  faLongArrowLeft,
  faLongArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useCallback } from "react";
import { OnboardingCard } from "../../Card";

type RenderStepFn = (
  currentStep: number,
  internalStep: number,
  userId: any,
  onboardingDatas: OnboardingWithSteps | null,
  dispatch: AppDispatch
) => React.ReactNode;

interface OnboardingsProps {
  steps: OnboardingStep[];
  onboardings: OnboardingWithSteps | null;
  currentStep: number;
  internalStep: number;
  formData: Record<string, any>;
  renderStep: RenderStepFn;
}

export const Onboardings = ({
  steps,
  onboardings,
  currentStep,
  internalStep,
  renderStep,
}: OnboardingsProps) => {
  const { id: userId } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const nextStepPayload = {
    userId: userId,
    onboardingDatas: onboardings,
    linkToRedirect: "/dashboard",
  };

  const prevStepPayload = {
    userId: userId,
    onboardingDatas: onboardings,
  };

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (userId && onboardings) {
        dispatch(saveStepData({ userId, onboardingDatas: onboardings }));
      }
    },
    [userId]
  );

  return (
    <div className="flex flex-row justify-between">
      <form
        onSubmit={handleSubmit}
        className="w-2/3 justify-between flex flex-col relative select-none"
      >
        {renderStep(currentStep, internalStep, userId, onboardings, dispatch)}
        <div className="fixed bottom-10 items-center right-[20%] translate-[-50%] bg-blue px-5 py-5 rounded-full flex gap-10 text-white text-xl">
          <button
            type="submit"
            onClick={() => dispatch(handlePrevStep(prevStepPayload))}
          >
            <FontAwesomeIcon
              icon={faLongArrowLeft}
              className={`cursor-pointer transition ${
                currentStep === 0
                  ? "opacity-40 pointer-events-none"
                  : "opacity-100"
              }`}
            />
          </button>

          <button
            type="submit"
            onClick={() => dispatch(handleNextStep(nextStepPayload))}
          >
            <FontAwesomeIcon
              icon={faLongArrowRight}
              className={`cursor-pointer transition`}
            />
          </button>
        </div>
      </form>
      <div className="bg-[#1F120E] w-[480px] rounded-l-4xl h-full px-16 py-20 flex flex-col gap-7 justify-center overflow-y-auto select-none">
        {steps &&
          steps.length > 0 &&
          steps.map((onboarding: OnboardingStep, index) => (
            <OnboardingCard
              key={index}
              title={onboarding.title || "Bienvenu sur legaleo"}
              isActive={index + 1 === currentStep}
              isCompleted={index < currentStep}
              step={index + 1}
              isLast={index === steps.length - 1}
              dispatch={dispatch}
              onboardingDatas={onboardings}
              userId={userId}
            />
          ))}
      </div>
    </div>
  );
};
