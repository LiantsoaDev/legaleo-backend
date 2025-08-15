"use client";
import {
  faDownload,
  faStar,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons/faFolder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { TableRow } from "./TableRow";

const contracts = [
  {
    name: "Boulangerie Lune - Lyon",
    form_juridique: "SARL",
    nom_representant: "Thomas Morel",
    email: "th.morel@boulangerielune.fr",
    telephone: "+33 7 62 14 85 90",
  },
  {
    name: "Boulangerie Lune - Lyon",
    form_juridique: "SARL",
    nom_representant: "Thomas Morel",
    email: "th.morel@boulangerielune.fr",
    telephone: "+33 7 62 14 85 90",
  },
  {
    name: "Boulangerie Lune - Lyon",
    form_juridique: "SARL",
    nom_representant: "Thomas Morel",
    email: "th.morel@boulangerielune.fr",
    telephone: "+33 7 62 14 85 90",
  },
  {
    name: "Boulangerie Lune - Lyon",
    form_juridique: "SARL",
    nom_representant: "Thomas Morel",
    email: "th.morel@boulangerielune.fr",
    telephone: "+33 7 62 14 85 90",
  },
  {
    name: "Boulangerie Lune - Lyon",
    form_juridique: "SARL",
    nom_representant: "Thomas Morel",
    email: "th.morel@boulangerielune.fr",
    telephone: "+33 7 62 14 85 90",
  },
  {
    name: "Boulangerie Lune - Lyon",
    form_juridique: "SARL",
    nom_representant: "Thomas Morel",
    email: "th.morel@boulangerielune.fr",
    telephone: "+33 7 62 14 85 90",
  },
];

interface TablesProps {
  setSelectedContrat: React.Dispatch<React.SetStateAction<any>>;
  selectedContrat: boolean;
}

export const Tables = ({
  selectedContrat,
  setSelectedContrat,
}: TablesProps) => {
  // Remplacer hasSelected par un tableau d'IDs sélectionnés
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  // Calculer le nombre de contrats sélectionnés
  const selectedCount = selectedIds.length;

  const isAllSelected = selectedIds.length === contracts.length;

  // Fonction pour mettre à jour les sélections
  const toggleSelection = (index: number) => {
    setSelectedIds((prev) =>
      prev.includes(index)
        ? prev.filter((id) => id !== index)
        : [...prev, index]
    );
  };

  // Fonction pour toggle TOUTES les sélections
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(contracts.map((_, index) => index));
    }
  };

  return (
    <div className="overflow-x-auto z-10">
      {selectedCount > 0 && (
        <div className="flex bg-[#087F83] px-4 py-2 text-white text-xs gap-2.5 w-fit shadow-lg rounded-sm font-semibold select-none mb-5">
          <span>{selectedCount} contrats selectionnés</span>
          <span className="flex flex-row gap-1 items-center cursor-pointer">
            <FontAwesomeIcon icon={faDownload} />
            Télécharger
          </span>
          <span className="flex flex-row gap-1 items-center cursor-pointer">
            <FontAwesomeIcon icon={faFolder} />
            Déplacer
          </span>
          <span className="flex flex-row gap-1 items-center cursor-pointer">
            <FontAwesomeIcon icon={faStar} />
            Favoris
          </span>
          <span className="flex flex-row gap-1 items-center cursor-pointer">
            <FontAwesomeIcon icon={faTrashAlt} />
            Corbeille
          </span>
        </div>
      )}
      <table className="min-w-full text-sm text-left text-gray-700 caption-bottom w-full">
        <thead className=" text-[#86A2A3] text-sm font-semibold">
          <tr>
            <th className="px-4 py-3">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={toggleSelectAll}
              />
            </th>
            <th className="px-4 py-3">Nom</th>
            <th className="px-4 py-3">Forme Juridique</th>
            <th className="px-4 py-3">Nom du representant</th>
            <th className="px-4 py-3">Email de contact</th>
            <th className="px-4 py-3">Téléphone</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract, index) => (
            <TableRow
              contract={contract}
              index={index}
              key={index}
              isSelected={selectedIds.includes(index)}
              onToggleSelect={() => toggleSelection(index)}
              setSelectedContrat={setSelectedContrat}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
