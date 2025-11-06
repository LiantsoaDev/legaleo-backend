"use client";

import { OnboardingStep } from "@/app/generated/prisma";
import { getOnboardings } from "@/server";
import { OnboardingWithSteps } from "@/utils/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Onboardings } from "./Onboarding";

export const OnboardingJeuneReseau = ({ user }: any) => {
  const [onboardingDatas, setOnboardingDatas] = useState<
    OnboardingWithSteps[] | null
  >([]);
  const [onboardingSteps, setOnboardingSteps] = useState<OnboardingStep[]>([]);
  const [onboardingStep, setOnboardingStep] = useState<number>(1);

  const [formDataState, setFormDataState] = useState<Record<string, any>>({});

  const [internalStep, setinternalStep] = useState<number>(1);
  const [internalCurrentStep, setInternalCurrentStep] = useState<number>(1);

  useEffect(() => {
    const fetchOnboardings = async () => {
      const onboardings = await getOnboardings();
      if (!onboardingDatas) {
        toast.error("Impossible de récupérer les données", {
          position: "top-right",
          theme: "colored",
        });
      }
      setOnboardingDatas(onboardings?.data[1] || null);
      setOnboardingSteps(onboardings?.data[1]?.steps || []);
    };
    fetchOnboardings();
  }, [onboardingStep, formDataState]);

  return (
    <div className=" h-screen flex flex-col gap-7">
      <Onboardings
        internalCurrentStep={internalCurrentStep}
        user={user}
        internalStep={internalStep}
        onboardingDatas={onboardingDatas}
        onboardingStep={onboardingStep}
        onboardingSteps={onboardingSteps}
        setFormDataState={setFormDataState}
        setInternalCurrentStep={setInternalCurrentStep}
        setOnboardingStep={setOnboardingStep}
        setinternalStep={setinternalStep}
        type="jeuneReseau"
      />
    </div>
  );
};
