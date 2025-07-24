import { Decouvrir } from "@/components/Assistances";
import { ProjectCard } from "@/components/Card";
import { Notifications } from "@/components/Notifications";
import { Title } from "@/components/Typography";
import { Videos } from "@/components/Video";
import {
  faDownload,
  faFile,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OnboardingFinalisation } from "../Onboarding";
import { LastProject } from "./Project";

export const ClientDashboard = () => {
  return (
    <div className="flex flex-row gap-12">
      <div className="w-3/5 flex flex-col gap-7">
        <div className="flex flex-row gap-5 items-center">
          <div className="w-15 h-15 bg-accent rounded-full" />
          <Title level={2} className="text-black font-semibold text-xl">
            Bonjour <span>User</span>
          </Title>
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
          />
          <ProjectCard
            icon={
              <FontAwesomeIcon
                icon={faSignature}
                className="text-primary !text-xl"
              />
            }
            title="Signer un document"
          />
          <ProjectCard
            icon={
              <FontAwesomeIcon
                icon={faDownload}
                className="text-primary !text-xl"
              />
            }
            title="Importer un document"
          />
        </div>
        <OnboardingFinalisation />
        <LastProject />
      </div>
      <div className="w-2/5 bg-[#F2F8F8] p-7 rounded-xl flex flex-col gap-7">
        <Notifications />
        <Videos />
        <Decouvrir />
      </div>
    </div>
  );
};
