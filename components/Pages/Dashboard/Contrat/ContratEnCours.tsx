"use client";
import { Filter, SearchBar } from "@/components/Form";
import { Title } from "@/components/Typography";
import { Contrat, Project } from "@/utils/types";
import { useState } from "react";
import { Contrats } from "./Contrats";

{
  /* <ProjectListCard
          nom="Projet 4"
          date="02/01/2023"
          commentaire={0}
          status="Non assigné"
        /> */
}

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

export const ContratEnCours = () => {
  const [showListView, setShowListView] = useState(false);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3.5 mb-6">
        <Title className="font-semibold text-2xl">Contrat en cours</Title>
        <SearchBar classname="border-gray border !shadow-none !w-1/2" />
      </div>
      <Filter setShowListView={setShowListView} showListView={showListView} />
      <Contrats setShowListView={setShowListView} showListView={showListView} />
    </div>
  );
};
