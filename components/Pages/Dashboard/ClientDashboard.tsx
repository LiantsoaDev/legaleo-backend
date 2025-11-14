"use client";
import { Decouvrir } from "@/components/Assistances";
import { ImportDocument, ProjectCard } from "@/components/Card";
import { Notifications } from "@/components/Notifications";
import { Title } from "@/components/Typography";
import { Videos } from "@/components/Video";
import {
  faDownload,
  faFile,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAppSelector } from "@/lib/hook";
import { OnboardingFinalisation } from "../Onboarding";
import { LastProject } from "./Project";

export const ClientDashboard = () => {
  const today = new Date();
  const [importDocument, setImportDocument] = useState(false);
  const { name, last_name } = useAppSelector((state) => state.user);

  const formattedDate = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const finalDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  const greetingName = [name, last_name].filter(Boolean).join(" ").trim();
  return (
    <div className="flex flex-row gap-12">
      <div className="w-3/5 flex flex-col gap-7">
        <div className="flex flex-col gap-2.5">
          <span className="text-[#828282] text-sm">{finalDate}</span>
          <div className="flex flex-row gap-5 items-center">
            <div className="w-15 h-15 bg-accent rounded-full" />
            <Title level={2} className="text-black font-semibold text-xl">
              Bonjour <span>{greetingName || "Utilisateur"}</span>
            </Title>
          </div>
        </div>
        <div className="flex flex-row w-full items-center gap-5">
          <ProjectCard
            icon={
              <FontAwesomeIcon
                icon={faFile}
                className="text-primary !text-xl"
              />
            }
            title="Nouveau projet"
            href="/projets/nouveau"
          />
          <ProjectCard
            icon={
              <FontAwesomeIcon
                icon={faSignature}
                className="text-primary !text-xl"
              />
            }
            title="Signer un document"
            href="/projets/signer-projet"
          />
          <ProjectCard
            icon={
              <FontAwesomeIcon
                icon={faDownload}
                className="text-primary !text-xl"
              />
            }
            title="Importer un document"
            href="#"
            onClick={() => setImportDocument(true)}
          />
        </div>
        <OnboardingFinalisation />
        <LastProject />
      </div>
      {importDocument && <ImportDocument setShow={setImportDocument} />}
      <div className="w-2/5 bg-[#F2F8F8] p-7 rounded-xl flex flex-col gap-7">
        <Notifications />
        <Videos />
        <Decouvrir />
      </div>
    </div>
  );
};
