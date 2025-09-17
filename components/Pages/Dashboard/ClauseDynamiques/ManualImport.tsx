import { Button } from "@/components/Button";
import { Input } from "@/components/Form";

export const ManualImport = () => {
  return (
    <form className="flex flex-col gap-3.5 py-5">
      <Input
        type="text"
        placeholder=""
        label="Titre de la clause"
        name="titre_clause"
      />
      <Input type="text" placeholder="" label="Catégorie" name="category" />
      <Input
        type="textarea"
        label="Texte de la clause"
        name="text_clause"
        placeholder=""
        classname="h-96"
      />
      <Button classname="w-full rounded-xs">Créer la clause</Button>
    </form>
  );
};
