"use client";

import { Title } from "@/components/Typography";
import { formatDate } from "@/utils/functions";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ProjectListViewProps {
  nom: string;
  date?: string;
  commentaire?: number;
  classname?: string;
  status?:
    | "Non assigné"
    | "Validé avocat"
    | "Modifications requises"
    | "En relecture";
}

export const ProjectListView = ({
  nom,
  date,
  commentaire = 0,
  status = "Non assigné",
  classname = "",
}: ProjectListViewProps) => {
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
    <div className="flex flex-row justify-between p-4 bg-white rounded-xl shadow-md w-full">
      <Title level={3} className="text-base font-medium text-black">
        {nom}
      </Title>
      {getStatusColor(status)}
      <div className="flex flex-row items-center gap-2 text-[#828282] text-xs">
        <FontAwesomeIcon icon={faCalendar} />
        <span>Crée le </span>
        {date && <span>{formatDate(date)}</span>}
      </div>
      <div
        className={`${
          commentaire > 0 ? "bg-[#087F83]" : "bg-[#828282]"
        } py-1 px-1.5 flex flex-row items-center gap-1 rounded-full w-fit text-white font-normal cursor-pointer`}
      >
        <span>{commentaire}</span>
        <svg
          width="12"
          height="12"
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
    </div>
  );
};
