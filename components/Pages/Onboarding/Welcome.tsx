import { Button } from "../../Button";
import { Logo } from "../../Logo/Logo";
import { Paragraphe, Title } from "../../Typography";
import { Notices } from "../../Typography/Tips";

export const Welcome = () => {
  return (
    <div className="flex flex-col px-32 py-20 justify-center items-center min-h-screen max-w-4xl">
      <Logo className="w-52 h-16 filter grayscale mb-20" />
      <Title className="font-manrope font-bold text-2xl leading-[80px] text-[#1F120E] mb-5">
        Bienvenue sur Legaleo ! 👋
      </Title>
      <Paragraphe className="font-normal text-xl leading-8 mb-10">
        La seule plateforme juridique 100% dédiée aux réseaux de franchise.
      </Paragraphe>
      <Paragraphe className="font-medium text-xl leading-8 text-center">
        👉 Créez, centralisez et gérez tous vos contrats franchise en quelques
        clics.
      </Paragraphe>
      <Paragraphe className="p-2.5 bg-primary font-medium text-[#087F83] text-xl leading-8 rounded-lg mt-10 w-fit">
        🕓 En moins de 5 minutes, vous êtes opérationnel
      </Paragraphe>
      <Button
        primary={false}
        classname="!bg-primary !border-primary hover:!bg-transparent hover:!text-secondary w-fit text-lg font-semibold mt-10 transition-colors"
      >
        C&apos; est parti !
      </Button>
      <Notices classname="text-xl mt-12">
        Toutes vos données sont sécurisées et stockées en France 🇫🇷
      </Notices>
    </div>
  );
};
