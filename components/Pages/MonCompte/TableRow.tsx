"use client";

import { useEffect, useRef, useState } from "react";

interface Contract {
  name: string;
  email: string;
  role: string;
  workspace: string;
}

interface ContractRowProps {
  contract: Contract;
  index: number;
  isSelected: boolean;
  onToggleSelect: () => void;
  setSelectedContrat: React.Dispatch<React.SetStateAction<any>>;
}

export const TableRow = ({
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
    switch (role) {
      case "Administrateur":
        return (
          <span className="px-2 py-2 bg-[#087F83] text-xs text-white font-bold rounded-md">
            {role}
          </span>
        );
      case "Contributeurs":
        return (
          <span className="px-2 py-2 bg-[#86A2A3] text-xs text-white font-bold rounded-md">
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
        <td className="px-4 py-5 items-center gap-2 whitespace-nowrap">
          {contract.workspace}
        </td>
        <td className="px-4 py-5 flex items-center gap-2 whitespace-nowrap ">
          {getStatusColor(contract.role)}
        </td>
        {/* <td colSpan={5}>
          <div className="w-[500px] fixed top-0 bottom-0">
            Contenu détaillé ici
          </div>
        </td> */}
      </tr>
    </>
  );
};
