"use client";

import { Navigateur } from "@/components/Fichier";
import { Title } from "@/components/Typography";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ModelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  let formattedSegment = null;
  if (segments.length > 2) {
    const lastSegment = segments[segments.length - 1] || "";
    formattedSegment =
      lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  }

  return (
    <div className="flex flex-col gap-11 py-8 h-full">
      <Title className="text-2xl font-semibold text-black">
        <Link href="/dashboard/models">Modèles</Link>{" "}
        {formattedSegment && `/ ${formattedSegment}`}
      </Title>
      <div className="flex flex-row">
        <div className="w-1/5 py-0 border-r border-r-gray fill-available pr-3.5">
          <div className="py-3 px-2.5 w-full text-left text-sm font-semibold text-[#86A2A3] bg-[#F2F8F8] rounded-sm">
            Galerie de modèle
          </div>
          <Link
            href="/dashboard/models/favoris"
            className="flex flex-row gap-3.5 items-center text-sm py-3 px-2.5 text-[#86A2A3]"
          >
            <FontAwesomeIcon icon={faStar} />
            Favoris
          </Link>
          <Navigateur />
        </div>
        <div className="flex flex-col w-4/5 gap-7 px-6">{children}</div>
      </div>
    </div>
  );
}
