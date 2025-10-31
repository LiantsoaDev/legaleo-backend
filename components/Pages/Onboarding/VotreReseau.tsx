"use client";
import { Notices } from "@/components/Typography/Tips";
import { useEffect } from "react";
import { RadioGroup, Select, SelectTypeReseau } from "../../Form";
import { Paragraphe, Title } from "../../Typography";

interface VotreReseauProps {
  setInternatStep: React.Dispatch<React.SetStateAction<number>>;
  internalStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
}

const reseau_franchise = ["✅ Oui", "❌ Non"];

const point_ventes = ["1-5", "6-10", "11-20", "21-50", "51-100", "+100"];

const localisation = ["🇫🇷 France uniquement", "🇪🇺 Europe", "🌍 International"];

const principale_reseau = [
  "Alimentaire",
  "Restauration & Hôtellerie",
  "Beauté, Coiffure & Esthétique",
  "Commerce & Distribution",
  "Équipement de la maison",
  "Équipement de la personne",
  "Services aux particuliers",
  "Services aux entreprises",
  "Bâtiment & Travaux",
  "Immobilier",
  "Autre",
];

const type_reseau = [
  "Franchise",
  "License de marque",
  "Concession",
  "Distribution sélective",
  "Commission-affiliation",
  "Coopérative",
  "Partenariat",
  "Autre",
];

export const VotreReseau = ({
  currentStep,
  internalStep,
  setCurrentStep,
  setInternatStep,
}: VotreReseauProps) => {
  useEffect(() => {
    setInternatStep(5);
  }, [internalStep]);

  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
        Votre réseau
      </Title>
      {currentStep === 1 && (
        <>
          <Paragraphe className="font-medium text-xl">
            Avez-vous déjà un réseau de franchisés ou d’affiliés ?
          </Paragraphe>
          <RadioGroup
            redirectTo="/dashboard"
            options={reseau_franchise}
            name="autorise_relecture"
          />
        </>
      )}
      {currentStep === 2 && (
        <>
          <Paragraphe className="font-medium text-xl">
            Combien de points de vente composent actuellement votre réseau ?
          </Paragraphe>
          <Paragraphe className="font-normal text-xl">
            📊 Pas besoin d’un chiffre exact : une estimation suffit pour
            personnaliser vos contrats et vos recommandations.
          </Paragraphe>
          <RadioGroup
            showLogo={true}
            options={point_ventes}
            name="point_ventes"
          />
        </>
      )}
      {currentStep === 3 && (
        <>
          <Paragraphe className="font-medium text-xl">
            Localisation principale du réseau :
          </Paragraphe>
          <RadioGroup
            showLogo={false}
            options={localisation}
            name="localisation"
          />
        </>
      )}
      {currentStep === 4 && (
        <>
          <Paragraphe className="font-medium text-xl">
            Quel est le secteur d’activité de votre réseau ?
          </Paragraphe>
          <Select
            options={principale_reseau}
            id="fonction"
            name="fonction"
            classname="w-full"
          />
          <Notices classname="mt-10">
            Cela nous permet d’adapter automatiquement les modèles de documents
            à votre structure juridique.
          </Notices>
        </>
      )}
      {currentStep === 5 && (
        <>
          <SelectTypeReseau
            options={type_reseau}
            id="fonction"
            name="fonction"
            classname="w-full"
          />
        </>
      )}
    </div>
  );
};
