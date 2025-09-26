import { Button } from "@/components/Button";
import { Input, SearchBar } from "@/components/Form";
import { Paragraphe, Title } from "@/components/Typography";

const page = () => {
  return (
    <div className="flex flex-col gap-5 w-full max-w-5xl py-12 mx-auto">
      <div className="flex flex-col gap-5 items-center">
        <Title
          level={2}
          className="text-4xl font-manrope font-semibold text-black"
        >
          Rechercher un projet à signer
        </Title>
      </div>
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-3.5">
          <Paragraphe className="font-semibold text-lg text-black">
            Commencez par importer un document
          </Paragraphe>
          <span className="text-[#828282] text-sm font-medium">
            Votre document sera alors converti en modèle pour le modifier et le
            signer
          </span>
          <label
            className="flex flex-row gap-3.5 justify-center items-center w-full border-2 border-dashed border-[#3300FF] rounded-lg h-52 cursor-pointer bg-accent"
            htmlFor="document"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 17.5V3.5"
                stroke="#3300FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.5 21.5H4.5"
                stroke="#3300FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.5 12.5L12.499 17.501L7.49902 12.5"
                stroke="#3300FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-col">
              <p className="font-semibold text-sm text-black">
                Faites glisser les fichiers ou{" "}
                <span className="text-[#3300FF]">cliquez</span> pour les
                parcourir
              </p>
              <span className="font-semibold text-xs text-[#828282]">
                Fichiers autorisés: .docx, .pdf
              </span>
            </div>
          </label>
          <input
            type="file"
            id="document"
            className="hidden"
            accept=".docx, .pdf"
          />
          <div className="flex flex-row w-full gap-5 items-center">
            <Input
              type="text"
              name="nom_document"
              placeholder=""
              label="Nom du document"
              classname="w-full"
            />
          </div>
          <div className="flex flex-col w-full gap-2 mb-5">
            <label className="form-label font-manrope text-sm font-semibold">
              Cocontractant
            </label>
            <SearchBar
              classname="w-full rounded-xs !shadow-none border border-gray"
              placeholder="Rechercher"
            />
          </div>
          <div className="flex justify-end w-full">
            <Button
              type="submit"
              isLink
              href="/projets/signer-projet/destinataire"
              classname="w-fit rounded-sm !bg-[#087F83] !text-sm !font-semibold hover:!border-none hover:!text-white cursor-pointer hover:opacity-85"
            >
              Suivant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
