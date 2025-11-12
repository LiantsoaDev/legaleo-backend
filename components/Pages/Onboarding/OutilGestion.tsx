"use client";
import { Title } from "@/components/Typography";
import { setMaxInternalStep } from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch } from "@/lib/hook";
import { Question } from "@/utils/types";
import Link from "next/link";
import { useEffect } from "react";
import ConditionalForm from "./ConditionalForm";

interface OutilGestionProps {
  internalStep: number;
}

const questions1: Question[] = [
  {
    id: "q1",
    label:
      "Utilisez-vous un logiciel de pilotage et de gestion (caisse, stock, comptabilité, réassort, etc.) ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Les licences du logiciel sont-elles conclues :",
    type: "yesno",
    option: [
      "Directement par les affiliés avec le prestataire",
      "Par la tête de réseau",
    ],
    showLogo: true,
    dependsOn: "q1",
    condition: "oui",
  },
  {
    id: "q3",
    label: "Quel est le nom de votre logiciel ?",
    type: "array",
    questions: [
      {
        label: "Quel est le nom de votre logiciel ?",
        type: "text",
        placeholder: "Nom du logiciel ",
      },
      {
        label: "Quel est le périmètre fonctionnel de votre logiciel ?",
        type: "text",
        placeholder: "Périmetre de votre logiciel",
      },
    ],
    dependsOn: "q2",
    condition: "Directement par les affiliés avec le prestataire",
  },
];

export const OutilGestion = ({ internalStep }: OutilGestionProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMaxInternalStep(2));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      {internalStep === 1 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Outils de gestion
          </Title>
          <ConditionalForm questions={questions1} />
        </>
      )}
      {internalStep === 2 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Consentement RGPD
          </Title>
          <div className="py-8 px-10 bg-[#D9FDFB] rounded-4xl flex gap-10 items-center w-full maw-w-[760px]">
            <input
              type="checkbox"
              id="consent"
              className="accent-black w-6 h-6 rounded-sm"
            />
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="consent"
                className="font-medium text-2xl text-black"
              >
                J’autorise Legaleo à stocker et analyser ces documents pour
                améliorer mes modèles de contrat.
              </label>
              <Link
                href="politique-confidentialite"
                className="font-medium text-sm text-black underline"
              >
                Politique de confidentilité
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
