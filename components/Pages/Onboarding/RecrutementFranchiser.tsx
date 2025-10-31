"use client";
import { Notices } from "@/components/Typography/Tips";
import { useEffect } from "react";
import { RadioGroup, SelectCRM } from "../../Form";
import { Paragraphe, Title } from "../../Typography";

const service_recrutement = ["✅ Oui", "❌ Non", "⏳ Pas encore"];
const accompagnement = ["✅ Oui", "❌ Non"];
const object_developpement = [
  "1 - 3 nouveaux franchisés",
  "4 - 10",
  "10+",
  "Je ne sais pas encore",
];

const has_crm = ["✅ Oui", "❌ Non"];

interface RecrutementFranchiserProps {
  setInternatStep: React.Dispatch<React.SetStateAction<number>>;
  internalStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
}

export const RecrutementFranchiser = ({
  currentStep,
  internalStep,
  setCurrentStep,
  setInternatStep,
}: RecrutementFranchiserProps) => {
  useEffect(() => {
    setInternatStep(4);
  }, [internalStep]);

  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
        Recrutement de franchisés
      </Title>
      {currentStep === 1 && (
        <>
          <Paragraphe className="font-medium text-xl">
            Disposez-vous aujourd’hui d’un service (interne ou externe) dédié au
            recrutement de vos franchisés ?
          </Paragraphe>
          <RadioGroup options={service_recrutement} name="autorise_relecture" />
          <Notices classname="mt-10">
            Nous configurons vos modèles selon la structure choisie.
          </Notices>
        </>
      )}
      {currentStep === 2 && (
        <>
          <Paragraphe className="font-medium text-xl">
            Souhaitez-vous être accompagné dans la rédaction de vos documents de
            recrutement (DIP, contrat, grille d’éligibilité) ?
          </Paragraphe>
          <RadioGroup options={accompagnement} name="autorise_relecture" />
          <Notices classname="mt-10">
            Nous configurons vos modèles selon la structure choisie.
          </Notices>
        </>
      )}
      {currentStep === 3 && (
        <>
          <Paragraphe className="font-medium text-xl">
            Quel est votre objectif de développement sur 12 mois ?
          </Paragraphe>
          <RadioGroup
            options={object_developpement}
            name="autorise_relecture"
            showLogo
          />
          <Notices classname="mt-10">
            Nous configurons vos modèles selon la structure choisie.
          </Notices>
        </>
      )}
      {currentStep === 4 && (
        <>
          <SelectCRM options={has_crm} name="crm" />
        </>
      )}
    </div>
  );
};
