import { Contrat } from "@/utils/types";
import { ProjectListCard } from "../Project/ProjectListCard";

interface ContratStateProps {
  key: number;
  contratState: Contrat;
}

export const ContratState = ({ contratState }: ContratStateProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "brouillon":
        return (
          <p className="px-2.5 py-1.5 bg-[#9CA3AF] uppercase text-sm text-white font-bold rounded-md">
            {status}
          </p>
        );
      case "relecture interne":
        return (
          <p className="px-2.5 py-1.5 bg-[#FACC15] uppercase text-sm text-white font-bold rounded-md">
            {status}
          </p>
        );
      case "relecture avocat":
        return (
          <p className="px-2.5 py-1.5 bg-[#C500DB] uppercase text-sm text-white font-bold rounded-md">
            {status}
          </p>
        );
      case "en cours de signature":
        return (
          <p className="px-2.5 py-1.5 bg-[#00A5EB] uppercase text-sm text-white font-bold rounded-md">
            {status}
          </p>
        );
      case "Modifications requises":
        return (
          <p className="px-2.5 py-1.5 bg-[#A3310F] uppercase text-sm text-white font-bold rounded-md">
            {status}
          </p>
        );
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "brouillon":
        return "bg-[#9CA3AF0D]";
      case "relecture interne":
        return "bg-[#FACC150D]";
      case "relecture avocat":
        return "bg-[#C500DB0D]";
      case "en cours de signature":
        return "bg-[#00A5EB0D]";
      case "Modifications requises":
        return "bg-[#A3310F0D]";
    }
  };

  return (
    <div
      className={`min-w-[350px] rounded-xl flex flex-col gap-4 px-3.5 py-5 ${getStatusBgColor(
        contratState.status
      )}`}
    >
      <div className="flex flex-row w-full justify-between items-center">
        {getStatusColor(contratState.status)}
        <span className="px-2.5 py-1 rounded-full border border-[#C5C5C5] text-xs font-regular">
          {contratState.projects.length}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {contratState.projects.map((project, index) => (
          <ProjectListCard
            key={index}
            nom={project.name}
            date={project.dateCreated}
            commentaire={project.commentaires || 0}
            status={project.status}
          />
        ))}
      </div>
    </div>
  );
};
