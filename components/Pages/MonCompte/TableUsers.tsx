"use client";
import { ContractUsers } from "@/utils/types";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { TableUsersRow } from "./TableUsersRow";

interface TablesProps {
  setSelectedContrat: React.Dispatch<React.SetStateAction<any>>;
  selectedContrat: boolean;
  contrats: ContractUsers[];
  isMembers?: boolean;
}

export const TableUsers = ({
  selectedContrat,
  setSelectedContrat,
  contrats,
  isMembers = true,
}: TablesProps) => {
  // Remplacer hasSelected par un tableau d'IDs sélectionnés
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  // Calculer le nombre de contrats sélectionnés
  const selectedCount = selectedIds.length;

  const isAllSelected = selectedIds.length === contrats.length;

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
      setSelectedIds(contrats.map((_, index) => index));
    }
  };

  return (
    <div className="overflow-x-auto z-10">
      {selectedCount > 0 && (
        <div className="flex bg-[#087F83] px-4 py-2 text-white text-xs gap-2.5 w-fit shadow-lg rounded-sm font-semibold select-none mb-5">
          <span>{selectedCount} utilisateur selectionnés</span>
          <span className="flex flex-row gap-1 items-center cursor-pointer">
            <FontAwesomeIcon icon={faTrash} />
            Retirer l’utilisateurs
          </span>
        </div>
      )}
      <div className="w-4/5 px-5 py-4 border border-[#E3E3E3] rounded-xl shadow-lg">
        <table className="min-w-full text-sm text-left text-gray-700 caption-bottom">
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
              <th className="px-4 py-3">Email</th>
              {!isMembers && (
                <>
                  <th className="px-4 py-3">Rôle</th>
                  <th className="px-4 py-3">Document associé</th>
                  <th className="px-4 py-3">status</th>
                  <th className="px-4 py-3">Date d'invitation</th>
                </>
              )}
              {isMembers && (
                <>
                  <th className="px-4 py-3">Workspace</th>
                  <th className="px-4 py-3">Méthode 2FA</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {contrats.map((contract, index) => (
              <TableUsersRow
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
    </div>
  );
};
