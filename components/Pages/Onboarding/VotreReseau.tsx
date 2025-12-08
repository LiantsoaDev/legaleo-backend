"use client";
import { Notices } from "@/components/Typography/Tips";
import {
  saveStepData,
  setMaxInternalStep,
  updateFormData,
} from "@/lib/features/slice/onboardingSlice";
import { useAppSelector } from "@/lib/hook";
import { AppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
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

export const VotreReseau = ({
  internalStep,
  dispatch: storeDispatch,
}: VotreReseauProps) => {
  const router = useRouter();
  const { id: userId } = useAppSelector((state) => state.user);
  const { onboardings } = useAppSelector((state) => state.onboarding);

  useEffect(() => {
    storeDispatch(setMaxInternalStep(5));
  }, [storeDispatch]);

  const handleNetworkChoice = useCallback(
    async (normalizedValue: string, rawOption?: string) => {
      const persistedValue = rawOption ?? normalizedValue;
      
      // Mettre à jour immédiatement le state pour que le RadioGroup affiche la valeur sélectionnée
      storeDispatch(updateFormData({ reseau_existant: persistedValue }));
      
      if (userId && onboardings) {
        try {
          await storeDispatch(
            saveStepData({
              userId,
              onboardingDatas: onboardings,
              valuesOverride: { reseau_existant: persistedValue },
            })
          ).unwrap();
        } catch (error) {
          console.error("Impossible d'enregistrer la réponse", error);
        }
      }

      // Seulement rediriger vers dashboard si "non" est sélectionné
      // Pour "oui", on reste dans l'onboarding général
      if (normalizedValue === "non") {
        router.push("/dashboard");
      }
    },
    [storeDispatch, userId, onboardings, router]
  );

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
            options={reseau_franchise}
            name="reseau_existant"
            onChange={handleNetworkChoice}
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
            name="points_de_vente"
            onChange={(normalizedValue, rawOption) => {
              const value = rawOption ?? normalizedValue;
              storeDispatch(updateFormData({ points_de_vente: value }));
            }}
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
            onChange={(normalizedValue, rawOption) => {
              const value = rawOption ?? normalizedValue;
              storeDispatch(updateFormData({ localisation: value }));
            }}
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
            id="secteur_activite"
            name="secteur_activite"
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
            id="type_reseau"
            name="type_reseau"
            classname="w-full"
          />
        </>
      )}
    </div>
  );
};

export const VotreReseauJeune = ({
  internalStep,
  dispatch: storeDispatch,
}: VotreReseauProps) => {
  const router = useRouter();
  const { id: userId } = useAppSelector((state) => state.user);
  const { onboardings } = useAppSelector((state) => state.onboarding);

  useEffect(() => {
    storeDispatch(setMaxInternalStep(4));
  }, [storeDispatch]);

  const handleNetworkChoice = useCallback(
    async (normalizedValue: string, rawOption?: string) => {
      const persistedValue = rawOption ?? normalizedValue;
      if (userId && onboardings) {
        try {
          await storeDispatch(
            saveStepData({
              userId,
              onboardingDatas: onboardings,
              valuesOverride: { reseau_existant: persistedValue },
            })
          ).unwrap();
        } catch (error) {
          console.error("Impossible d'enregistrer la réponse", error);
        }
      }
      if (normalizedValue === "non") {
        router.push("/dashboard");
      }
    },
    [storeDispatch, userId, onboardings, router]
  );

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
            options={reseau_franchise}
            name="reseau_existant"
            onChange={handleNetworkChoice}
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
            id="secteur_activite"
            name="secteur_activite"
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
            name="prestations_plateforme"
          />
          <Input
            type="textarea"
            placeholder="Veuillez préciser si autre"
            name="prestations_precision"
            classname="h-56"
          />
        </>
      )}
    </div>
  );
};
