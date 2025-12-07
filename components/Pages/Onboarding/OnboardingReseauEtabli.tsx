"use client";

import { FullLoader } from "@/components/Loader";
import {
  fetchOnboardings,
  updateFormData,
} from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { renderStepReseauEtabli } from "@/utils/functions";
import { readJuridiqueOnboardingAnswers } from "@/utils/onboardingCookie";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Onboardings } from "./Onboarding";
import { OnboardingFormProvider } from "./OnboardingFormContext";
import { useSession } from "next-auth/react";

export const OnboardingReseauEtabli = ({ user }: any) => {
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();

  const {
    steps,
    onboardings,
    currentStep,
    internalStep,
    formData,
    isLoading,
    error,
  } = useAppSelector((state) => state.onboarding);

  const { id: userId, isAuthenticated } = useAppSelector((state) => state.user);
  const hasFetchedRef = useRef(false);

  // Charger les données de l'onboarding
  useEffect(() => {
    // Attendre que la session soit chargée ou que userId soit disponible
    if (status === "loading" && !userId) {
      return;
    }

    // Utiliser userId du store Redux ou de la session
    const effectiveUserId = userId || session?.user?.id;

    if (!effectiveUserId) {
      return;
    }

    // Ne pas refetch si les données sont déjà chargées ou si on a déjà fait un fetch
    if (hasFetchedRef.current || (onboardings && !isLoading)) {
      return;
    }

    hasFetchedRef.current = true;
    dispatch(fetchOnboardings({ title: "Onboarding reseau etabli", userId: effectiveUserId }));
    console.log("steps", steps);
  }, [dispatch, userId, status, session, onboardings, isLoading]);

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
