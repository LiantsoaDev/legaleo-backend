"use client";
import { Input, RadioGroup } from "@/components/Form";
import { Paragraphe, Title } from "@/components/Typography";
import { setMaxInternalStep } from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch } from "@/lib/hook";
import { Question } from "@/utils/types";
import { useEffect } from "react";
import ConditionalForm from "./ConditionalForm";
import { FinalisationReseauEtabli } from "./FinalisationReseauEtabli";

interface FormationProps {
  internalStep: number;
}

const questions1: Question[] = [
  {
    id: "q1",
    label: "Qui dispense la formation ?",
    type: "yesno",
    option: ["Tête de réseau", "Prestataire externe"],
    showLogo: true,
  },
  {
    id: "q2",
    label: "Préciser le nom du prestataire",
    type: "text",
    dependsOn: "q1",
    condition: "Prestataire externe",
  },
];

const questions2: Question[] = [
  {
    id: "q1",
    label:
      "Est-ce que la tête de réseau est présente à l’ouverture (assistance à l’ouverture) ?",
    type: "yesno",
  },
  {
    id: "q2",
    label:
      "Combien de temps (heures / jours) de présence auprès de l’affilié ?",
    type: "text",
    placeholder: "Champs libre",
    dependsOn: "q1",
    condition: "oui",
  },
];

const questions3: Question[] = [
  {
    id: "q1",
    label: "Une formation continue est-elle dispensée dans le réseau ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Durée",
    type: "array",
    questions: [
      {
        label: "Sur quelle durée par an (heures/jours) ?",
        type: "text",
        placeholder: "Heures/jours",
      },
      {
        label: "À quelle fréquence ?",
        type: "text",
        placeholder: "Fréquence",
      },
      {
        label: "Qui supporte le coût de la formation continue",
        type: "yesno",
        option: ["Tête de réseau", "Affilié"],
        showLogo: true,
      },
      {
        label:
          "Qui prend en charge les frais de déplacement liés à la formation continue ?",
        type: "yesno",
        option: ["Tête de réseau", "Affilié"],
        showLogo: true,
      },
    ],
    dependsOn: "q1",
    condition: "oui",
  },
];

export const Formation = ({ internalStep }: FormationProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMaxInternalStep(6));
  }, [dispatch]);
  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      {internalStep === 1 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Formation
          </Title>
          <span className="p-2.5 bg-[#F2F8F8] text-2xl text-[#087F83] w-fit roudned-md">
            🎓 Avant l’ouverture du point de vente
          </span>
          <Paragraphe className="font-medium text-xl">
            Où se déroule la formation initiale ?
          </Paragraphe>
          <RadioGroup
            showLogo={true}
            options={["Dans un magasin pilote", "Chez l’affilié"]}
            name="lieu_formation_initial"
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
            Formation
          </Title>
          <span className="p-2.5 bg-[#F2F8F8] text-2xl text-[#087F83] w-fit roudned-md">
            🎓 Avant l’ouverture du point de vente
          </span>
          <Paragraphe className="font-medium text-xl">
            Quelle est la durée de la formation, en heures et/ou en jours ?
          </Paragraphe>
          <div className="flex flex-col gap-5">
            <Input
              type="number"
              name="heures"
              placeholder="Champ numérique (heures)"
              classname="max-w-[600px] px-6 py-4"
            />
            <Input
              type="number"
              name="jours"
              placeholder="Champ numérique (jours)"
              classname="max-w-[600px] px-6 py-4"
            />
          </div>
        </>
      )}
      {internalStep === 3 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Formation
          </Title>
          <span className="p-2.5 bg-[#F2F8F8] text-2xl text-[#087F83] w-fit roudned-md">
            🎓 Avant l’ouverture du point de vente
          </span>
          <ConditionalForm questions={questions1} />
        </>
      )}
      {internalStep === 4 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Formation
          </Title>
          <span className="p-2.5 bg-[#F2F8F8] text-2xl text-[#087F83] w-fit roudned-md">
            🎓 Avant l’ouverture du point de vente
          </span>
          <Paragraphe className="font-medium text-xl">
            Quelle est la durée de la formation, en heures et/ou en jours ?
          </Paragraphe>
          <RadioGroup
            showLogo={true}
            options={["Tête de réseau", "Affilié"]}
            name="frais_deplacement_afflier"
          />
        </>
      )}
      {internalStep === 5 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Formation
          </Title>
          <span className="p-2.5 bg-[#F2F8F8] text-2xl text-[#087F83] w-fit roudned-md">
            🧭 À l’ouverture du point de vente
          </span>
          <ConditionalForm questions={questions2} />
        </>
      )}
      {internalStep === 6 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Formation
          </Title>
          <span className="p-2.5 bg-[#F2F8F8] text-2xl text-[#087F83] w-fit roudned-md">
            🧭 À l’ouverture du point de vente
          </span>
          <ConditionalForm questions={questions3} />
        </>
      )}
    </div>
  );
};

const question1: Question[] = [
  {
    id: "q1",
    label: "Les formations ont-elles évolué ?",
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

interface FormationReseauEtabliProps {
  internalStep: number;
}

export const FormationReseauEtabli = ({
  internalStep,
}: FormationReseauEtabliProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMaxInternalStep(2));
  }, [dispatch]);

  return (
    <>
      {internalStep === 1 && (
        <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Formation
          </Title>
          <ConditionalForm questions={question1} />
        </div>
      )}
      {internalStep === 2 && (
        <>
          <FinalisationReseauEtabli />
        </>
      )}
    </>
  );
};
