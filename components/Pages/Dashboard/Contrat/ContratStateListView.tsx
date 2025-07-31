"use client";

import { Contrat, Project } from "@/utils/types";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ProjectListView } from "../Project";

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

export const ContratStateListView = () => {
  const [showProjectListView, setShowProjectListView] = useState(true);
  return (
    <>
      {contrats.map((contrat, index) => (
        <div
          className="flex w-full flex-col gap-7 rounded-xl bg-[#9CA3AF0D] p-5"
          key={index}
        >
          <div className="flex gap-2.5 items-center justify-start">
            <FontAwesomeIcon
              icon={showProjectListView ? faCaretDown : faCaretUp}
              onClick={() => setShowProjectListView(!showProjectListView)}
              className="cursor-pointer text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
            />
            <p className="bg-[#9CA3AF] px-2.5 py-2.5 uppercase text-base text-white font-bold rounded-md">
              {contrat.status}
            </p>
            <span className="border border-[#C5C5C5] rounded-full px-2.5 py-1 text-xs font-regular">
              {contrat.projects.length}
            </span>
          </div>
          {showProjectListView && (
            <div className="flex flex-col gap-2.5">
              {contrat.projects.map((project, index) => (
                <ProjectListView
                  key={index}
                  commentaire={project.commentaires}
                  nom={project.name}
                  date={project.dateCreated}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};
