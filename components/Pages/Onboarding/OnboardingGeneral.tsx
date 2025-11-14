"use client";

import { fetchOnboardings } from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { renderStep } from "@/utils/functions";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Onboardings } from "./Onboarding";

export const OnboardingGeneral = () => {
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
    if (!userId) return;
    dispatch(
      fetchOnboardings({ title: "Onboarding principal", userId: userId })
    );
  }, [dispatch, userId]);

  useEffect(() => {
    if (!error) return;
    toast.error(error, { position: "top-right", theme: "colored" });
  }, [error]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Chargement de votre onboarding...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        <p>Une erreur est survenue: {error}</p>
      </div>
    );
  }

  return (
    <div className=" h-screen flex flex-col gap-7">
      <Onboardings
        steps={steps}
        onboardings={onboardings}
        currentStep={currentStep}
        internalStep={internalStep}
        formData={formData}
        renderStep={renderStep}
      />
    </div>
  );
};
