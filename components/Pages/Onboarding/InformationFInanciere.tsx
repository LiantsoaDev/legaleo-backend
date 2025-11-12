"use client";
import { Input, RadioGroup } from "@/components/Form";
import { setMaxInternalStep } from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch } from "@/lib/hook";
import { useEffect } from "react";
import { Paragraphe, Title } from "../../Typography";

interface InformationFinanciereProps {
  internalStep: number;
}

const montant = ["Montant fixe", "Pourcentage"];

export const InformationFinanciere = ({
  internalStep,
}: InformationFinanciereProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMaxInternalStep(4));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      {internalStep === 1 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Informations financières
          </Title>
          <Paragraphe className="font-semibold text-2xl">
            Quelle est la durée souhaitée du contrat ?
          </Paragraphe>
          <Input
            type="number"
            name="duree_contrat"
            placeholder="Montant en €"
          />
        </>
      )}
      {internalStep === 2 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Informations financières
          </Title>
          <Paragraphe className="font-semibold text-2xl">
            Quel sera le montant du droit d’entrée ?
          </Paragraphe>
          <Input type="number" name="droit_entree" placeholder="Ans" />
        </>
      )}
      {internalStep === 3 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Informations financières
          </Title>
          <Paragraphe className="font-semibold text-2xl">
            Quel sera le montant du droit d’entrée ?
          </Paragraphe>
          <RadioGroup showLogo={true} options={montant} name="point_ventes" />
        </>
      )}
      {internalStep === 4 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Informations financières
          </Title>
          <Paragraphe className="font-semibold text-2xl">
            Quel est le montant de la redevance publicitaire nationale ?
          </Paragraphe>
          <Input
            type="number"
            name="redevance_publicitaire"
            placeholder="Montant en %"
          />
        </>
      )}
    </div>
  );
};
