"use client";
import { OnboardingStep } from "@/app/generated/prisma";
import { getOnboardings, postOnboardingData } from "@/server";
import { OnboardingWithSteps } from "@/utils/types";
import {
  faLongArrowLeft,
  faLongArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { OnboardingCard } from "../../Card";
import { Activite } from "./Activite";
import { Documents } from "./Documents";
import { Finalisation } from "./Finalisation";
import { NombreReseau } from "./NombreReseau";
import { Relecture } from "./Relecture";
import { ReseauFranchise } from "./ReseauFranchise";
import { TypeReseau } from "./TypeReseau";
import { UserName } from "./UserName";
import { Welcome } from "./Welcome";

type FormDataValue = string | { name: string; type: string; content: string };

export const Onboardings = ({ user }: any) => {
  const [onboardingDatas, setOnboardingDatas] = useState<
    OnboardingWithSteps[] | null
  >([]);
  const [onboardingSteps, setOnboardingSteps] = useState<OnboardingStep[]>([]);
  const [onboardingStep, setOnboardingStep] = useState<number>(0);

  const [formDataState, setFormDataState] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchOnboardings = async () => {
      const onboardings = await getOnboardings();
      setOnboardingDatas(onboardings?.data || null);
      setOnboardingSteps(onboardings?.data[0]?.steps || []);
    };
    fetchOnboardings();
  }, []);

  const renderStep = () => {
    switch (onboardingStep) {
      case 0:
        return <Welcome />;
      case 1:
        return <UserName />;
      case 2:
        return <ReseauFranchise />;
      case 3:
        return <Activite />;
      case 4:
        return <NombreReseau />;
      case 5:
        return <TypeReseau />;
      case 6:
        return <Relecture />;
      case 7:
        return <Documents />;
      default:
        return <Finalisation />;
    }
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // encode en base64
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const saveStepData = async () => {
    const formElement = document.querySelector("form");
    if (!formElement) return;

    const formData = new FormData(formElement as HTMLFormElement);
    const data: Record<string, FormDataValue> = Object.fromEntries(
      Array.from(formData.entries()).filter(
        ([_, value]) => !(value instanceof File)
      )
    ) as Record<string, FormDataValue>;

    for (const [key, value] of formData.entries()) {
      if (value instanceof File && value.size > 0) {
        const base64 = await fileToBase64(value);
        // On ajoute le fichier encodé dans data
        data[key] = {
          name: value.name,
          type: value.type,
          content: base64,
        };
      }
    }

    // Fusionner avec les données précédentes
    setFormDataState((prev) => ({ ...prev, ...data }));
    const userId = user.id;
    const onboarding_id = onboardingDatas && onboardingDatas[0]?.id;
    if (!onboarding_id) return;

    const dataToSend = {
      userId,
      onboarding_id,
      value: data,
    };

    console.log("Données à envoyer :", dataToSend);

    postOnboardingData(dataToSend);

    if (onboardingStep === onboardingSteps.length - 1) {
      // Redirection vers le tableau de bord ou une autre page
      window.location.href = "/dashboard";
    }
  };

  const handleNextStep = () => {
    saveStepData();
    setOnboardingStep((prevStep) =>
      prevStep < onboardingSteps.length - 1 ? prevStep + 1 : prevStep
    );
  };

  const handlePrevStep = () => {
    saveStepData();
    setOnboardingStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveStepData();
  };

  return (
    <div className="flex flex-row">
      <form
        onSubmit={handleSubmit}
        className="w-2/3 justify-between flex flex-col items-center relative select-none"
      >
        {renderStep()}
        <div className="fixed bottom-0 items-center left-[33%] translate-[-50%] bg-blue px-5 py-5 rounded-full flex gap-10 text-white text-xl">
          <button type="submit">
            <FontAwesomeIcon
              icon={faLongArrowLeft}
              onClick={handlePrevStep}
              className={`cursor-pointer transition ${
                onboardingStep === 0
                  ? "opacity-40 pointer-events-none"
                  : "opacity-100"
              }`}
            />
          </button>

          <button type="submit">
            <FontAwesomeIcon
              icon={faLongArrowRight}
              onClick={handleNextStep}
              className={`cursor-pointer transition`}
            />
          </button>
        </div>
      </form>
      <div className="bg-[#1F120E] w-1/3 rounded-l-4xl h-full p-8 flex flex-col gap-7 justify-center overflow-y-auto select-none">
        {onboardingSteps &&
          onboardingSteps.length > 0 &&
          onboardingSteps.map((onboarding: OnboardingStep, index) => (
            <OnboardingCard
              key={index}
              title={onboarding.title || "Bienvenu sur legaleo"}
              isActive={index === onboardingStep}
              isCompleted={index < onboardingStep}
              step={index + 1}
              isLast={index === onboardingSteps.length - 1}
            />
          ))}
      </div>
    </div>
  );
};
