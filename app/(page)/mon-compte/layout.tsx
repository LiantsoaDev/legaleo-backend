"use client";

import { CreditCard, HeaderDashboard } from "@/components/Header";
import { Left } from "@/components/Pages/MonCompte";
import { Recharge } from "@/utils/types";
import { useState } from "react";

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
  const [showCreditCard, setShowCreditCard] = useState(false);
  return (
    <div className="flex h-screen flex-col gap-0 bg-dark-green pb-5 pr-8">
      <HeaderDashboard
        setShowCreditCard={setShowCreditCard}
        showCredit={showCreditCard}
      />
      <div className="flex h-[85%] flex-row gap-0 px-3">
        <Left />
        <div className="w-4/5 bg-white rounded-2xl py-8 px-10 shadow-md relative overflow-y-auto scrollable">
          {children}
        </div>
      </div>
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
