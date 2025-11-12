"use client";
import { Input, RadioGroup } from "@/components/Form";
import { setMaxInternalStep } from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch } from "@/lib/hook";
import { Question } from "@/utils/types";
import { useEffect } from "react";
import { Paragraphe, Title } from "../../Typography";
import ConditionalForm from "./ConditionalForm";

interface PointVenteProps {
  internalStep: number;
}

const point_ventes = ["1-5", "6-10", "11-20", "21-50", "51-100"];

const questions: Question[] = [
  {
    id: "q1",
    label:
      "Avez-vous un point de vente pilote dans lequel vous expérimentez votre concept ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Précisez le nom du point de vente pilote:",
    placeholder: "Nom du point de vente pilote",
    type: "text",
    dependsOn: "q1",
    condition: "oui",
  },
];

const questions2: Question[] = [
  {
    id: "q1",
    label: "Existe-t-il un agencement spécifique à reproduire dans le réseau ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Avez-vous un cahier des charges ou plan type à transmettre ?",
    type: "yesno",
    dependsOn: "q1",
    condition: "oui",
  },
  {
    id: "q3",
    label: "Importez votre document, si vous en disposez.",
    type: "file",
    dependsOn: "q2",
    condition: "oui",
  },
];

const questions3: Question[] = [
  {
    id: "q1",
    label:
      "Avez-vous un architecte référent que les franchisés pourront utiliser ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Précisez le nom et coordonnées de l’architecte:",
    placeholder: "Nom et coordonnées de l’architecte",
    type: "text",
    dependsOn: "q1",
    condition: "oui",
  },
];

export const PointVente = ({ internalStep }: PointVenteProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMaxInternalStep(4));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      {internalStep === 1 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Point de vente
          </Title>
          <Paragraphe className="font-semibold text-2xl">
            Quels sont vos objectifs d’ouvertures annuelles ?
          </Paragraphe>
          <RadioGroup
            showLogo={true}
            options={point_ventes}
            name="point_ventes"
          />
          <div className="flex items-center gap-2">
            <span className="text-text text-xl font-medium">Autre: </span>
            <Input
              type="text"
              name="autre"
              placeholder="Autre"
              classname="max-w-[600px] px-6 py-4"
            />
          </div>
        </>
      )}
      {internalStep === 2 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Points de vente
          </Title>
          <ConditionalForm questions={questions} />
        </>
      )}
      {internalStep === 3 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Points de vente
          </Title>
          <ConditionalForm questions={questions2} />
        </>
      )}
      {internalStep === 4 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Points de vente
          </Title>
          <ConditionalForm questions={questions3} />
        </>
      )}
    </div>
  );
};
