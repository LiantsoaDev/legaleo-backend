"use client";

import { Title } from "@/components/Typography";
import { Question } from "@/utils/types";
import ConditionalForm from "./ConditionalForm";

const question1: Question[] = [
  {
    id: "q1",
    label:
      "Les conditions financières ont-elles évolué (droit d’entrée, redevances de franchise, publicité, etc.) ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Renseigner les évolutions (laissez vide si il n’y en a pas eu)",
    type: "text",
    inputListQuestions: [
      {
        label: "Droit d’entrée",
        name: "droit_entree",
        type: "number",
        placeholder: "Champ numérique (€)",
      },
      {
        label: "Royalties mensuelles",
        name: "royalties_mensuelles",
        type: "number",
        placeholder: "Fixe ou pourcentage",
      },
      {
        label: "Redevance publicitaire",
        name: "redevance_publicitaire",
        type: "number",
        placeholder: "% du CA",
      },
    ],
    hasTextarea: true,
    dependsOn: "q1",
    condition: "oui",
  },
];

export const ConditionFinanciere = ({}) => {
  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
        Conditions financières
      </Title>
      <ConditionalForm questions={question1} />
    </div>
  );
};
