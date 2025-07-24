import { Button } from "../../Button";
import { Paragraphe, Title } from "../../Typography";
import { Notices } from "../../Typography/Tips";

export const Finalisation = () => {
  return (
    <div className="flex flex-col px-32 py-20 justify-center h-screen max-w-5xl">
      <Title className="font-manrope font-bold text-2xl leading-[48px] text-[#1F120E] mb-11">
        🎉 Bienvenue sur votre espace Legaleo !
      </Title>
      <Paragraphe className="font-normal text-xl leading-8 mb-5">
        Vous pouvez dès maintenant créer votre premier contrat de franchise.
      </Paragraphe>
      <Paragraphe className="font-medium text-xl leading-8">
        Cliquez sur “Explorer mon tableau de bord” pour lancer l’assistant de
        création.
      </Paragraphe>
      <Notices classname="text-lg mt-8">
        Vos infos sont stockées en toute sécurité.
      </Notices>
      <Button
        href="/dashboard"
        isLink={true}
        primary={false}
        classname="!bg-primary !border-primary hover:!bg-transparent hover:!text-secondary w-fit !text-lg !text-secondary font-semibold mt-16 transition-colors !py-3 !px-4 "
      >
        Explorer mon tableau de bord
      </Button>
    </div>
  );
};
