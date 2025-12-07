import { useAppSelector } from "@/lib/hook";
import { useSession } from "next-auth/react";
import { Input, Select } from "../../Form";
import { Title } from "../../Typography";
import { Notices } from "../../Typography/Tips";
import { useOnboardingFormData } from "./OnboardingFormContext";

const option: string[] = [
  "Fondateur",
  "Directeur réseau",
  "Directeur des opérations",
  "Responsable développement",
  "Animateur réseau",
  "Responsable Juridique",
  "Consultant externalisé",
];

export const UserName = () => {
  const { data: session } = useSession();
  const { name, lastName } = useAppSelector((state) => state.user);
  const onboardingFormData = useOnboardingFormData();

  const resolvedFirstName = name ?? session?.user?.name ?? "";
  const resolvedLastName = lastName ?? session?.user?.last_name ?? "";
  // Récupérer l'email uniquement depuis les données sauvegardées du formulaire d'onboarding
  const resolvedEmail = (onboardingFormData?.email as string | undefined) ?? "";

  return (
    <div className="flex flex-col min-h-screen justify-center px-32 py-20 w-[788px] items-start">
      <Title className="font-bold text-4xl leading-[100%] mb-8">
        Vos informations
      </Title>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-row gap-5 w-full">
          <Input
            type="text"
            placeholder="Nom"
            name="name"
            classname="text-xl px-6 py-4 w-1/2"
            defaultValue={resolvedFirstName}
          />
          <Input
            type="text"
            placeholder="Prénom"
            name="last_name"
            classname="text-xl px-6 py-4 w-1/2"
            defaultValue={resolvedLastName}
          />
        </div>
        <Input
          type="email"
          placeholder="Email professionnel"
          name="email"
          classname="text-xl px-6 py-4"
          defaultValue={resolvedEmail}
        />
        <Select
          options={option}
          id="fonction"
          name="fonction"
          classname="w-full"
          defaultValue="Indiquez votre fonction"
        />
      </div>
      <Notices classname="mt-5 text-lg!">
        Ces infos alimentent le back-office et la personnalisation de votre
        tableau de bord.
      </Notices>
    </div>
  );
};
