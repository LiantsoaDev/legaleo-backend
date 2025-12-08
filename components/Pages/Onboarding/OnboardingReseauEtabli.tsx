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

  // Mettre à jour le state Redux avec les données des cookies si elles changent
  // (par exemple si l'utilisateur modifie quelque chose pendant la session)
  // Note: Les données des cookies sont déjà fusionnées avec les données de l'API dans le reducer
  // Ce useEffect sert uniquement à synchroniser les changements ultérieurs après le chargement initial
  useEffect(() => {
    // Attendre que les données de l'API soient chargées
    if (isLoading || !onboardings) {
      return;
    }

    const persistedAnswers = readJuridiqueOnboardingAnswers();
    if (persistedAnswers && Object.keys(persistedAnswers).length) {
      // Vérifier si les données des cookies sont différentes de celles dans formData
      // pour éviter des mises à jour inutiles
      const hasChanges = Object.keys(persistedAnswers).some(
        (key) => formData[key] !== persistedAnswers[key]
      );
      
      if (hasChanges) {
        // Fusionner les données des cookies avec les données déjà chargées depuis l'API
        // Les données des cookies ont la priorité car elles peuvent être plus récentes
        dispatch(updateFormData(persistedAnswers));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLoading, onboardings]); // formData est intentionnellement omis pour éviter des boucles infinies

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
