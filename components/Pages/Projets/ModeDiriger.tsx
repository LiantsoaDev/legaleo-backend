import { Button } from "@/components/Button";
import { Input, SearchBar } from "@/components/Form";
import { Paragraphe } from "@/components/Typography";

export const ModeDiriger = () => {
  return (
    <div className="w-5xl mx-auto my-0 flex flex-col gap-5 py-7">
      <Paragraphe className="text-left text-lg text-[#828282] font-medium">
        Complétez les champs suivant et laissez l’intelligence artificielle
        générez le contrat pour vous
      </Paragraphe>
      <form action="" className="flex flex-col gap-5">
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
            name="juridiction"
            placeholder=""
            label="Juridiction"
            classname="w-1/2"
          />
          <Input
            type="text"
            name="clause_specifique"
            placeholder=""
            label="Clause spécifique"
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
          classname="w-fit mx-auto rounded-sm !bg-[#087F83] !text-sm !font-semibold hover:!border-none hover:!text-white cursor-pointer hover:opacity-85"
        >
          Commencer 🚀
        </Button>
      </form>
    </div>
  );
};
