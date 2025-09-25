import { Button } from "@/components/Button";
import { Input, SearchBar } from "@/components/Form";
import { Paragraphe, Title } from "@/components/Typography";
import { Notices } from "@/components/Typography/Tips";
import Image from "next/image";
import Link from "next/link";

interface PersonnaliserProps {
  type: string;
  logo: any;
  nom: string;
  description: string;
}

export const Personnaliser = ({
  logo,
  type,
  nom,
  description,
}: PersonnaliserProps) => {
  return (
    <div className="flex flex-col gap-7 px-6 py-12 w-full max-w-5xl mx-auto">
      <div className="flex flex-col gap-5 items-center">
        <svg
          width="70"
          height="70"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="36" height="36" rx="18" fill="#62E7EB" />
          <path
            d="M19.4314 9.73291C18.5559 9.18571 17.4449 9.18571 16.5694 9.73291L11.1694 13.1079C10.38 13.6013 9.90039 14.4666 9.90039 15.3975V20.6022C9.90039 21.5332 10.38 22.3984 11.1694 22.8918L16.5694 26.2668C17.4449 26.814 18.5559 26.814 19.4314 26.2668L24.8314 22.8918C25.6208 22.3984 26.1004 21.5332 26.1004 20.6022V15.3975C26.1004 14.4666 25.6208 13.6013 24.8314 13.1079L19.4314 9.73291Z"
            fill="white"
            stroke="white"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </svg>
        <Title
          level={2}
          className="text-4xl font-manrope font-semibold text-black"
        >
          Personnalisez le modèle
        </Title>
      </div>
      <div className="flex flex-col gap-3.5">
        <Paragraphe className="font-semibold text-xl text-black text-left">
          Modèle de document
        </Paragraphe>
        <Link
          href="/projets/nouveau/models"
          className="border border-[#E3E3E3] rounded-lg p-3.5 flex items-center gap-5"
        >
          <Image src={logo} alt="Models logo" className="w-12 h-12" />
          <div className="flex flex-col">
            <span className="font-semibold text-[10px] py-1 px-2 bg-[#E6F2F2] text-[#087F83] w-fit mb-2">
              {type}
            </span>
            <Paragraphe className="text-xl font-semibold">{nom}</Paragraphe>
            <Paragraphe className="text-[#828282] text-sm font-medium">
              {description}
            </Paragraphe>
          </div>
        </Link>
      </div>
      <form className="flex flex-col gap-5">
        <Notices classname="mt-5 !text-base">
          Ces données sont nécessaires pour personnaliser votre contrat.
        </Notices>
        <div className="flex flex-row w-full gap-5 items-center">
          <Input
            type="text"
            name="type_contrat"
            placeholder=""
            label="Type de contrat"
            classname="w-1/2"
          />
          <Input
            type="text"
            name="duree_contrat"
            placeholder=""
            label="Durée"
            classname="w-1/2"
          />
        </div>

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
        <Button
          type="submit"
          isLink
          href="/projets/1"
          classname="w-fit mx-auto rounded-sm !bg-[#087F83] !text-sm !font-semibold hover:!border-none hover:!text-white cursor-pointer hover:opacity-85"
        >
          Commencer 🚀
        </Button>
      </form>
    </div>
  );
};
