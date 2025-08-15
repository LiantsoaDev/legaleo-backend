"use client";

import { Title } from "@/components/Typography";
import { formatDate } from "@/utils/functions";
import {
  faArchive,
  faAssistiveListeningSystems,
  faClone,
  faEllipsisVertical,
  faGavel,
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
  status = "Non assigné",
  classname = "",
}: ProjectListCardProps) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Non assigné":
        return (
          <span
            className={`bg-[#E6F2F2] px-2 py-1 text-xs text-[#86A2A3] font-semibold rounded-xs w-fit`}
          >
            {status}
          </span>
        );
      case "Validé avocat":
        return (
          <span
            className={`bg-[#E4FF71] px-2 py-1 text-xs text-[#5A892B] font-semibold rounded-xs w-fit`}
          >
            {status}
          </span>
        );
      case "Modifications requises":
        return (
          <span
            className={`bg-[#FFE1DA] px-2 py-1 text-xs text-[#A3310F] font-semibold rounded-xs w-fit`}
          >
            {status}
          </span>
        );
      case "En relecture":
        return (
          <span
            className={`bg-[#E4E7FF] px-2 py-1 text-xs text-[#545FFF] font-semibold rounded-xs w-fit`}
          >
            {status}
          </span>
        );
    }
  };

  return (
    <div className={`relative ${classname}`}>
      <div className="border border-gray rounded-xl flex flex-col gap-0 p-4 w-full bg-white shadow-lg">
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
          <div className="flex flex-row items-center gap-1 text-[#828282] text-xs">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6666 2.12915V4.79582M5.33329 2.12915V4.79582M2.66663 7.46248H13.3333M2.66663 4.79582C2.66663 4.44219 2.8071 4.10306 3.05715 3.85301C3.3072 3.60296 3.64634 3.46248 3.99996 3.46248H12C12.3536 3.46248 12.6927 3.60296 12.9428 3.85301C13.1928 4.10306 13.3333 4.44219 13.3333 4.79582V12.7958C13.3333 13.1494 13.1928 13.4886 12.9428 13.7386C12.6927 13.9887 12.3536 14.1291 12 14.1291H3.99996C3.64634 14.1291 3.3072 13.9887 3.05715 13.7386C2.8071 13.4886 2.66663 13.1494 2.66663 12.7958V4.79582ZM5.33329 10.1292H6.66663V11.4625H5.33329V10.1292Z"
                stroke="#828282"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>Crée le </span>
            {date && <span>{formatDate(date)}</span>}
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#E3E3E3]" />
        <div className="pt-3 flex flex-row items-center text-xs text-[#828282] justify-between">
          <div
            className={`${
              commentaire > 0 ? "bg-[#087F83]" : "bg-[#828282]"
            } py-1 px-1.5 flex flex-row items-center gap-1 rounded-full w-fit text-white font-normal cursor-pointer`}
          >
            <span>{commentaire}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4.5H6"
                stroke="white"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.5 3C1.5 2.17157 2.17157 1.5 3 1.5H9C9.82843 1.5 10.5 2.17157 10.5 3V10.2496C10.5 10.3405 10.4507 10.4242 10.3712 10.4683C10.2917 10.5123 10.1946 10.5098 10.1175 10.4616L8.57895 9.5H3C2.17157 9.5 1.5 8.82843 1.5 8V3Z"
                stroke="white"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 4.5H7.5"
                stroke="white"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 6.5H6"
                stroke="white"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 6.5H4.5"
                stroke="white"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
