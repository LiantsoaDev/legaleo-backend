import franchiseur from "@/app/assets/images/logo_franchiseur.png";
import { ModelContrat } from "./ModelContrat";

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
];

export const Favoris = () => {
  return (
    <div className="flex flex-row gap-5 flex-wrap justify-start w-full">
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
  );
};
