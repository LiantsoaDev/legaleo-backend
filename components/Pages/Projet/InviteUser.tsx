"use client";
import pdp from "@/assets/images/pdp.png";
import { Button } from "@/components/Button";
import { Title } from "@/components/Typography";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";

interface InviteUserProps {
  currentRole: "proprietaire" | "editeur" | "lecteur";
}

export const InviteUser = ({ currentRole }: InviteUserProps) => {
  const [currentValue, setCurrentValue] = useState<
    "proprietaire" | "editeur" | "lecteur"
  >(currentRole);
  const [showEditRole, setShowEditRole] = useState(false);

  useEffect(() => {}, [currentRole]);

  const handleChangeValue = (value: "proprietaire" | "editeur" | "lecteur") => {
    setCurrentValue(value);
    setShowEditRole(false);
  };
  return (
    <>
      <div
        className="flex flex-row justify-between items-center z-10"
        onClick={(e) => {
          e.stopPropagation();
          setShowEditRole(true);
        }}
      >
        <div className="flex flex-row items-center gap-2">
          <Image src={pdp} alt="Photo de profil" width={30} height={30} />
          <div className="flex flex-col gap-1">
            <Title className="font-medium text-black text-sm">
              Lorem ipsum
            </Title>
            <span className="text-[#828282] font-medium text-xs">
              th.morel@boulangerielune.fr
            </span>
          </div>
        </div>
        <div
          className="flex flex-row justify-between text-[#828282] font-medium text-xs gap-1.5 w-fit px-1 py-2 capitalize cursor-pointer"
          onClick={() => setShowEditRole(true)}
        >
          <span>{currentValue}</span>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
      {showEditRole && (
        <div className="w-48 bg-[#1F120E] rounded-md p-2.5 flex flex-col gap-2.5 absolute top-1/2 right-[-200px] translate-y-[-50%]">
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleChangeValue("proprietaire");
            }}
            className={`px-7 py-2.5 font-semibold text-sm flex flex-row items-center gap-2.5 capitalize cursor-pointer ${
              currentValue === "proprietaire"
                ? "bg-[#62E7EB] text-black rounded-md"
                : "text-white"
            }`}
          >
            {currentValue === "proprietaire" && (
              <FontAwesomeIcon icon={faCheck} />
            )}
            proprietaire
          </span>
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleChangeValue("editeur");
            }}
            className={`px-7 py-2.5 font-semibold text-sm flex flex-row items-center gap-2.5 capitalize cursor-pointer ${
              currentValue === "editeur"
                ? "bg-[#62E7EB] text-black rounded-md"
                : "text-white"
            }`}
          >
            {currentValue === "editeur" && <FontAwesomeIcon icon={faCheck} />}
            editeur
          </span>
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleChangeValue("lecteur");
            }}
            className={`px-7 py-2.5 font-semibold text-sm flex flex-row items-center gap-2.5 capitalize cursor-pointer ${
              currentValue === "lecteur"
                ? "bg-[#62E7EB] text-black rounded-md"
                : "text-white"
            }`}
          >
            {currentValue === "lecteur" && <FontAwesomeIcon icon={faCheck} />}
            lecteur
          </span>
          <div className="bg-white w-full h-[1px]"></div>
          <div
            className="flex flex-row gap-2.5 items-center cursor-pointer py-2.5 text-white font-semibold text-sm px-2.5 hover:bg-danger rounded-sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowEditRole(false);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
            <span>Retirer</span>
          </div>
        </div>
      )}
    </>
  );
};
