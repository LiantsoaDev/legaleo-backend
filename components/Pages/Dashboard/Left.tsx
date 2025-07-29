import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../Button";
import { MenuText } from "./MenuText";

const navMenu = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Contrat en cours", href: "/dashboard/contrat" },
  { name: "Contrathèque", href: "/dashboard/contratheque" },
  { name: "Cocontractant", href: "/dashboard/cocontractant" },
  { name: "Modèles", href: "/dashboard/modeles" },
  { name: "Clauses dynamiques", href: "/dashboard/clause-dynamiques" },
  { name: "Assistant IA", href: "/dashboard/assistance-ia" },
];

export const Left = () => {
  return (
    <div className="w-1/5 fill-available px-5 py-0 flex flex-col justify-between">
      <div className="flex flex-col gap-0">
        {/* Add your menu items here */}
        {/* Example: */}
        <Button classname="flex gap-1 mb-10 items-center justify-center py-5 rounded-none !bg-primary !text-black hover:border-none cursor-pointer hover:opacity-85 transition-all duration-300">
          <FontAwesomeIcon icon={faPlus} /> Nouveau projet
        </Button>
        {navMenu.map((item) => (
          <MenuText key={item.name} href={item.href} className="text-white">
            {item.name}
          </MenuText>
        ))}
      </div>
      <div className="flex mt-10 flex-col gap-0">
        <MenuText href="/dashboard/revision" className="text-white">
          Documentation
        </MenuText>
        <MenuText href="/dashboard/revision" className="text-white">
          Supports
        </MenuText>
        <MenuText href="/dashboard/revision" className="text-white">
          Privacy & Légal
        </MenuText>
      </div>
    </div>
  );
};
