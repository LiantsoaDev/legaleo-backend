import pdp from "@/assets/images/pdp.png";
import { Paragraphe, Title } from "@/components/Typography";
import {
  faChevronDown,
  faChevronUp,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

export const Synthese = () => {
  const [showInfoG, setShowInfoG] = useState(false);
  const [showElemCles, setShowElemCles] = useState(false);
  return (
    <div className="flex flex-col gap-0">
      <Title
        className="font-bold text-base text-black p-5 border-b border-gray"
        level={3}
      >
        Synthèse
      </Title>
      <div className="p-5 border-b border-gray flex flex-col gap-2.5">
        <Title className="font-semibold text-base text-black">
          Contrat de franchise ACME{" "}
        </Title>
        <Paragraphe className="text-[#828282] font-medium text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut dolore...{" "}
        </Paragraphe>
      </div>
      <div className="flex flex-col gap-5 border-b border-gray px-5 py-5">
        <div
          className="flex flex-row justify-between items-center cursor-pointer"
          onClick={() => setShowInfoG(!showInfoG)}
        >
          <Title className="font-semibold text-sm text-black">
            Informations générales
          </Title>
          {showInfoG ? (
            <FontAwesomeIcon icon={faChevronUp} className="text-sm" />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
          )}
        </div>
        {showInfoG && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-[#86A2A3]">
                Date de création
              </span>
              <span className="font-medium text-sm text-black">01/10/2025</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-[#86A2A3]">
                Date d’échéance
              </span>
              <span className="font-medium text-sm text-black">01/10/2027</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-[#86A2A3]">
                Propriétaire
              </span>
              <span className="font-medium text-sm text-black flex gap-2.5 items-center">
                <Image src={pdp} alt="photo de profil" width={24} height={24} />
                Lorem ipsum
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-[#86A2A3]">
                Modèle
              </span>
              <span className="font-medium text-sm text-black flex gap-2.5 items-center">
                <span className="text-xs font-semibold text-[#828282] bg-[#F2F2F2] px-2 py-1">
                  Contrat de franchise
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                >
                  <path
                    d="M5 2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V9C2 9.26522 2.10536 9.51957 2.29289 9.70711C2.48043 9.89464 2.73478 10 3 10H9C9.26522 10 9.51957 9.89464 9.70711 9.70711C9.89464 9.51957 10 9.26522 10 9V7M6 6L10 2M10 2V4.5M10 2H7.5"
                    stroke="#C5C5C5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-[#86A2A3]">
                Dossier
              </span>
              <span className="font-medium text-sm text-black flex gap-2.5 items-center">
                <FontAwesomeIcon
                  icon={faFolder}
                  className="text-lg text-[#828282]"
                />
                <span className="text-xs font-semibold text-[#86A2A3]">RH</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                >
                  <path
                    d="M5 2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V9C2 9.26522 2.10536 9.51957 2.29289 9.70711C2.48043 9.89464 2.73478 10 3 10H9C9.26522 10 9.51957 9.89464 9.70711 9.70711C9.89464 9.51957 10 9.26522 10 9V7M6 6L10 2M10 2V4.5M10 2H7.5"
                    stroke="#C5C5C5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-5 border-b border-gray px-5 py-5">
        <div
          className="flex flex-row justify-between items-center cursor-pointer"
          onClick={() => setShowElemCles(!showElemCles)}
        >
          <Title className="font-semibold text-sm text-black">
            Éléments clés du contrat
          </Title>
          {showElemCles ? (
            <FontAwesomeIcon icon={faChevronUp} className="text-sm" />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
          )}
        </div>
        {showElemCles && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-[#86A2A3]">
                Date d’envoi pour signature
              </span>
              <span className="font-medium text-sm text-black">01/10/2025</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-[#86A2A3]">
                Date de début du contrat
              </span>
              <span className="font-medium text-sm text-black">01/10/2027</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-[#86A2A3]">
                Renouvellement
              </span>
              <span className="font-medium text-sm text-black">
                Indéterminée
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-[#86A2A3]">
                Date d’échéance
              </span>
              <span className="font-medium text-sm text-black">01/10/2027</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-[#86A2A3]">
                Durée
              </span>
              <span className="font-medium text-sm text-black">Tacite</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
