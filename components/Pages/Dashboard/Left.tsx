"use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { Button } from "../../Button";
import { MenuText } from "./MenuText";

const navMenu = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Contrat en cours", href: "/dashboard/contrat" },
  { name: "Contrathèque", href: "/dashboard/contratheque" },
  { name: "Cocontractant", href: "/dashboard/cocontractant" },
  { name: "Modèles", href: "/dashboard/models" },
  { name: "Clauses dynamiques", href: "/dashboard/clause-dynamiques" },
  { name: "Assistant IA", href: "/dashboard/assistance-ia" },
];

export const Left = () => {
  const pathname = usePathname();
  return (
    <div className="w-1/5 fill-available px-5 py-0 flex flex-col justify-between">
      <div className="flex flex-col gap-0">
        {/* Add your menu items here */}
        {/* Example: */}
        <Button classname="flex gap-1 mb-10 items-center justify-center py-5 rounded-sm !bg-primary !text-black hover:border-none cursor-pointer hover:opacity-85 transition-all duration-300">
          <FontAwesomeIcon icon={faPlus} /> Nouveau projet
        </Button>
        {navMenu.map((item) => (
          <MenuText
            key={item.name}
            href={item.href}
            className="text-white"
            isActive={pathname === item.href}
          >
            {item.name}
          </MenuText>
        ))}
      </div>
      <div className="flex mt-10 flex-col gap-0">
        <MenuText
          href="/dashboard/revision"
          className="text-white"
          isActive={pathname === "/dashboard/revision"}
        >
          Documentation
        </MenuText>
        <MenuText
          href="/dashboard/revision"
          className="text-white"
          isActive={pathname === "/dashboard/revision"}
        >
          Supports
        </MenuText>
        <MenuText
          href="/dashboard/revision"
          className="text-white"
          isActive={pathname === "/dashboard/revision"}
        >
          Privacy & Légal
        </MenuText>
      </div>
    </div>
  );
};
