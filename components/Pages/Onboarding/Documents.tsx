import { InputFiles } from "../../Form";
import { Paragraphe, Title } from "../../Typography";
import { Notices } from "../../Typography/Tips";

type DocumentKey = "status_entreprise" | "kbis" | "pacte_associe";

interface DocumentsProps {
  documentNames: Partial<Record<DocumentKey, string>>;
  onFileChange: (key: DocumentKey, file: File | null) => void;
}

export const Documents = ({
  documentNames,
  onFileChange,
}: DocumentsProps) => {
  return (
    <div className="flex flex-col min-h-screen justify-center px-32 py-20w-full">
      <Title className="font-bold text-4xl leading-9 mb-8">
        Déposez vos documents pour générer automatiquement vos contrats
      </Title>
      <Paragraphe className="text-2xl font-manrope font-normal leading-8">
        Ces documents nous permettent de personnaliser vos modèles de contrats
        et de centraliser vos informations juridiques dans un espace sécurisé.
      </Paragraphe>
      <div className="flex flex-col gap-5 w-full mt-10">
        <InputFiles
          id="status"
          label="Statuts de la société ( PDF OU DOCX)"
          name="status_entreprise"
          accept=".pdf, .docx"
          fileName={documentNames.status_entreprise}
          onFileChange={(file) => onFileChange("status_entreprise", file)}
        />
        <InputFiles
          id="kbis"
          label="Kbis ou équivalent ( PDF uniquement )"
          name="kbis"
          accept=".pdf"
          fileName={documentNames.kbis}
          onFileChange={(file) => onFileChange("kbis", file)}
        />
        <InputFiles
          id="pacte_associe"
          label="Pacte d’associés ( PDF OU DOCX)"
          name="pacte_associe"
          accept=".pdf, .docx"
          fileName={documentNames.pacte_associe}
          onFileChange={(file) => onFileChange("pacte_associe", file)}
        />
      </div>
      <Paragraphe className="text-xl font-manrope font-semibold text-[#313131] mt-10 text-right underline cursor-pointer">
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
