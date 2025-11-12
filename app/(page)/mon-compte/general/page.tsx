import { Button } from "@/components/Button";
import { Input } from "@/components/Form";
import { Paragraphe, Title } from "@/components/Typography";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex flex-col gap-10 relative max-w-2xl">
      <div className="flex flex-col gap-2">
        <Title level={2} className="font-semibold text-2xl text-black">
          Informations générales
        </Title>
        <Paragraphe className="font-medium text-sm text-[#828282]">
          Pretend not to be evil meow to be let out intently stare at the same .
        </Paragraphe>
      </div>
      <Title level={3} className="font-semibold text-sm text-black">
        Icône d’espace de travail
      </Title>
      <div className="flex flex-row items-center gap-4 mb-5">
        <Image
          src="../../../assets/images/pdp.png"
          alt="photo de profil"
          width={80}
          height={80}
        />
        <div className="flex flex-row gap-4 items-center">
          <label
            htmlFor="photo_profil"
            className="bg-[#F2F2F2] py-2 px-4 rounded-sm text-xs font-bold cursor-pointer text-[#828282] hover:bg-[#E0E0E0] transition"
          >
            Importer une image
          </label>
          <input
            type="file"
            name="photo_profil"
            id="photo_profil"
            className="hidden"
          />
          <Button href="#" classname="!text-xs">
            Supprimer
          </Button>
        </div>
      </div>
      <Input
        name="nom_espace"
        placeholder="Nom de l’espace de travail"
        type="text"
        label="Nom de l’espace de travail"
      />
      <div className="flex flex-row gap-5 items-center !mt-5">
        <Button classname="!rounded-sm">Sauvegarder</Button>
        <Button href="#">Annuler</Button>
      </div>
    </div>
  );
};

export default page;
