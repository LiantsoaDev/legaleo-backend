"use client";

import { ContractUsers } from "@/utils/types";
import { useEffect, useRef, useState } from "react";

interface ContractRowProps {
  contract: ContractUsers;
  index: number;
  isSelected: boolean;
  onToggleSelect: () => void;
  setSelectedContrat: React.Dispatch<React.SetStateAction<any>>;
}

export const TableUsersRow = ({
  contract,
  index,
  isSelected,
  onToggleSelect,
  setSelectedContrat,
}: ContractRowProps) => {
  const [showActions, setShowActions] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom">("bottom");
  const tdRef = useRef<HTMLTableRowElement>(null);

  const getStatusColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "en attente":
        return (
          <span className="px-2 py-2 bg-[#FACC151A] text-xs text-[#D3AA05] font-bold rounded-md">
            {role}
          </span>
        );
      case "acceptée":
        return (
          <span className="px-2 py-2 bg-[#5A892B1A] text-xs text-[#19BC57] font-bold rounded-md">
            {role}
          </span>
        );
      case "expirée":
        return (
          <span className="px-2 py-2 bg-[#F2F2F2] text-xs text-[#828282] font-bold rounded-md">
            {role}
          </span>
        );
      case "refusée":
        return (
          <span className="px-2 py-2 bg-[#A3310F1A] text-xs text-[#A3310F] font-bold rounded-md">
            {role}
          </span>
        );
    }
  };

  useEffect(() => {
    if (showActions && tdRef.current) {
      const rect = tdRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      // Si pas assez de place en dessous -> afficher en haut
      if (spaceBelow < 350 && spaceAbove > spaceBelow) {
        setPosition("top");
      } else {
        setPosition("bottom");
      }
    }
  }, [showActions]);

  return (
    <>
      <tr
        key={index}
        className="border-b border-gray hover:bg-gray z-10 cursor-pointer"
        ref={tdRef}
      >
        <td className="px-4 py-5 cursor-pointer">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
          />
        </td>
        <td
          className="flex items-center gap-5 px-4 py-5 whitespace-nowrap"
          onClick={() => setSelectedContrat(contract)}
        >
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-100 text-teal-700 font-semibold">
            {contract.name[0]}
          </div>
          <span>{contract.name}</span>
        </td>
        <td className="px-4 py-5 whitespace-nowrap">
          <span className="inline-block rounded px-2 py-1 text-xs font-semibold">
            {contract.email}
          </span>
        </td>
        {contract.role && (
          <td className="px-4 py-5 whitespace-nowrap">
            <span className="inline-block rounded px-2 py-1 text-xs font-semibold">
              {contract.role}
            </span>
          </td>
        )}

        {contract.documentAssocier && (
          <td className="px-4 py-5 whitespace-nowrap">
            <span className="inline-block rounded px-2 py-1 text-xs font-semibold">
              {contract.documentAssocier}
            </span>
          </td>
        )}

        {contract.status && (
          <td className="px-4 py-5 whitespace-nowrap">
            {getStatusColor(contract.status)}
          </td>
        )}

        {contract.date_invitation && (
          <td className="px-4 py-5 whitespace-nowrap">
            <span className="inline-block rounded px-2 py-1 text-xs font-semibold">
              {contract.date_invitation}
            </span>
          </td>
        )}

        {contract.workspace && contract.methode_2fa && (
          <>
            <td className="px-4 py-5 items-center gap-2 whitespace-nowrap">
              {contract.workspace}
            </td>
            <td className="px-4 py-5 flex items-center gap-2 whitespace-nowrap ">
              {contract.methode_2fa}
            </td>
          </>
        )}
      </tr>
    </>
  );
};
