"use client";

import { WelcomeCard } from "@/components/Card";
import { CreditCard, HeaderDashboard } from "@/components/Header";
import { Left } from "@/components/Pages/Dashboard";
import { fetchOnboardings } from "@/lib/features/slice/onboardingSlice";
import {
  setWorkspaceData,
  setWorkspaceSpaces,
} from "@/lib/features/slice/workspaceSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { Recharge } from "@/utils/types";
import { useEffect, useState } from "react";

const recharges: Recharge[] = [
  {
    duration: "5h",
    prix: "100€",
  },
  {
    duration: "10h",
    prix: "100€",
  },
  {
    duration: "20h",
    prix: "100€",
  },
  {
    duration: "30h",
    prix: "100€",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { id: userId } = useAppSelector((state) => state.user);
  const formData = useAppSelector((state) => state.onboarding.formData);
  const [showWelcomeCard, setShowWelcomeCard] = useState(true);
  const [showCreditCard, setShowCreditCard] = useState(false);

  useEffect(() => {
    if (!userId) return;
    dispatch(fetchOnboardings({ title: "Onboarding principal", userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    if (!formData) return;

    const spacesFromForm = Array.isArray(formData?.workspaceSpaces)
      ? formData.workspaceSpaces.filter(Boolean)
      : formData?.brandName
      ? [formData.brandName]
      : [];

    if (spacesFromForm.length) {
      dispatch(
        setWorkspaceSpaces({
          spaces: spacesFromForm,
          currentSpace:
            (formData?.currentWorkspaceSpace as string | undefined) ??
            spacesFromForm[0],
        })
      );
    }

    if (
      formData?.workspaceName ||
      formData?.companyName ||
      formData?.enseigne_nom
    ) {
      dispatch(
        setWorkspaceData({
          workspaceName: formData.workspaceName as string | undefined,
          companyName:
            (formData.companyName as string | undefined) ??
            (formData.enseigne_nom as string | undefined) ??
            null,
          shareholderName: formData.shareholderName as string | undefined,
          shareholderSiren: formData.shareholderSiren as string | undefined,
        })
      );
    }
  }, [dispatch, formData]);

  return (
    <div className="flex h-screen flex-col gap-0 bg-dark-green pb-5 pr-8">
      <HeaderDashboard
        setShowCreditCard={setShowCreditCard}
        showCredit={showCreditCard}
      />
      <div className="flex h-[85%] flex-row gap-0">
        <Left />
        <div className="w-4/5 bg-white rounded-2xl py-8 px-10 shadow-md relative overflow-y-auto scrollable">
          {children}
        </div>
      </div>
      {showWelcomeCard && (
        <WelcomeCard setShowWelcomeCard={setShowWelcomeCard} />
      )}
      {showCreditCard && (
        <CreditCard
          setShow={setShowCreditCard}
          consommer="5h"
          restant="12h"
          rechargers={recharges}
        />
      )}
    </div>
  );
}
