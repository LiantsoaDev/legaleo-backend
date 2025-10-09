import { Button } from "@/components/Button";
import { Input, SearchBar, Select } from "@/components/Form";
import { Title } from "@/components/Typography";

interface DupliquerProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Dupliquer = ({ setShow }: DupliquerProps) => {
  return (
    <div className="flex flex-col justify-center items-center fixed inset-0 bg-[#00000033] z-20">
      <div className="w-[700px] bg-white rounded-md shadow flex flex-col gap-5 p-7 relative">
        <svg
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-7 right-7 cursor-pointer"
          onClick={() => setShow(false)}
        >
          <path
            d="M17 17.5L1 1.5M17 1.5L1 17.5"
            stroke="#828282"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <Title className="font-semibold text-2xl text-black">
          Dupliquer le projet
        </Title>
        <Input
          name="file_name"
          placeholder="Nom contrat"
          type="text"
          label="Nom du fichier"
          value="Contrat_annuel.pdf"
        />
        <div className="flex flex-col gap-3.5">
          <label htmlFor="" className="font-semibold text-sm text-black">
            Choisissez un dossier
          </label>
          <Select
            id=""
            name=""
            options={["Dossier 1", "Dossier 2", "Dossier 3"]}
            classname="w-full"
            defaultValue="Aucun dossier"
          />
        </div>
        <div className="flex flex-col gap-3.5">
          <label htmlFor="" className="font-semibold text-sm text-black">
            Cocontractant*
          </label>
          <SearchBar
            classname="w-full border rounded-lg"
            placeholder="Rechercher"
          />
        </div>
        <Button
          type="submit"
          isLink
          href="/projets/1"
          classname="w-full text-center mx-auto rounded-sm !bg-[#087F83] !text-sm !font-semibold hover:!border-none hover:!text-white cursor-pointer hover:opacity-85"
        >
          Dupliquer
        </Button>
      </div>
    </div>
  );
};
