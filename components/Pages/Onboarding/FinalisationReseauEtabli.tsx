import { Button } from "@/components/Button";
import { LogoLegaleo } from "@/components/Logo";
import { Paragraphe, Title } from "@/components/Typography";
import { Notices } from "@/components/Typography/Tips";

export const FinalisationReseauEtabli = () => {
  return (
    <div className="flex flex-col px-32 py-20 justify-center items-center min-h-screen max-w-4xl mx-auto">
      <LogoLegaleo />
      <Title className="font-manrope font-bold text-4xl leading-20 text-[#1F120E] mb-5">
        🎉 Votre profil juridique est complet
      </Title>
      <Paragraphe className="font-normal text-xl leading-8 mb-10">
        Merci d’avoir pris le temps de renseigner vos informations.
      </Paragraphe>
      <Paragraphe className="font-medium text-xl leading-8 text-center">
        Grâce à ces éléments, vous pouvez désormais générer vos premiers
        contrats personnalisés et centraliser vos documents en toute conformité.
      </Paragraphe>
      <Notices classname="text-xl mt-12">
        Vous pourrez à tout moment mettre à jour vos informations depuis
        l’onglet « Informations du réseau » dans vos Réglages.
      </Notices>
      <Button
        primary={false}
        // onclick={onClick}
        classname="!bg-primary !border-primary hover:!bg-transparent hover:!text-secondary w-fit text-lg font-semibold mt-10 transition-colors"
      >
        Créer mon premier contrats
      </Button>
    </div>
  );
};
