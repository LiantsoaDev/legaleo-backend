"use client";
import { RadioGroup } from "@/components/Form";
import { setMaxInternalStep } from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch } from "@/lib/hook";
import { Question } from "@/utils/types";
import { useEffect } from "react";
import { Paragraphe, Title } from "../../Typography";
import ConditionalForm from "./ConditionalForm";

interface ApprovisionnementProps {
  internalStep: number;
}

const questions1: Question[] = [
  {
    id: "q1",
    label: "Disposez-vous d’un site marchand ?",
    type: "yesno",
  },
  {
    id: "q2",
    label:
      "À partir de votre site, pouvez-vous vendre directement à des clients situés sur le territoire des affiliés ?",
    type: "yesno",
    dependsOn: "q1",
    condition: "oui",
  },
  {
    id: "q3",
    label:
      "Existe-t-il un système de compensation (commission, réaffectation client, etc.) ?",
    type: "yesno",
    dependsOn: "q2",
    condition: "oui",
  },
];

const questions2: Question[] = [
  {
    id: "q1",
    label:
      "Les affiliés sont-ils tenus de s’approvisionner auprès de la tête de réseau ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Pour quels produits ?",
    type: "text",
    dependsOn: "q1",
    condition: "oui",
    subquestion: {
      id: "sq1",
      label: "Part estimée du volume total (%)",
      type: "number",
    },
  },
  {
    id: "q3",
    label: "Part estimée du volume total (%)",
    type: "text",
    dependsOn: "q2",
    condition: "oui",
  },
];

const questions3: Question[] = [
  {
    id: "q1",
    label:
      "Un stock de départ doit-il être constitué par l’affilié lorsqu’il s’installe ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Listez ou téléversez la liste de produits et quantités minimales:",
    placeholder:
      "Quelle quantité ? Pour quels produits le stock doit-il contenir ? Et pour chaque produit, quelle quantité ?",
    type: "textareaAndFile",
    dependsOn: "q1",
    condition: "oui",
  },
];

const questions4: Question[] = [
  {
    id: "q1",
    label: "L’affilié doit-il maintenir un stock minimum pendant le contrat ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Listez ou téléversez la liste de produits et quantités minimales:",
    placeholder:
      "Quelle quantité ? Pour quels produits le stock doit-il contenir ? Et pour chaque produit, quelle quantité ?",
    type: "textareaAndFile",
    dependsOn: "q1",
    condition: "oui",
  },
];

const questions5: Question[] = [
  {
    id: "q1",
    label:
      "À la fin du contrat, le stock peut-il être repris par le franchiseur ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "À quelles conditions ?",
    placeholder:
      "Conditions de reprise (ex : 50% de la valeur d’achat, produits non périmés, etc.)",
    type: "textarea",
    dependsOn: "q1",
    condition: "oui",
  },
];

export const Approvisionnement = ({ internalStep }: ApprovisionnementProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMaxInternalStep(6));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      {internalStep === 1 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Approvisionnement
          </Title>
          <ConditionalForm questions={questions1} />
        </>
      )}
      {internalStep === 2 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Approvisionnement
          </Title>
          <ConditionalForm questions={questions2} />
        </>
      )}
      {internalStep === 3 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Approvisionnement
          </Title>
          <Paragraphe className="font-medium text-xl">
            Les produits sont-ils vendus par la tête de réseau ou par des
            fournisseurs référencés ?
          </Paragraphe>
          <RadioGroup
            showLogo={true}
            options={["Tête de réseau", "Fournisseurs référencés"]}
            name="fourniseur"
          />
        </>
      )}
      {internalStep === 4 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Approvisionnement
          </Title>
          <ConditionalForm questions={questions3} />
        </>
      )}
      {internalStep === 5 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Approvisionnement
          </Title>
          <ConditionalForm questions={questions4} />
        </>
      )}
      {internalStep === 6 && (
        <>
          <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
            Approvisionnement
          </Title>
          <ConditionalForm questions={questions5} />
        </>
      )}
    </div>
  );
};
