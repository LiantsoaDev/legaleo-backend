"use client";

import { fetchOnboardings } from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { renderStepJeuneReseau } from "@/utils/functions";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Onboardings } from "./Onboarding";
import { OnboardingFormProvider } from "./OnboardingFormContext";

export const OnboardingJeuneReseau = ({ user }: any) => {
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
  const { id: userId } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchOnboardings({ title: "Onboarding jeune reseau", userId }));
  }, [dispatch, userId]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        {/* <LoadingSpinner /> */}
        <p>Chargement de votre onboarding...</p>
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
          renderStep={renderStepJeuneReseau}
        />
      </div>
    </OnboardingFormProvider>
  );
};
