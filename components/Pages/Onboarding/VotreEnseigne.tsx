"use client";
import { Input } from "../../Form";
import { Paragraphe, Title } from "../../Typography";
import { Notices } from "../../Typography/Tips";

export const VotreEnseigne = ({}) => {
  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
        Votre enseigne
      </Title>
      <Paragraphe className="font-medium text-xl">
        Renseignez votre SIRET afin que l’on puisse retrouver votre entreprise et
        renseigner automatiquement vos informations{" "}
      </Paragraphe>
      <div className="flex flex-row gap-5">
        <Input
          type="text"
          placeholder="Nom de votre enseigne (Nom juridique)"
          name="enseigne_nom"
          classname="text-xl px-6 py-4 w-full"
        />
      </div>
      <Notices classname="mt-5 !text-xl">
        Indiquez ici le nom de votre marque. Cela nous permettra de
        personnaliser vos modèles de contrat.
      </Notices>
    </div>
  );
};
