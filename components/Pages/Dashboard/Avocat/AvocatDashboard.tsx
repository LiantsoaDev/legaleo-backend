"use client";

import { CustomCalendar } from "@/components/Calendar/Calendar";
import { ImportDocument } from "@/components/Card";
import { MesActivite } from "@/components/Card/MesActivite";
import { Notifications } from "@/components/Notifications";
import { Title } from "@/components/Typography";
import { useAppSelector } from "@/lib/hook";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { OnboardingFinalisation } from "../../Onboarding";
import { LastProject } from "../Project";

export const AvocatDashboard = () => {
  const today = new Date();
  const [importDocument, setImportDocument] = useState(false);
  const { data: session } = useSession();
  const { name, lastName } = useAppSelector((state) => state.user);

  const displayName = useMemo(() => {
    const safeName = name ?? session?.user?.name ?? "";
    const safeLastName = lastName ?? session?.user?.last_name ?? "";
    const nameParts = [safeName, safeLastName]
      .map((part) => part?.trim())
      .filter((part) => Boolean(part && part.length));

    return nameParts.join(" ") || "Utilisateur";
  }, [lastName, name, session?.user?.last_name, session?.user?.name]);

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
          <span className="text-text text-sm">{finalDate}</span>
          <div className="flex flex-row gap-5 items-center">
            <div className="w-15 h-15 bg-accent rounded-full" />
            <Title level={2} className="text-black font-semibold text-xl">
              Bonjour <span>{displayName}</span>
            </Title>
          </div>
        </div>
        <OnboardingFinalisation
          title="Complétez votre profil avocat"
          linkText="Compléter mon profil"
          linkHref="/onboarding/avocat"
          bgColor="#FFE9BD"
          onboardingStep="Ajoutez les informations manquantes pour finaliser votre espace et faciliter vos futures révisions"
        />
        <LastProject title="Activité récente" />
      </div>
      {importDocument && <ImportDocument setShow={setImportDocument} />}
      <div className="w-2/5 bg-[#F2F8F8] p-7 rounded-xl flex flex-col gap-7">
        <MesActivite />
        <Notifications />
        <CustomCalendar />
      </div>
    </div>
  );
};
