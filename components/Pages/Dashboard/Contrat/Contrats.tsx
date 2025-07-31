"use client";
import { Contrat, Project } from "@/utils/types";
import { ContratState } from "./ContratState";
import { ContratStateListView } from "./ContratStateListView";

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
];

const contrats: Contrat[] = [
  {
    status: "brouillon",
    projects: projects,
  },
  {
    status: "relecture interne",
    projects: projects,
  },
  {
    status: "relecture avocat",
    projects: projects,
  },
  {
    status: "en cours de signature",
    projects: projects,
  },
  {
    status: "Modifications requises",
    projects: projects,
  },
];

interface ContratsProps {
  showListView: boolean;
  setShowListView: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Contrats = ({ setShowListView, showListView }: ContratsProps) => {
  return (
    <div
      className={`flex ${
        showListView ? "flex-col w-full" : "flex-row"
      } gap-5 overflow-x-auto mt-7`}
    >
      {contrats.map((contrat, index) =>
        showListView ? (
          <div key={index}>
            <ContratStateListView />
          </div>
        ) : (
          <ContratState key={index} contratState={contrat} />
        )
      )}
    </div>
  );
};
