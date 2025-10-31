import { InputFiles } from "../../Form";
import { Paragraphe, Title } from "../../Typography";
import { Notices } from "../../Typography/Tips";

interface DocumentsProps {
  onClick: () => void;
}

export const Documents = ({ onClick }: DocumentsProps) => {
  return (
    <div className="flex flex-col min-h-screen justify-center px-32 py-20 w-full ">
      <Title className="font-bold text-4xl leading-9 mb-8" level={2}>
        Documents utiles à la génération de vos contrats
      </Title>
      <Title className="font-bold text-2xl leading-9 mb-8" level={3}>
        Téléversez vos documents pour personnaliser vos futurs contrats.
      </Title>
      <Paragraphe className="text-xl text-text font-manrope font-normal leading-8">
        Legaleo analysera vos fichiers afin d’en extraire automatiquement les
        informations clés (clauses, durées, montants, obligations, annexes,
        etc.).
      </Paragraphe>
      <div className="flex flex-col gap-5 w-full mt-10">
        <InputFiles
          id="model"
          label="Modèle de contrat de franchise / licence / partenariat ( PDF OU DOCX)"
          name="model_franchise"
          accept=".pdf, .docx"
        />
        <InputFiles
          id="manuel"
          label="Manuel opératoire ( PDF OU DOCX)"
          name="manuel"
          accept=".pdf"
        />
        <InputFiles
          id="dip"
          label="DIP existant (si applicable) ( PDF OU DOCX)"
          name="dip_existant"
          accept=".pdf, .docx"
        />
        <InputFiles
          id="autre"
          label="Autres documents utiles (CGV, conditions d’adhésion, fiches produits, etc.)"
          name="autre_documents"
          accept=".pdf, .docx"
        />
      </div>
      <Paragraphe
        onClick={onClick}
        className="text-xl font-manrope font-semibold text-[#313131] mt-10 text-right underline cursor-pointer"
      >
        Je le ferai plus tard
      </Paragraphe>
      <Notices classname="mt-10 text-2xl">
        Toutes vos données sont stockées en France et protégées selon les normes
        RGPD.
      </Notices>
      <Notices classname="mt-5 text-2xl">
        Vous pourrez les modifier ou les compléter plus tard si besoin.
      </Notices>
    </div>
  );
};
