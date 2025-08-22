"use client";

import { WelcomeCard } from "@/components/Card";
import { HeaderDashboard } from "@/components/Header";
import { Left } from "@/components/Pages/Dashboard";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showWelcomeCard, setShowWelcomeCard] = useState(true);

  return (
    <div className="flex h-screen flex-col gap-0 bg-dark-green pb-5 pr-8">
      <HeaderDashboard />
      <div className="flex h-[85%] flex-row gap-0">
        <Left />
        <div className="w-4/5 bg-white rounded-2xl py-8 px-10 shadow-md relative overflow-y-auto scrollable">
          {children}
        </div>
      </div>
      {showWelcomeCard && (
        <WelcomeCard setShowWelcomeCard={setShowWelcomeCard} />
      )}
    </div>
  );
}
