"use client";
import { SelectWithSearch } from "@/components/Form";
import { useState } from "react";
import { TableUsers } from "./TableUsers";

const contracts = [
  {
    name: "Thomas Morel",
    email: "th.morel@boulangerielune.fr",
    methode_2fa: "Aucune",
    workspace: "2 espace des travail",
  },
  {
    name: "Thomas Morel",
    email: "th.morel@boulangerielune.fr",
    methode_2fa: "Aucune",
    workspace: "2 espace des travail",
  },
  {
    name: "Thomas Morel",
    email: "th.morel@boulangerielune.fr",
    methode_2fa: "Aucune",
    workspace: "2 espace des travail",
  },
];

export const Membres = () => {
  const [selectedContrat, setSelectedContrat] = useState(false);
  return (
    <div className="flex flex-col gap-5">
      <SelectWithSearch />
      <TableUsers
        contrats={contracts}
        selectedContrat={selectedContrat}
        setSelectedContrat={setSelectedContrat}
      />
    </div>
  );
};
