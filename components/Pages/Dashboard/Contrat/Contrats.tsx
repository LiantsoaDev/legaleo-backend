import { Contrat, Project } from "@/utils/types";
import { ContratState } from "./ContratState";

const projects: Project[] = [
  {
    status: "En relecture",
    name: "Projet 1",
    dateCreated: "01/01/2023",
    commentaires: 0,
  },
  {
    status: "Modifications requises",
    name: "Projet 2",
    dateCreated: "02/01/2023",
    commentaires: 1,
  },
  {
    status: "En relecture",
    name: "Projet 3",
    dateCreated: "03/01/2023",
    commentaires: 2,
  },
  {
    status: "Non assigné",
    name: "Projet 4",
    dateCreated: "04/01/2023",
    commentaires: 0,
  },
];

const contrats: Contrat[] = [
  {
    status: "brouillon",
    projects: projects,
  },
  {
    status: "en cours de signature",
    projects: projects,
  },
];
export const Contrats = () => {
  return (
    <div className="flex flex-row gap-5">
      {contrats.map((contrat, index) => (
        <ContratState key={index} contratState={contrat} />
      ))}
    </div>
  );
};
