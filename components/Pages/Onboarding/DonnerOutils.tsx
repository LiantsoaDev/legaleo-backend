"use client";

import { Title } from "@/components/Typography";
import { setMaxInternalStep } from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch } from "@/lib/hook";
import { Question } from "@/utils/types";
import { useEffect } from "react";
import ConditionalForm from "./ConditionalForm";

interface DonnerOutilsProps {
  internalStep: number;
}

const question1: Question[] = [
  {
    id: "q1",
    label: "Les outils informatiques et logiciels ont-ils évolué ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Ajouter des précisions si besoin.",
    type: "textarea",
    dependsOn: "q1",
    condition: "oui",
  },
];

const question2: Question[] = [
  {
    id: "q1",
    label:
      "Le flux d’informations et de données transmises par l’affilié à la tête de réseau a-t-il évolué (financières, CA, rentabilité, clientèle, stock, réassort, etc.) ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Quel type de reporting est désormais transmis ?",
    type: "yesno",
    option: [
      "Chiffre d’affaires",
      "Rentabilité",
      "Données clients",
      "Stocks / réassorts",
    ],
    showLogo: true,
    hasAutre: true,
    hasTextarea: true,
    dependsOn: "q1",
    condition: "oui",
  },
];

const question3: Question[] = [
  {
    id: "q1",
    label:
      "Des déclarations annuelles sont-elles à effectuer par l’affilié (CA mensuel, liasse fiscale, etc.) ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Quels documents doivent être transmis ?",
    type: "yesno",
    option: [
      "CA mensuel",
      "Liasse fiscale",
      "Données clients",
      "Stocks / réassorts",
    ],
    showLogo: true,
    hasAutre: true,
    hasTextarea: true,
    dependsOn: "q1",
    condition: "oui",
  },
];

export const DonnerOutils = ({ internalStep }: DonnerOutilsProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMaxInternalStep(3));
  }, [dispatch]);
  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
        Données et outils
      </Title>
      {internalStep === 1 && (
        <>
          <ConditionalForm
            questions={question1}
            formKey="donnees_outils.evolution_outils_logiciels"
          />
        </>
      )}
      {internalStep === 2 && (
        <>
          <ConditionalForm
            questions={question2}
            formKey="donnees_outils.evolution_flux_informations"
          />
        </>
      )}
      {internalStep === 3 && (
        <>
          <ConditionalForm
            questions={question3}
            formKey="donnees_outils.declarations_annuelles"
          />
        </>
      )}
    </div>
  );
};
