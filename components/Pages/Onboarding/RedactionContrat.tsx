"use client";
import { setMaxInternalStep } from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch } from "@/lib/hook";
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
  internalStep: number;
  onClick: () => void;
}

const modele_contrat = ["✅ Oui", "❌ Non"];

export const RedactionContrat = ({
  internalStep,
  onClick,
}: RedactionContratProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMaxInternalStep(2));
  }, [dispatch]);

  return (
    <>
      {internalStep === 1 && (
        <div className="flex flex-col gap-5 min-h-screen justify-center px-32 py-20 w-full">
          <Title className="font-bold text-4xl leading-[100%] mb-5 w-full">
            Rédaction et gestion de contrat
          </Title>
          <Paragraphe className="font-medium text-xl">
            Qu'attendez-vous principalement de Legaleo ?
          </Paragraphe>
          <RadioGroup
            options={objectif_principal}
            name="objectif_legaleo"
          />
        </div>
      )}
      {internalStep === 2 && (
        <SelectImporter
          onClick={onClick}
          name="has_contrat_model"
          options={modele_contrat}
        />
      )}
    </>
  );
};
