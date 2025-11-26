"use client";

import { WelcomeCard } from "@/components/Card";
import { CreditCard, HeaderDashboard } from "@/components/Header";
import { Left } from "@/components/Pages/Dashboard";
import { Recharge } from "@/utils/types";
import { useState } from "react";

const navMenu = [
  { name: "Accueil", href: "/avocat/dashboard" },
  { name: "Révisions en cours", href: "/avocat/dashboard/revisions" },
  { name: "Contrathèque", href: "/avocat/dashboard/contratheque" },
];

const subtitlesMenu = [
  { name: "Mes clients", href: "/avocat/dashboard/clients" },
  { name: "Clauses dynamiques", href: "/avocat/dashboard/clauses-dynamiques" },
  { name: "Modèles", href: "/avocat/dashboard/modeles" },
];

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
  const [showWelcomeCard, setShowWelcomeCard] = useState(true);
  const [showCreditCard, setShowCreditCard] = useState(false);

  return (
    <div className="flex h-screen flex-col gap-0 bg-black pb-5 pr-8">
      <HeaderDashboard
        setShowCreditCard={setShowCreditCard}
        showCredit={showCreditCard}
        isClient={false}
      />
      <div className="flex h-[85%] flex-row gap-0">
        <Left
          menuItems={navMenu}
          subtitlesMenu={subtitlesMenu}
          subtitles="Bibliothèque"
          isClient={false}
        />
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
