"use client";

import { Title } from "@/components/Typography";
import {
  faArchive,
  faAssistiveListeningSystems,
  faCalendar,
  faClone,
  faEllipsisVertical,
  faGavel,
  faMessage,
  faPen,
  faReplyAll,
  faShare,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { ProjectAction } from "../MenuText";

interface ProjectListCardProps {
  nom: string;
  date?: string;
  commentaire: number;
  key: number;
  classname?: string;
  status?:
    | "Non assigné"
    | "Validé avocat"
    | "Modifications requises"
    | "En relecture";
}

export const ProjectListCard = ({
  nom,
  date,
  commentaire,
  key,
  status = "Non assigné",
  classname = "",
}: ProjectListCardProps) => {
  const [showActions, setShowActions] = useState(false);

  const formatDate = (inputDate?: string) => {
    if (!inputDate) return "";

    const d = new Date(inputDate);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Janvier = 0

    return `${day}/${month}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Non assigné":
        return (
          <span
            className={`bg-[#E6F2F2] px-2 py-1 text-xs text-[#86A2A3] font-semibold rounded-md w-fit`}
          >
            {status}
          </span>
        );
      case "Validé avocat":
        return (
          <span
            className={`bg-[#E4FF71] px-2 py-1 text-xs text-[#5A892B] font-semibold rounded-md w-fit`}
          >
            {status}
          </span>
        );
      case "Modifications requises":
        return (
          <span
            className={`bg-[#FFE1DA] px-2 py-1 text-xs text-[#A3310F] font-semibold rounded-md w-fit`}
          >
            {status}
          </span>
        );
      case "En relecture":
        return (
          <span
            className={`bg-[#E4E7FF] px-2 py-1 text-xs text-[#545FFF] font-semibold rounded-md w-fit`}
          >
            {status}
          </span>
        );
    }
  };

  return (
    <div className={`relative ${classname}`}>
      <div
        key={key}
        className="border border-gray rounded-xl flex flex-col gap-0 p-4 w-full bg-white shadow-lg"
      >
        <div className="flex flex-col gap-3 pb-3">
          {getStatusColor(status)}
          <span className="font-semibold text-xs text-[#828282]">
            Co contractant
          </span>
          <Link href={"#"}>
            <Title level={3} className="text-base font-medium text-black">
              {nom}
            </Title>
          </Link>
          <div className="flex flex-row items-center gap-2 text-[#828282] text-xs">
            <FontAwesomeIcon icon={faCalendar} />
            <span>Crée le </span>
            {date && <span>{formatDate(date)}</span>}
          </div>
        </div>
        <div className="w-full h-0.5 bg-[#E3E3E3]" />
        <div className="px-3 py-3 flex flex-row items-center text-xs text-[#828282] justify-between">
          <div
            className={`${
              commentaire > 0 ? "bg-[#087F83]" : "bg-[#828282]"
            } py-1 px-1.5 flex flex-row items-center gap-1 rounded-full w-fit text-white font-normal cursor-pointer`}
          >
            <span>{commentaire}</span>
            <FontAwesomeIcon icon={faMessage} />
          </div>
          <div
            className="flex flex-row items-center gap-1 rounded-full w-1/2 justify-end text-[#828282] font-normal text-xl"
            onClick={() => setShowActions(!showActions)}
          >
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      {showActions && (
        <div
          className="flex flex-col gap-3.5 px-3 py-3.5 bg-white shadow-lg rounded-lg w-[80%] absolute bottom-0 left-1/2 translate-x-[-50%] z-10"
          onClick={() => setShowActions(!showActions)}
        >
          <ProjectAction href="#" icon={<FontAwesomeIcon icon={faPen} />}>
            Éditer
          </ProjectAction>
          <ProjectAction
            href="#"
            icon={<FontAwesomeIcon icon={faAssistiveListeningSystems} />}
          >
            Suivi IA
          </ProjectAction>
          <ProjectAction href="#" icon={<FontAwesomeIcon icon={faClone} />}>
            Dupliquer
          </ProjectAction>
          <ProjectAction
            disabled
            href="#"
            icon={<FontAwesomeIcon icon={faReplyAll} />}
          >
            Relancer
          </ProjectAction>
          <div className="w-full bg-[#E3E3E3] h-[1px]" />
          <ProjectAction href="#" icon={<FontAwesomeIcon icon={faSignature} />}>
            Envoyer à signer
          </ProjectAction>
          <ProjectAction href="#" icon={<FontAwesomeIcon icon={faGavel} />}>
            Envoyer à un avocat
          </ProjectAction>
          <ProjectAction href="#" icon={<FontAwesomeIcon icon={faShare} />}>
            Partager
          </ProjectAction>
          <div className="w-full bg-[#E3E3E3] h-[1px]" />
          <ProjectAction href="#" icon={<FontAwesomeIcon icon={faArchive} />}>
            Archiver
          </ProjectAction>
        </div>
      )}
    </div>
  );
};
