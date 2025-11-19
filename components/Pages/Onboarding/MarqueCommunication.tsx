"use client";

import { Title } from "@/components/Typography";
import { setMaxInternalStep } from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch } from "@/lib/hook";
import { Question } from "@/utils/types";
import { useEffect } from "react";
import ConditionalForm from "./ConditionalForm";

interface MarqueCommunicationProps {
  internalStep: number;
}

const question1: Question[] = [
  {
    id: "q1",
    label: "De nouveaux noms de domaine sont-ils utilisés ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Saisir le(s) nom(s) de domaine",
    type: "text",
    hasMultipleInputs: true,
    hasTextarea: true,
    dependsOn: "q1",
    condition: "oui",
  },
];

const question2: Question[] = [
  {
    id: "q1",
    label: "Le site internet et les réseaux sociaux ont-ils évolué ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Cochez ce qui a été modifié :",
    type: "yesno",
    option: [
      "🎨 Site refondu",
      "📢 Nouveaux canaux sociaux",
      "📋 Nouvelles règles de communication",
    ],
    hasAutre: true,
    hasTextarea: true,
    dependsOn: "q1",
    condition: "oui",
  },
];

const question3: Question[] = [
  {
    id: "q1",
    label: "La communication et la publicité ont-elles évolué ?",
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

export const MarqueCommunication = ({
  internalStep,
}: MarqueCommunicationProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMaxInternalStep(3));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
        Marque et communication
      </Title>
      {internalStep === 1 && (
        <>
          <ConditionalForm questions={question1} />
        </>
      )}
      {internalStep === 2 && (
        <>
          <ConditionalForm questions={question2} />
        </>
      )}
      {internalStep === 3 && (
        <>
          <ConditionalForm questions={question3} />
        </>
      )}
    </div>
  );
};
