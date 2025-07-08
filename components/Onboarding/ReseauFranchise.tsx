import { Input } from "../Form";
import { Title } from "../Typography";
import { Notices } from "../Typography/Tips";

export const ReseauFranchise = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center px-32 py-20 max-w-4xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8">
        Quel est le nom de votre réseau de franchise ?
      </Title>
      <div className="flex flex-row gap-5">
        <Input
          type="text"
          placeholder="Nom du réseau (nom juridique)"
          name="franchise_name"
        />
      </div>
      <Notices classname="mt-5">
        Indiquez ici le nom de votre marque. Cela nous permettra de
        personnaliser vos modèles de contrat.
      </Notices>
    </div>
  );
};
