"use client";

import { Title } from "@/components/Typography";
import { setMaxInternalStep } from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch } from "@/lib/hook";
import { Question } from "@/utils/types";
import { useEffect } from "react";
import ConditionalForm from "./ConditionalForm";

interface ProduitApprovisoinnementProps {
  internalStep: number;
}

const question1: Question[] = [
  {
    id: "q1",
    label: "La liste des produits exclusifs / non exclusifs a-t-elle évolué ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Listez ou téléversez la nouvelle liste:",
    type: "textareaAndFile",
    dependsOn: "q1",
    condition: "oui",
  },
];

const question2: Question[] = [
  {
    id: "q1",
    label: "Une centrale d’achat ou de référencement a-t-elle été créée ?",
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

export const ProduitApprovisoinnement = ({
  internalStep,
}: ProduitApprovisoinnementProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMaxInternalStep(2));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
        Produits et approvisionnement
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
    </div>
  );
};
