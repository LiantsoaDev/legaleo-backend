"use client";
import { setMaxInternalStep } from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch } from "@/lib/hook";
import { Question } from "@/utils/types";
import { useEffect } from "react";
import { Title } from "../../Typography";
import ConditionalForm from "./ConditionalForm";

interface MarqueJeuneReseauProps {
  internalStep: number;
}

const questions1: Question[] = [
  {
    id: "q1",
    label: "Disposez-vous d’une marque enregistrée à l’INPI ou à l’EUIPO ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Quelle marque a été enregistrée ?",
    placeholder: "Nom de votre enseigne (Nom juridique)",
    type: "text",
    dependsOn: "q1",
    condition: "oui",
  },
];

const questions2: Question[] = [
  {
    id: "q1",
    label: "Un logo est-il associé à votre marque ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Le logo a-t-il été enregistré ?",
    type: "yesno",
    dependsOn: "q1",
    condition: "oui",
  },
  {
    id: "q3",
    label: "Souhaitez-vous déposer le logo avec la marque ?",
    placeholder: "Nom de votre enseigne (Nom juridique)",
    type: "yesno",
    dependsOn: "q2",
    condition: "oui",
  },
  {
    id: "q4",
    label: "Téléverser le logo",
    type: "image",
    dependsOn: "q3",
    condition: "oui",
  },
];

export const MarqueJeuneReseau = ({ internalStep }: MarqueJeuneReseauProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMaxInternalStep(2));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      {internalStep === 1 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Marque
          </Title>
          <ConditionalForm questions={questions1} />
        </>
      )}
      {internalStep === 2 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Marque
          </Title>
          <ConditionalForm questions={questions2} />
        </>
      )}
    </div>
  );
};
