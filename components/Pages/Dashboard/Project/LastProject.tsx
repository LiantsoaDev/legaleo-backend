import { Title } from "@/components/Typography";
import { ProjectListCard } from "./ProjectListCard";

interface LastProjectProps {
  title?: string;
}

export const LastProject = ({ title }: LastProjectProps) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <Title className="font-bold text-xl" level={2}>
        {title ?? "Mes derniers projets"}
      </Title>
      <div className="flex flex-row justify-between flex-wrap gap-5 w-full">
        <ProjectListCard
          key={1}
          nom="Projet 1"
          date="01/01/2023"
          commentaire={0}
          status="Validé avocat"
          classname="w-[48%]"
        />
        <ProjectListCard
          nom="Projet 2"
          date="02/01/2023"
          commentaire={1}
          status="Modifications requises"
          key={2}
          classname="w-[48%]"
        />
        <ProjectListCard
          nom="Projet 3"
          date="02/01/2023"
          commentaire={2}
          status="En relecture"
          key={3}
          classname="w-[48%]"
        />
        <ProjectListCard
          nom="Projet 4"
          date="02/01/2023"
          commentaire={0}
          status="Non assigné"
          key={4}
          classname="w-[48%]"
        />
      </div>
    </div>
  );
};
