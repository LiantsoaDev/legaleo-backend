import { Contrat } from "@/utils/types";
import { ProjectListCard } from "../Project/ProjectListCard";

interface ContratStateProps {
  key: number;
  contratState: Contrat;
}

export const ContratState = ({ contratState }: ContratStateProps) => {
  return (
    <div className="w-80 rounded-xl flex flex-col gap-4 px-3.5 py-5 bg-[#9CA3AF0D]">
      <div className="flex flex-row w-full justify-between items-center">
        <p className="px-2.5 py-2.5 bg-[#9CA3AF] uppercase text-base text-white font-bold rounded-md">
          {contratState.status}
        </p>
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
