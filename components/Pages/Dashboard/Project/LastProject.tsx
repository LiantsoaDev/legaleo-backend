import { Title } from "@/components/Typography";
import { ProjectListCard } from "./ProjectListCard";

export const LastProject = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <Title className="font-bold text-2xl" level={2}>
        Mes derniers projets
      </Title>
      <div className="flex flex-row justify-between flex-wrap gap-5 w-full">
        <ProjectListCard
          nom="Projet 1"
          date="01/01/2023"
          commentaire="0"
          statut="Validé avocat"
        />
        <ProjectListCard
          nom="Projet 2"
          date="02/01/2023"
          commentaire="1"
          statut="Modifications requises"
        />
        <ProjectListCard
          nom="Projet 3"
          date="02/01/2023"
          commentaire="2"
          statut="En relecture"
        />
        <ProjectListCard
          nom="Projet 4"
          date="02/01/2023"
          commentaire="0"
          statut="Non assigné"
        />
      </div>
    </div>
  );
};
