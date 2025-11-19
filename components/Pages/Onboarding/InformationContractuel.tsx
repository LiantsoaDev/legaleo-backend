"use client";
import { Input } from "@/components/Form";
import { Paragraphe, Title } from "@/components/Typography";
import { setMaxInternalStep } from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch } from "@/lib/hook";
import { Question } from "@/utils/types";
import { useEffect } from "react";
import ConditionalForm from "./ConditionalForm";

interface InformationContractuelProps {
  internalStep: number;
}

const question1: Question[] = [
  {
    id: "q1",
    label: "Pouvez-vous transmettre les contrats signés avec les affiliés ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Importez votre document, si vous en disposez.",
    type: "file",
    dependsOn: "q1",
    condition: "oui",
  },
];

const question2: Question[] = [
  {
    id: "q1",
    label: "Les obligations de non-concurrence ont-elles été modifiées ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Ajoutez une precision si besoin.",
    type: "textarea",
    dependsOn: "q1",
    condition: "oui",
  },
];

const question3: Question[] = [
  {
    id: "q1",
    label:
      "Les hypothèses de résiliation anticipée du contrat ont-elles évolué ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Ajoutez une precision si besoin.",
    type: "textarea",
    dependsOn: "q1",
    condition: "oui",
  },
];

const question4: Question[] = [
  {
    id: "q1",
    label:
      "Le traitement des données personnelles a-t-il évolué (conformité RGPD) ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Ajoutez une precision si besoin.",
    type: "textarea",
    dependsOn: "q1",
    condition: "oui",
  },
];
export const InformationContractuel = ({
  internalStep,
}: InformationContractuelProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMaxInternalStep(5));
  }, [dispatch]);
  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
        Informations contractuelles et juridiques
      </Title>
      {internalStep === 1 && (
        <>
          <Paragraphe className="font-medium text-xl">
            Avez-vous déjà un réseau de franchisés ou d’affiliés ?
          </Paragraphe>
          <Input
            label="Nombres de contrats d’affiliation signé"
            name="nombre_contrat"
            placeholder="Nombre contrat signé"
            type="text"
          />
        </>
      )}
      {internalStep === 2 && (
        <>
          <ConditionalForm questions={question1} />
        </>
      )}
      {internalStep === 3 && (
        <>
          <ConditionalForm questions={question2} />
        </>
      )}
      {internalStep === 4 && (
        <>
          <ConditionalForm questions={question3} />
        </>
      )}
      {internalStep === 5 && (
        <>
          <ConditionalForm questions={question4} />
        </>
      )}
    </div>
  );
};
