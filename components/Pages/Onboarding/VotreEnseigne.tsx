"use client";
import { Paragraphe, Title } from "../../Typography";
import { Notices } from "../../Typography/Tips";

export const VotreEnseigne = ({}) => {
  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
        Votre enseigne
      </Title>
      <Paragraphe className="font-medium text-xl">
        Renseignez votre RCS afin que l’on puisse retrouver votre entreprise et
        renseigner automatiquement vos informations{" "}
      </Paragraphe>
      <div className="flex flex-row gap-5">
        <input
          className={`w-full border border-opacity-60 rounded-sm px-2 py-3 md:px-4 md:py-4 lg:px-2 lg:py-3 md:text-lg lg:text-base focus:outline-none focus:bg-white focus:text-black outline-none text-black `}
          type="text"
          placeholder="Nom de votre enseigne (Nom juridique)"
          name="nom"
          id="nom"
          formNoValidate
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
      <Notices classname="mt-5 !text-xl">
        Indiquez ici le nom de votre marque. Cela nous permettra de
        personnaliser vos modèles de contrat.
      </Notices>
    </div>
  );
};
