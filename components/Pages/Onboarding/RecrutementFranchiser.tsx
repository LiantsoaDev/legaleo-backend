"use client";
import { Notices } from "@/components/Typography/Tips";
import { setMaxInternalStep } from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch } from "@/lib/hook";
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
  internalStep: number;
}

export const RecrutementFranchiser = ({
  internalStep,
}: RecrutementFranchiserProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMaxInternalStep(4));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
        Recrutement de franchisés
      </Title>
      {internalStep === 1 && (
        <>
          <Paragraphe className="font-medium text-xl">
            Disposez-vous aujourd’hui d’un service (interne ou externe) dédié au
            recrutement de vos franchisés ?
          </Paragraphe>
          <RadioGroup
            options={service_recrutement}
            name="service_recrutement"
          />
          <Notices classname="mt-10">
            Nous configurons vos modèles selon la structure choisie.
          </Notices>
        </>
      )}
      {internalStep === 2 && (
        <>
          <Paragraphe className="font-medium text-xl">
            Souhaitez-vous être accompagné par un humain (avocat) pour la
            rédaction de vos documents ? (DIP, contrat, grille d'éligibilité
            etc).
          </Paragraphe>
          <RadioGroup
            options={accompagnement}
            name="accompagnement_humain"
          />
          <Notices classname="mt-10">
            Nous configurons vos modèles selon la structure choisie.
          </Notices>
        </>
      )}
      {internalStep === 3 && (
        <>
          <Paragraphe className="font-medium text-xl">
            Quel est votre objectif de développement sur 12 mois ?
          </Paragraphe>
          <RadioGroup
            options={object_developpement}
            name="objectif_developpement"
            showLogo
          />
          <Notices classname="mt-10">
            Nous configurons vos modèles selon la structure choisie.
          </Notices>
        </>
      )}
      {internalStep === 4 && (
        <>
          <SelectCRM options={has_crm} name="utilise_crm" />
        </>
      )}
    </div>
  );
};
