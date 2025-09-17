import { OnboardingStep } from "@/app/generated/prisma";
import { Input } from "../../Form";
import { Title } from "../../Typography";
import { Notices } from "../../Typography/Tips";

interface UserNameProps {
  onboardingStep?: OnboardingStep;
}

export const ReseauFranchise = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center px-32 py-20 w-full">
      <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
        Quel est le nom de votre réseau de franchise ?
      </Title>
      <div className="flex flex-row gap-5">
        <Input
          type="text"
          placeholder="Nom du réseau (nom juridique)"
          name="franchise_name"
          classname="!text-2xl !px-7 !py-5"
        />
      </div>
      <Notices classname="mt-5 !text-xl">
        Indiquez ici le nom de votre marque. Cela nous permettra de
        personnaliser vos modèles de contrat.
      </Notices>
    </div>
  );
};
