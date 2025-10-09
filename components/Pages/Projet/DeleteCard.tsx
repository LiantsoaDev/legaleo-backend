import { Button } from "@/components/Button";
import { Paragraphe, Title } from "@/components/Typography";

interface DeleteCardProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteCard = ({ setShow }: DeleteCardProps) => {
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
        <Paragraphe className="font-semibold text-3xl text-black">
          🗑️
        </Paragraphe>
        <Title className="font-semibold text-2xl text-black" level={2}>
          Supprimer le document “Nom du document” ?
        </Title>
        <Paragraphe className="text-[#828282] font-medium text-base">
          Vous êtes sur le point de supprimer ce document.
          <br />
          ⚠️ Assurez-vous de vouloir continuer cette action avant de confirmer.
        </Paragraphe>
        <Paragraphe className="text-[#545FFF] font-medium text-base p-3.5 border border-[#545FFF]">
          Il sera déplacé dans la corbeille de votre Contrathèque, où il restera
          disponible pendant 30 jours. Passé ce délai, il sera définitivement
          supprimé et ne pourra plus être récupéré.
        </Paragraphe>
        <div className="flex flex-row gap-5 items-center !mt-5">
          <Button
            classname="!rounded-sm !bg-white !text-black border w-1/2"
            onclick={() => setShow(false)}
          >
            Annuler
          </Button>
          <Button classname="!rounded-sm w-1/2">Supprimer le document</Button>
        </div>
      </div>
    </div>
  );
};
