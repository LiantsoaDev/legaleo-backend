import { Title } from "@/components/Typography";
import { Question } from "@/utils/types";
import ConditionalForm from "./ConditionalForm";

const questions1: Question[] = [
  {
    id: "q1",
    label: "Organisez-vous une convention annuelle pour le réseau ?",
    type: "yesno",
  },
  {
    id: "q2",
    label: "Qui prend en charge les frais de déplacement ?",
    type: "yesno",
    option: ["Tête de réseau", "Affilié"],
    showLogo: true,
    dependsOn: "q1",
    condition: "oui",
  },
];

export const ConventionAnnuel = () => {
  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
        Formation
      </Title>
      <ConditionalForm questions={questions1} />
    </div>
  );
};
