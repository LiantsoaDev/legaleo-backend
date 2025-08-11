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
    name: "Contrat de franchise ACME",
    type: "Contrat de franchise",
    coContractor: "ACME",
    status: "en cours de signature",
    echeance: "12/12/26",
    proprietaire: "John Doe",
  },
  {
    name: "Contrat de franchise ACME",
    type: "Licence de marque",
    coContractor: "ACME",
    status: "relecture avocat",
    echeance: "12/12/26",
    proprietaire: "John Doe",
  },
  {
    name: "Contrat de franchise ACME",
    type: "DIP",
    coContractor: "ACME",
    status: "brouillon",
    echeance: "12/12/26",
    proprietaire: "John Doe",
  },
  {
    name: "Contrat de franchise ACME",
    type: "Convention d’enseigne",
    coContractor: "ACME",
    status: "relecture interne",
    echeance: "12/12/26",
    proprietaire: "John Doe",
  },
  {
    name: "Contrat de franchise ACME",
    type: "Pacte d’associés",
    coContractor: "ACME",
    status: "en cours de signature",
    echeance: "12/12/26",
    proprietaire: "John Doe",
  },
  {
    name: "Contrat de franchise ACME",
    type: "Contrat de franchise",
    coContractor: "ACME",
    status: "Modifications requises",
    echeance: "12/12/26",
    proprietaire: "John Doe",
  },
  {
    name: "Contrat de franchise ACME",
    type: "Contrat de franchise",
    coContractor: "ACME",
    status: "en cours de signature",
    echeance: "12/12/26",
    proprietaire: "John Doe",
  },
  {
    name: "Contrat de franchise ACME",
    type: "Lettre de résiliation",
    coContractor: "ACME",
    status: "relecture avocat",
    echeance: "12/12/26",
    proprietaire: "John Doe",
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
        <div className="flex bg-[#087F83] px-4 py-2 text-white text-xs gap-2.5 w-fit shadow-lg rounded-sm font-semibold select-none">
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
            <th className="px-4 py-3">Type de contrat</th>
            <th className="px-4 py-3">Cocontractant</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Échéance</th>
            <th className="px-4 py-3">Propriétaire</th>
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
