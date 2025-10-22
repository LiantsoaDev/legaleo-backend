import { Input, RadioGroup } from "../../Form";
import { Title } from "../../Typography";
import { Notices } from "../../Typography/Tips";

const options = [
  "Franchise",
  "Licence de marque",
  "Concession",
  "Affiliation",
  "Coopérative",
];

interface TypeReseauProps {
  networkType: string;
  onNetworkTypeChange: (value: string) => void;
  otherNetworkType: string;
  onOtherNetworkTypeChange: (value: string) => void;
}

export const TypeReseau = ({
  networkType,
  onNetworkTypeChange,
  otherNetworkType,
  onOtherNetworkTypeChange,
}: TypeReseauProps) => {
  return (
    <div className="flex flex-col min-h-screen justify-center px-32 py-20 w-full">
      <Title className="font-bold text-4xl leading-[100%] mb-8">
        Quel est le type de réseau que vous développez ?
      </Title>
      <div className="flex flex-col gap-5 w-full mt-10">
        <RadioGroup
          showLogo
          options={options}
          name="type_reseau"
          selectedValue={networkType}
          onValueChange={onNetworkTypeChange}
        />
      </div>
      <div className="flex gap-3 mt-10 text-black font-medium text-lg">
        <div className="flex items-center">
          Autre:
          <Input
            name="autre"
            placeholder=""
            type="text"
            classname="border-b-accent border-b-2 border-t-0 border-l-0 border-r-0 rounded-b-none text-accent text-base"
            value={otherNetworkType}
            onValueChange={onOtherNetworkTypeChange}
          />
        </div>
      </div>
      <Notices classname="mt-10">
        Cela nous permet d’adapter automatiquement les modèles de documents à
        votre structure juridique.
      </Notices>
    </div>
  );
};
