"use client";

import {
  faArchive,
  faClone,
  faDownload,
  faEllipsisVertical,
  faFile,
  faGavel,
  faPen,
  faShare,
  faSignature,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { ProjectAction } from "../MenuText";

interface Contract {
  name: string;
  type: string;
  coContractor: string;
  status: string;
  echeance: string;
  proprietaire: string;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "brouillon":
        return (
          <span className="px-2 py-2 bg-[#9CA3AF] uppercase text-xs text-white font-bold rounded-md">
            {status}
          </span>
        );
      case "relecture interne":
        return (
          <span className="px-2 py-2 bg-[#FACC15] uppercase text-xs text-white font-bold rounded-md">
            {status}
          </span>
        );
      case "relecture avocat":
        return (
          <span className="px-2 py-2 bg-[#C500DB] uppercase text-xs text-white font-bold rounded-md">
            {status}
          </span>
        );
      case "en cours de signature":
        return (
          <span className="px-2 py-2 bg-[#00A5EB] uppercase text-xs text-white font-bold rounded-md">
            {status}
          </span>
        );
      case "Modifications requises":
        return (
          <span className="px-2 py-2 bg-[#A3310F] uppercase text-xs text-white font-bold rounded-md">
            {status}
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
          className="px-4 py-5 whitespace-nowrap"
          onClick={() => setSelectedContrat(contract)}
        >
          {contract.name}
        </td>
        <td className="px-4 py-5 whitespace-nowrap">
          <span className="inline-block rounded bg-gray-200 px-2 py-1 text-xs text-gray-800">
            {contract.type}
          </span>
        </td>
        <td className="px-4 py-5 flex items-center gap-2 ">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-100 text-teal-700 font-semibold">
            {contract.coContractor[0]}
          </div>
          <span>{contract.coContractor}</span>
        </td>
        <td className="px-4 py-5 items-center gap-2 whitespace-nowrap">
          {getStatusColor(contract.status)}
        </td>
        <td className="px-4 py-5 items-center gap-2 ">
          <span>{contract.echeance}</span>
        </td>
        <td className="px-4 py-5 flex items-center gap-2 whitespace-nowrap ">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-100 text-teal-700 font-semibold">
            {contract.proprietaire[0]}
          </div>
          <span>{contract.proprietaire}</span>
        </td>
        <td className="px-4 py-5 items-center gap-2 relative">
          <span onClick={() => setShowActions(!showActions)}>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="cursor-pointer"
            />
          </span>
          {showActions && (
            <div
              className={`flex flex-col gap-3.5 px-3 py-3.5 bg-white w-[200px] shadow-lg rounded-lg absolute right-5 z-10 ${
                position === "bottom" ? "top-full mt-2" : "bottom-full mb-2"
              }`}
              onClick={() => setShowActions(!showActions)}
            >
              <ProjectAction href="#" icon={<FontAwesomeIcon icon={faFile} />}>
                Ouvrir
              </ProjectAction>
              <ProjectAction href="#" icon={<FontAwesomeIcon icon={faPen} />}>
                Editer
              </ProjectAction>
              <ProjectAction href="#" icon={<FontAwesomeIcon icon={faClone} />}>
                Dupliquer
              </ProjectAction>
              <ProjectAction
                href="#"
                icon={<FontAwesomeIcon icon={faDownload} />}
              >
                Télécharger
              </ProjectAction>
              <div className="w-full bg-[#E3E3E3] h-[1px]" />
              <ProjectAction
                href="#"
                icon={
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_611_9147)">
                      <path
                        d="M3.625 17.5C3.2125 17.5 2.85925 17.353 2.56525 17.059C2.27125 16.765 2.1245 16.412 2.125 16V5.5C2.125 5.0875 2.272 4.73425 2.566 4.44025C2.86 4.14625 3.213 3.9995 3.625 4H4.375V3.25C4.375 3.0375 4.447 2.85925 4.591 2.71525C4.735 2.57125 4.913 2.4995 5.125 2.5C5.3375 2.5 5.51575 2.572 5.65975 2.716C5.80375 2.86 5.8755 3.038 5.875 3.25V4H11.875V3.25C11.875 3.0375 11.947 2.85925 12.091 2.71525C12.235 2.57125 12.413 2.4995 12.625 2.5C12.8375 2.5 13.0158 2.572 13.1598 2.716C13.3038 2.86 13.3755 3.038 13.375 3.25V4H14.125C14.5375 4 14.8908 4.147 15.1848 4.441C15.4788 4.735 15.6255 5.088 15.625 5.5V9.25C15.625 9.4625 15.553 9.64075 15.409 9.78475C15.265 9.92875 15.087 10.0005 14.875 10C14.6625 10 14.4843 9.928 14.3403 9.784C14.1963 9.64 14.1245 9.462 14.125 9.25V8.5H3.625V16H8.125C8.3375 16 8.51575 16.072 8.65975 16.216C8.80375 16.36 8.8755 16.538 8.875 16.75C8.875 16.9625 8.803 17.1408 8.659 17.2848C8.515 17.4288 8.337 17.5005 8.125 17.5H3.625ZM14.125 19C13.325 19 12.6093 18.778 11.9778 18.334C11.3463 17.89 10.8933 17.312 10.6188 16.6C10.5563 16.4625 10.572 16.3283 10.666 16.1973C10.76 16.0663 10.8818 16.0005 11.0313 16C11.2063 16 11.3658 16.0533 11.5098 16.1598C11.6538 16.2663 11.7693 16.4005 11.8563 16.5625C12.0813 16.9625 12.3938 17.2813 12.7938 17.5188C13.1938 17.7563 13.6375 17.875 14.125 17.875C14.85 17.875 15.4688 17.6188 15.9813 17.1063C16.4938 16.5938 16.75 15.975 16.75 15.25C16.75 14.525 16.4938 13.9063 15.9813 13.3938C15.4688 12.8813 14.85 12.625 14.125 12.625C13.7625 12.625 13.425 12.6905 13.1125 12.8215C12.8 12.9525 12.525 13.137 12.2875 13.375H12.8125C12.975 13.375 13.1093 13.4283 13.2153 13.5348C13.3213 13.6413 13.3745 13.7755 13.375 13.9375C13.375 14.1 13.3218 14.2343 13.2153 14.3403C13.1088 14.4463 12.9745 14.4995 12.8125 14.5H11.125C10.9125 14.5 10.7343 14.428 10.5903 14.284C10.4463 14.14 10.3745 13.962 10.375 13.75V12.0625C10.375 11.9 10.4283 11.7658 10.5348 11.6598C10.6413 11.5538 10.7755 11.5005 10.9375 11.5C11.1 11.5 11.2343 11.5533 11.3403 11.6598C11.4463 11.7663 11.4995 11.9005 11.5 12.0625V12.5688C11.8375 12.2438 12.2313 11.9843 12.6813 11.7903C13.1313 11.5963 13.6125 11.4995 14.125 11.5C15.1625 11.5 16.047 11.8658 16.7785 12.5973C17.51 13.3288 17.8755 14.213 17.875 15.25C17.875 16.2875 17.5093 17.172 16.7778 17.9035C16.0463 18.635 15.162 19.0005 14.125 19Z"
                        fill="#087F83"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_611_9147">
                        <rect
                          width="15.75"
                          height="16.5"
                          fill="white"
                          transform="translate(2.125 2.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                }
              >
                Renouveller
              </ProjectAction>
              <ProjectAction
                href="#"
                icon={<FontAwesomeIcon icon={faSignature} />}
              >
                Envoyer à signer
              </ProjectAction>
              <ProjectAction href="#" icon={<FontAwesomeIcon icon={faGavel} />}>
                Envoyer à un avocat
              </ProjectAction>
              <ProjectAction href="#" icon={<FontAwesomeIcon icon={faShare} />}>
                Partager
              </ProjectAction>
              <div className="w-full bg-[#E3E3E3] h-[1px]" />
              <ProjectAction href="#" icon={<FontAwesomeIcon icon={faStar} />}>
                Ajouter au favoris
              </ProjectAction>
              <ProjectAction
                href="#"
                icon={<FontAwesomeIcon icon={faArchive} />}
              >
                Archiver
              </ProjectAction>
            </div>
          )}
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
