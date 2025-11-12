"use client";
import { Notices } from "@/components/Typography/Tips";
import { setMaxInternalStep } from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch } from "@/lib/hook";
import { AppDispatch } from "@/lib/store";
import { useEffect } from "react";
import { Input, RadioGroup, Select, SelectTypeReseau } from "../../Form";
import { Paragraphe, Title } from "../../Typography";

interface VotreReseauProps {
  internalStep: number;
  dispatch: AppDispatch;
}

const reseau_franchise = ["✅ Oui", "❌ Non"];

const point_ventes = ["1-5", "6-10", "11-20", "21-50", "51-100", "+100"];
const prestations = [
  "📄 Créer de nouveaux contrats",
  "🗂️ Centraliser mes contrats existants",
  "🔁 Mettre à jour ou renouveler mes contrats",
  "🧑🏻‍⚖️ Faire relire mes contrats par un avocat partenaire",
];

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

export const VotreReseau = ({ internalStep }: VotreReseauProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMaxInternalStep(5));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
        Votre réseau
      </Title>
      {internalStep === 1 && (
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
      {internalStep === 2 && (
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
      {internalStep === 3 && (
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
      {internalStep === 4 && (
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
      {internalStep === 5 && (
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

export const VotreReseauJeune = ({ internalStep }: VotreReseauProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMaxInternalStep(4));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
        Votre réseau
      </Title>
      {internalStep === 1 && (
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
      {internalStep === 2 && (
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
          {/* <RadioGroup
            showLogo={true}
            options={point_ventes}
            name="point_ventes"
          /> */}
        </>
      )}
      {internalStep === 3 && (
        <>
          <Paragraphe className="font-medium text-xl">
            Combien de points de vente exploitez-vous actuellement ?
          </Paragraphe>
          <Input
            type="number"
            placeholder="Nombre de points de vente"
            name="nombre_point_vente"
            classname="text-xl px-6 py-4 w-1/2"
          />
        </>
      )}
      {internalStep === 4 && (
        <>
          <Paragraphe className="font-medium text-xl">
            Quel type de prestations venez-vous chercher sur cette plateforme ?
          </Paragraphe>
          <RadioGroup
            showLogo={false}
            options={prestations}
            name="point_ventes"
          />
          <Input
            type="textarea"
            placeholder="Veuillez préciser si autre"
            name="autre"
            classname="h-56"
          />
        </>
      )}
    </div>
  );
};
