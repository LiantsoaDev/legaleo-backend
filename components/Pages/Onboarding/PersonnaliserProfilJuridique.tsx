import { Button } from "@/components/Button";
import { LogoLegaleo } from "@/components/Logo";
import { Paragraphe, Title } from "@/components/Typography";
import { Notices } from "@/components/Typography/Tips";

interface PersonnaliserProfilJuridiqueProps {
  onClick: () => void;
}

export const PersonnaliserProfilJuridique = ({
  onClick,
}: PersonnaliserProfilJuridiqueProps) => {
  return (
    <div className="flex flex-col px-32 py-20 justify-center items-center min-h-screen max-w-6xl mx-auto">
      <LogoLegaleo />
      <Title className="font-manrope font-bold text-4xl leading-20 text-[#1F120E] mb-5">
        Personnalisez votre profil juridique
      </Title>
      <Paragraphe className="font-normal text-xl leading-8 mb-10 text-center">
        Grâce à un onboarding juridique, nous pourrons adapter vos contrats à
        votre réseau et assurer la conformité juridique de vos documents.
      </Paragraphe>
      <Paragraphe className="font-medium text-xl leading-8 text-center">
        Vous pourrez revenir à tout moment pour compléter ou modifier vos
        réponses.
      </Paragraphe>
      <Paragraphe className="p-2.5 bg-[#D9FDFB] font-medium text-[#087F83] text-xl leading-8 rounded-lg mt-10 w-fit text-center">
        ⏱️ Durée estimée : moins de 8 minutes
      </Paragraphe>
      <Button
        primary={false}
        onclick={onClick}
        classname="!bg-primary !border-primary hover:!bg-transparent hover:!text-secondary w-fit text-lg font-semibold mt-10 transition-colors"
      >
        Commencer l'onboarding juridique
      </Button>
      <Notices classname="text-xl mt-12 w-full">
        Vos informations sont confidentielles et utilisées uniquement dans le
        cadre de votre utilisation de la plateforme/
      </Notices>
    </div>
  );
};
