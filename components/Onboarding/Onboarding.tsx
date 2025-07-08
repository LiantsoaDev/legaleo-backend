"use client";
import { onboardingData } from "@/utils/data/data";
import {
  faLongArrowLeft,
  faLongArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { OnboardingCard } from "../Card";
import { Activite } from "./Activite";
import { Documents } from "./Documents";
import { Finalisation } from "./Finalisation";
import { NombreReseau } from "./NombreReseau";
import { Relecture } from "./Relecture";
import { ReseauFranchise } from "./ReseauFranchise";
import { TypeReseau } from "./TypeReseau";
import { UserName } from "./UserName";
import { Welcome } from "./Welcome";

export const Onboarding = () => {
  const [onboardingStep, setOnboardingStep] = useState<number>(0);

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

  const handleNextStep = () => {
    setOnboardingStep((prevStep) =>
      prevStep < onboardingData.step.length - 1 ? prevStep + 1 : prevStep
    );
  };

  const handlePrevStep = () => {
    setOnboardingStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  return (
    <div className="flex flex-row">
      <div className="w-2/3 justify-between flex flex-col relative select-none">
        {renderStep()}
        <div className="absolute bottom-0 left-1/2 translate-[-50%] bg-blue px-5 py-5 rounded-full flex gap-10 text-white text-2xl">
          <FontAwesomeIcon
            icon={faLongArrowLeft}
            onClick={handlePrevStep}
            className={`cursor-pointer transition ${
              onboardingStep === 0
                ? "opacity-40 pointer-events-none"
                : "opacity-100"
            }`}
          />
          <FontAwesomeIcon
            icon={faLongArrowRight}
            onClick={handleNextStep}
            className={`cursor-pointer transition ${
              onboardingStep === onboardingData.step.length - 1
                ? "opacity-40 pointer-events-none"
                : "opacity-100"
            }`}
          />
        </div>
      </div>
      <div className="bg-[#1F120E] w-1/3 rounded-l-4xl h-full p-8 flex flex-col gap-7 justify-center overflow-y-auto select-none">
        {onboardingData.step.map((onboarding, index) => (
          <OnboardingCard
            key={index}
            title={onboarding.title}
            isActive={index === onboardingStep}
            isCompleted={index < onboardingStep}
            step={index + 1}
            isLast={index === onboardingData.step.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
