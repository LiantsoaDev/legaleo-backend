import franchiseur from "@/assets/images/logo_franchiseur.png";
import { RadioGroup, SearchBar } from "@/components/Form";
import { Paragraphe, Title } from "@/components/Typography";
import { ModelContrat } from "./ModelContrat";

const options = [
  "Tous",
  "Contrat de franchise",
  "Contrat de licence de marque",
  "DIP",
  "Convention d'enseigne",
  "Pacte d’associés",
  "Lettre de résiliation",
  "Contrat de réservation de zone",
];

const modelContrats = [
  {
    type: "Franchiseur",
    description:
      "Modèle de contrat pour encadrer la relation entre franchiseur et franchisé.",
    nom: "Contrat de franchise",
    logo: franchiseur,
  },
  {
    type: "Franchiseur",
    description:
      "Modèle permettant d'accorder à un tiers le droit d'utiliser une marque.",
    nom: "Contrat de licence de marque",
    logo: franchiseur,
  },
  {
    type: "Franchiseur",
    description:
      "Modèle de DIP conforme à la législation pour informer le futur franchisé.",
    nom: "Document d’Information Précontractuel",
    logo: franchiseur,
  },
  {
    type: "Franchiseur",
    description:
      "Modèle encadrant l’utilisation d’une enseigne commerciale par un tiers.",
    nom: "Convention d’enseigne",
    logo: franchiseur,
  },
  {
    type: "Franchiseur",
    description:
      "Modèle définissant les droits, obligations et règles entre associés.",
    nom: "Pacte d’associés",
    logo: franchiseur,
  },
  {
    type: "Franchiseur",
    description:
      "Modèle de lettre permettant la rupture d’un contrat dans les règles.",
    nom: "Lettre de résiliation",
    logo: franchiseur,
  },
  {
    type: "Franchiseur",
    description:
      "Modèle pour garantir une exclusivité territoriale au franchisé.",
    nom: "Contrat de réservation de zone",
    logo: franchiseur,
  },
];

export const Models = () => {
  return (
    <div className="flex flex-col w-full gap-7 px-6">
      <div className="flex flex-col gap-5 items-center">
        <Title className="font-semibold text-black text-4xl">Modèles</Title>
        <Paragraphe className="text-[#828282] text-base font-medium text-center max-w-3xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud e
        </Paragraphe>
      </div>
      <div className="flex flex-row items-center justify-center gap-2.5">
        <SearchBar classname="border-gray border !shadow-none !w-1/2" />
        <svg
          width="35"
          height="35"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 cursor-pointer"
        >
          <rect x="0.5" y="0.5" width="34" height="34" rx="17" fill="#62E7EB" />
          <path
            d="M18.8515 9.69229C18.0246 9.17549 16.9754 9.17549 16.1485 9.69229L11.0485 12.8798C10.3029 13.3458 9.84998 14.163 9.84998 15.0422V19.9577C9.84998 20.837 10.3029 21.6542 11.0485 22.1201L16.1485 25.3076C16.9754 25.8244 18.0246 25.8244 18.8515 25.3076L23.9515 22.1201C24.697 21.6542 25.15 20.837 25.15 19.9577V15.0422C25.15 14.163 24.697 13.3458 23.9515 12.8798L18.8515 9.69229Z"
            fill="white"
            stroke="white"
            strokeWidth="1.275"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <RadioGroup
        options={options}
        name="autorise_relecture"
        classContainer="flex gap-2.5 flex-wrap justify-center max-w-3xl my-0 mx-auto"
        classLabel="!py-2 text-xs bg-[#F2F8F8] text-[#86A2A3] border-none"
        classSelected="!bg-[#86A2A3]"
      />
      <div className="flex flex-row gap-5 flex-wrap justify-between w-full">
        {modelContrats.map((contrat, index) => (
          <ModelContrat
            key={index}
            type={contrat.type}
            description={contrat.description}
            nom={contrat.nom}
            logo={contrat.logo}
          />
        ))}
      </div>
    </div>
  );
};
