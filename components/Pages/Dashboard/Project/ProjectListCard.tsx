"use client";

import { Title } from "@/components/Typography";
import { faCalendar, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface ProjectListCardProps {
  nom: string;
  date?: string;
  commentaire?: number | string;
  statut?:
    | "Non assigné"
    | "Validé avocat"
    | "Modifications requises"
    | "En relecture";
}

export const ProjectListCard = ({
  nom,
  date,
  commentaire,
  statut = "Non assigné",
}: ProjectListCardProps) => {
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
            {statut}
          </span>
        );
      case "Validé avocat":
        return (
          <span
            className={`bg-[#E4FF71] px-2 py-1 text-xs text-[#5A892B] font-semibold rounded-md w-fit`}
          >
            {statut}
          </span>
        );
      case "Modifications requises":
        return (
          <span
            className={`bg-[#FFE1DA] px-2 py-1 text-xs text-[#A3310F] font-semibold rounded-md w-fit`}
          >
            {statut}
          </span>
        );
      case "En relecture":
        return (
          <span
            className={`bg-[#E4E7FF] px-2 py-1 text-xs text-[#545FFF] font-semibold rounded-md w-fit`}
          >
            {statut}
          </span>
        );
    }
  };

  return (
    <Link
      href="#"
      className="border border-gray rounded-xl flex flex-col gap-0 p-4 w-[48%]"
    >
      <div className="flex flex-col gap-3 pb-3">
        {getStatusColor(statut)}
        <Title level={3} className="text-base font-medium text-black">
          {nom}
        </Title>
      </div>
      <div className="w-full h-0.5 bg-[#E3E3E3]" />
      <div className="px-3 py-3 flex flex-row items-center text-xs text-[#828282] justify-between">
        <div className="flex flex-row items-center gap-2">
          <FontAwesomeIcon icon={faCalendar} />
          {date && <span>{formatDate(date)}</span>}
        </div>
        <div className="bg-[#828282] py-1 px-1.5 flex flex-row items-center gap-1 rounded-full w-fit text-white font-normal">
          <span>{commentaire}</span>
          <FontAwesomeIcon icon={faMessage} />
        </div>
      </div>
    </Link>
  );
};
