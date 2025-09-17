"use client";

import { Navigateur } from "@/components/Fichier";

export default function ModelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-11 py-8 h-full">
      <div className="flex flex-row">
        <div className="w-1/5 py-0 border-r border-r-gray fill-available pr-3.5">
          <Navigateur />
        </div>
        <div className="flex flex-col w-4/5 gap-7 px-6">{children}</div>
      </div>
    </div>
  );
}
