"use client";
import { TextareaIA } from "@/components/Form";
import { setMaxInternalStep } from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch } from "@/lib/hook";
import { Question } from "@/utils/types";
import { useEffect } from "react";
import { Paragraphe, Title } from "../../Typography";
import ConditionalForm from "./ConditionalForm";

interface ConceptSavoirFaireProps {
  internalStep: number;
}

const questions: Question[] = [
  {
    id: "q1",
    label: "Avez-vous mis au point un processus réitérable à l’affilié ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Est-il écrit dans un manuel quelconque ?",
    type: "yesno",
    dependsOn: "q1",
    condition: "oui",
  },
  {
    id: "q3",
    label: "Importez votre document, si vous en disposez: ",
    type: "file",
    dependsOn: "q2",
    condition: "oui",
  },
];

export const ConceptSavoirFaire = ({
  internalStep,
}: ConceptSavoirFaireProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMaxInternalStep(4));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      {internalStep === 1 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Concept et savoir-faire
          </Title>
          <Paragraphe className="font-semibold text-2xl">
            Quel est votre savoir-faire ?
          </Paragraphe>
          <Paragraphe className="font-medium text-xl text-text">
            Décrivez les compétences, méthodes ou procédés spécifiques qui font
            la singularité de votre activité. Mentionnez les éléments que vos
            futurs affiliés devront maîtriser pour reproduire votre concept (ex.
            organisation, techniques, protocoles, formation, outils, etc.).
          </Paragraphe>
          <TextareaIA
            name="mandona"
            suggestions={[
              "Générer un exemple selon mon secteur",
              "M’aider à structurer ma réponse",
              "Reformuler ma réponse actuelle",
            ]}
          />
        </>
      )}
      {internalStep === 2 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Concept et savoir-faire
          </Title>
          <Paragraphe className="font-semibold text-2xl">
            Vendez-nous votre concept.
          </Paragraphe>
          <Paragraphe className="font-medium text-xl text-text">
            Expliquez ce qui rend votre concept unique sur le marché :
            expérience client, identité de marque, positionnement, innovation,
            ambiance, promesse commerciale, etc. Soyez concret et mettez en
            avant les points qui distinguent votre réseau de la concurrence.
          </Paragraphe>
          <TextareaIA
            name="mandona"
            suggestions={[
              "Générer un exemple selon mon secteur",
              "M’aider à structurer ma réponse",
              "Reformuler ma réponse actuelle",
            ]}
          />
        </>
      )}
      {internalStep === 3 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Concept et savoir-faire
          </Title>
          <Paragraphe className="font-semibold text-2xl">
            Décrivez-nous votre projet. Soyez le plus précis possible.
          </Paragraphe>
          <Paragraphe className="font-medium text-xl text-text">
            Expliquez ce qui rend votre concept unique sur le marché :
            expérience client, identité de marque, positionnement, innovation,
            ambiance, promesse commerciale, etc. Soyez concret et mettez en
            avant les points qui distinguent votre réseau de la concurrence.
          </Paragraphe>
          <TextareaIA
            name="mandona"
            suggestions={[
              "Générer un exemple selon mon secteur",
              "M’aider à structurer ma réponse",
              "Reformuler ma réponse actuelle",
            ]}
          />
        </>
      )}
      {internalStep === 4 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Concept et savoir-faire
          </Title>
          <ConditionalForm questions={questions} />
        </>
      )}
    </div>
  );
};
