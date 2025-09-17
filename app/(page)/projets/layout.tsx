"use client";

import { useState } from "react";

export default function ProjetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showWelcomeCard, setShowWelcomeCard] = useState(true);

  return (
    <div className="flex h-screen flex-col gap-0 pb-5 pr-8">{children}</div>
  );
}
