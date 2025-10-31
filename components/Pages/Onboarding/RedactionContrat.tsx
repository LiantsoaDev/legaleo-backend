"use client";
import { useEffect } from "react";
import { RadioGroup, SelectImporter } from "../../Form";
import { Paragraphe, Title } from "../../Typography";

const objectif_principal = [
  "📄 Créer de nouveaux contrats",
  "🗂️ Centraliser mes contrats existants",
  "🔁 Mettre à jour ou renouveler mes contrats",
  "🧑🏻‍⚖️ Faire relire mes contrats par un avocat partenaire",
];

interface RedactionContratProps {
  setInternatStep: React.Dispatch<React.SetStateAction<number>>;
  internalStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  onClick: () => void;
}

const modele_contrat = ["✅ Oui", "❌ Non"];

export const RedactionContrat = ({
  currentStep,
  internalStep,
  setCurrentStep,
  setInternatStep,
  onClick,
}: RedactionContratProps) => {
  useEffect(() => {
    setInternatStep(2);
  }, [currentStep]);
  return (
    <>
      {currentStep === 1 && (
        <div className="flex flex-col gap-5 min-h-screen justify-center px-32 py-20 w-full">
          <Title className="font-bold text-4xl leading-[100%] mb-5 w-full">
            Rédaction et gestion de contrat
          </Title>
          <Paragraphe className="font-medium text-xl">
            Avez-vous déjà un modèle de contrat à importer ?
          </Paragraphe>
          <RadioGroup options={objectif_principal} name="autorise_relecture" />
        </div>
      )}
      {currentStep === 2 && (
        <SelectImporter
          onClick={onClick}
          name="has_contrat_model"
          options={modele_contrat}
        />
      )}
    </>
  );
};
