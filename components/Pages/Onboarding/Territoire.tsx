"use client";
import { Question } from "@/utils/types";
import { Title } from "../../Typography";
import ConditionalForm from "./ConditionalForm";

const questions: Question[] = [
  {
    id: "q1",
    label: "Souhaitez-vous réserver à votre affilié un territoire exclusif ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Précisez les critères (taille, zone, population cible...)",
    needIA: true,
    type: "textarea",
    dependsOn: "q1",
    condition: "oui",
  },
];

export const Territoire = () => {
  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
        Territoire
      </Title>
      <ConditionalForm questions={questions} />
    </div>
  );
};
