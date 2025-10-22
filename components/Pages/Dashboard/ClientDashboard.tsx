import { auth } from "@/auth";
import { Decouvrir } from "@/components/Assistances";
import { ProjectCard } from "@/components/Card";
import { Notifications } from "@/components/Notifications";
import { Title } from "@/components/Typography";
import { Videos } from "@/components/Video";
import { prisma } from "@/lib/prisma";
import { getUserWorkflowProgress, WORKFLOWS } from "@/lib/workflows";
import {
  faDownload,
  faFile,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OnboardingFinalisation } from "../Onboarding";
import { LastProject } from "./Project";

export const ClientDashboard = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const [user, onboarding, workflowData] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, last_name: true },
    }),
    prisma.onboardingResponse.findUnique({
      where: { userId: session.user.id },
      select: { firstName: true, lastName: true },
    }),
    getUserWorkflowProgress(session.user.id),
  ]);

  const sessionName = session.user.name ?? "";
  const [sessionFirst = "", ...sessionLastParts] = sessionName.split(" ");

  const resolvedFirstName =
    onboarding?.firstName ||
    user?.last_name ||
    sessionFirst ||
    "";
  const resolvedLastName =
    onboarding?.lastName ||
    user?.name ||
    sessionLastParts.join(" ") ||
    "";

  const displayName = [resolvedFirstName, resolvedLastName]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(" ")
    .trim() || session.user.email || "Utilisateur";

  const currentWorkflow = workflowData.currentWorkflow;
  const workflowIndex =
    WORKFLOWS.findIndex(
      (workflow) => workflow.key === currentWorkflow.definition.key
    ) + 1;

  const today = new Date();

  const formattedDate = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const finalDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  return (
    <div className="flex flex-row gap-12">
      <div className="w-3/5 flex flex-col gap-7">
        <div className="flex flex-col gap-2.5">
          <span className="text-[#828282] text-sm">{finalDate}</span>
          <div className="flex flex-row gap-5 items-center">
            <div className="w-15 h-15 bg-accent rounded-full" />
            <Title level={2} className="text-black font-semibold text-xl">
              Bonjour <span>{displayName}</span>
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
        <OnboardingFinalisation
          title={currentWorkflow.definition.title}
          stepIndex={workflowIndex > 0 ? workflowIndex : 1}
          completedSteps={currentWorkflow.completedSteps}
          totalSteps={currentWorkflow.totalSteps}
          ctaHref={currentWorkflow.definition.ctaHref}
        />
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
