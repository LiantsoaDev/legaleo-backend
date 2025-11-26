"use client";

import { FullLoader } from "@/components/Loader";
import {
  fetchOnboardings,
  updateFormData,
} from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { renderStepReseauEtabli } from "@/utils/functions";
import { readJuridiqueOnboardingAnswers } from "@/utils/onboardingCookie";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Onboardings } from "./Onboarding";
import { OnboardingFormProvider } from "./OnboardingFormContext";

export const OnboardingReseauEtabli = ({ user }: any) => {
  const dispatch = useAppDispatch();

  const {
    steps,
    onboardings,
    currentStep,
    internalStep,
    formData,
    isLoading,
    error,
  } = useAppSelector((state) => state.onboarding);

  useEffect(() => {
    dispatch(fetchOnboardings({ title: "Onboarding reseau etabli" }));
  }, [dispatch]);

  useEffect(() => {
    const persistedAnswers = readJuridiqueOnboardingAnswers();
    if (persistedAnswers && Object.keys(persistedAnswers).length) {
      dispatch(updateFormData(persistedAnswers));
    }
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        {/* <LoadingSpinner /> */}
        <FullLoader />
      </div>
    );
  }

  if (error) {
    toast.error(error, { position: "top-right", theme: "colored" });
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        <p>Une erreur est survenue: {error}</p>
      </div>
    );
  }

  return (
    <OnboardingFormProvider value={formData}>
      <div className=" h-screen flex flex-col gap-7">
        <Onboardings
          steps={steps}
          onboardings={onboardings}
          currentStep={currentStep}
          internalStep={internalStep}
          formData={formData}
          renderStep={renderStepReseauEtabli}
          bgcolor="#087F83"
          progresscolor="bg-[#FFFFFF33] text-white"
        />
      </div>
    </OnboardingFormProvider>
  );
};
