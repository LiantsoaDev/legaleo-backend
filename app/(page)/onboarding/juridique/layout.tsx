"use client";

import { Back } from "@/components/ui/BackHome";

export default function OnboardingJuridiqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen relative">
      <div className="absolute top-10 left-20">
        <Back link="/dashboard">Sauvegarder et retourner au dashboard</Back>
      </div>
      {children}
    </div>
  );
}
