import { Select } from "../../Form";
import { Title } from "../../Typography";
import { Notices } from "../../Typography/Tips";

const options = [
  "Restauration",
  "Commerce de détail",
  "Services à la personne",
  "Bâtiment / Habitat",
  "Beauté / Bien-être",
  "Automobile",
  "Fitness / Sport",
  "Santé",
  "Immobilier",
];

export const Activite = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center px-32 py-20 w-full">
      <Title className="font-bold text-4xl w-3/5 leading-[100%] mb-8">
        Quel est le secteur d’activité de votre réseau ?
      </Title>
      <div className="flex flex-col gap-5 w-full flex-wrap">
        <Select
          id="reseau_activity"
          options={options}
          name="activity"
          classname="w-full"

          // isMultiple
        />
      </div>
      <Notices classname="mt-5 !text-xl">
        Cela nous permet d’adapter au mieux vos modèles de contrat et vos
        recommandations futures.
      </Notices>
    </div>
  );
};
