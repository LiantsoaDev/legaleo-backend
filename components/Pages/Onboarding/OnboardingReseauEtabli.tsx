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

  // Vérifier que l'utilisateur est authentifié
  useEffect(() => {
    // Attendre que la session soit chargée
    if (status === "loading") {
      return;
    }

    // Vérifier l'authentification via la session ou le store Redux
    const userIsAuthenticated = status === "authenticated" || (isAuthenticated && userId);
    
    if (!userIsAuthenticated || !userId) {
      // Ne pas afficher l'erreur si la session est encore en cours de chargement
      if (status !== "loading") {
        toast.error("Vous devez être connecté pour accéder à l'onboarding juridique", {
          position: "top-right",
          theme: "colored",
        });
      }
      return;
    }
    dispatch(fetchOnboardings({ title: "Onboarding reseau etabli", userId }));
    console.log("steps", steps);
  }, [dispatch, userId, isAuthenticated, status, session]);

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
