import { Navigateur } from "@/components/Fichier";
import { Title } from "@/components/Typography";

export const Contratheque = () => {
  return (
    <div className="flex flex-col gap-8">
      <Title className="font-semibold text-2xl">Contrathèque</Title>
      <div className="flex flex-row gap-0">
        <div className="w-1/5 py-0 border-r border-r-gray fill-available pr-3.5">
          <Navigateur />
        </div>
        <div className="w-4/5">Tableau</div>
      </div>
    </div>
  );
};
