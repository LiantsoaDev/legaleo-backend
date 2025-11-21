"use client";

import { Button } from "@/components/Button";
import { Historique } from "@/components/editor";
import { DocumentAction } from "@/components/editor/DocumentAction";
import { EditorProvider } from "@/components/editor/EditorProvider";
import {
  DeleteCard,
  Dupliquer,
  EditorAction,
  Envoyer,
  Inviter,
  RightBar,
} from "@/components/Pages/Projet";
import { DocumentName } from "@/components/Pages/Projet/DocumentName";
import { TabProvider } from "@/hooks/useTabContext";
import { faCheck, faFolder, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

// Définition de l'interface pour la Table des Matières
export interface TocItem {
  id: string;
  text: string;
  level: number;
}

// --- Composant de Table des Matières latérale (SidebarToc) ---
const SidebarToc = ({ tocItems }: { tocItems: TocItem[] }) => {
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);
  const [showEditorAction, setShowEditorAction] = useState(false);

  // Fonction pour observer le défilement et surligner le titre actif (ScrollSpy)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let currentActiveId: string | null = null;

        // Trouver le premier titre qui est visible et au-dessus d'une certaine ligne
        for (const entry of entries) {
          if (entry.isIntersecting && entry.boundingClientRect.top > 0) {
            currentActiveId = entry.target.id;
            break;
          }
        }

        if (currentActiveId && currentActiveId !== activeHeadingId) {
          setActiveHeadingId(currentActiveId);
        }
      },
      {
        root: null, // Viewport
        threshold: 0,
        rootMargin: "-20% 0px -50% 0px", // Active le titre lorsqu'il atteint les 20% du haut de l'écran
      }
    );

    // Observer tous les titres dans le conteneur de l'éditeur
    const contentContainer = document.getElementById(
      "ckeditor-content-wrapper"
    );
    if (contentContainer) {
      const headings = contentContainer.querySelectorAll(
        "h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]"
      );
      headings.forEach((heading) => observer.observe(heading));
    }

    return () => observer.disconnect();
  }, [tocItems, activeHeadingId]);

  return (
    <div
      className="sticky top-0 h-screen overflow-y-auto p-4"
      onMouseDown={(e) => e.preventDefault()}
    >
      <EditorAction />
      <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4 pt-10">
        Table des matières
      </h3>
      <ul className="space-y-1">
        {tocItems.map((item) => (
          <li
            key={item.id}
            // Indentation basée sur le niveau du titre (h1, h2, etc.)
            style={{ marginLeft: `${(item.level - 1) * 10}px` }}
            className={`text-sm leading-tight transition-colors ${
              item.id === activeHeadingId
                ? "font-medium text-[#00A5EB]"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                // Défilement fluide vers l'ID correspondant dans le contenu
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="block cursor-pointer"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function ProjetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showInviter, setShowInviter] = useState(false);
  const [showEnvoyer, setShowEnvoyer] = useState(false);
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [showAction, setShowAction] = useState(false);
  const [showDupliquer, setShowDupliquer] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [vueMode, setVueMode] = useState(false);

  // Fonction de rappel passée à l'éditeur
  const handleHeadingsChange = (newHeadings: TocItem[]) => {
    setHeadings(newHeadings);
  };

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <TabProvider>
      <div className="flex flex-col w-screen overflow-x-hidden h-screen overflow-y-auto bg-gray">
        <EditorProvider>
          <div className="flex flex-row justify-between py-5 px-8 bg-white shadow-sm w-full relative">
            <div className="flex flex-col gap-2">
              <DocumentName />
              <div className="flex flex-row gap-2 items-center">
                <span className="bg-[#00A5EB1A] py-1 px-2 rounded text-[#00A5EB] text-xs font-medium">
                  En cours de signature
                </span>
                <span className="flex flex-row gap-2 items-center text-xs text-[#828282]">
                  <FontAwesomeIcon icon={faFolder} className="text-sm" />
                  Dossier
                </span>
                <span className="flex flex-row gap-1 items-center text-xs text-[#828282]">
                  Mis à jour il y a 2 jour par{" "}
                  <span className="font-bold text-xs">Lorem ipsum</span> (vous)
                </span>
              </div>
            </div>
            <div className="flex flex-row items-center gap-5">
              <div className="flex flex-row gap-5 items-center !mt-5">
                {/* Historique de version */}
                <Historique />
                <span className="flex items-center gap-2.5 px-2 py-1.5 bg-[#EDF4F3] text-[#24856D] font-semibold text-sm rounded-xs">
                  <FontAwesomeIcon icon={faCheck} />
                  Sauvegardé
                </span>
                <Button
                  classname="!rounded-sm !flex gap-2 items-center !bg-transparent !text-black !border !border-black transition"
                  onclick={() => setShowInviter(true)}
                >
                  <FontAwesomeIcon icon={faPlus} className="text-sm" />
                  Inviter
                </Button>
                <Button
                  classname="!rounded-sm"
                  onclick={() => setShowEnvoyer(true)}
                >
                  Envoyer
                </Button>
              </div>
              <DocumentAction
                setShowAction={setShowAction}
                setShowDelete={setShowDelete}
                setShowDupliquer={setShowDupliquer}
                setVueMode={setVueMode}
                showAction={showAction}
                vueMode={vueMode}
              />
            </div>
          </div>

          <div className="flex flex-row justify-between">
            {!vueMode && <SidebarToc tocItems={headings} />}
            <div className="w-3/5 mt-10 mx-auto z-10 h-screen bg-gray">
              {children}
            </div>
            {!vueMode && (
              <div className="w-fit flex flex-row h-[82%]">
                <RightBar />
              </div>
            )}
          </div>
        </EditorProvider>
        {showInviter && <Inviter setShow={setShowInviter} />}
        {showEnvoyer && (
          <Envoyer setShow={setShowEnvoyer} hasInvalideFields={false} />
        )}
        {showDupliquer && <Dupliquer setShow={setShowDupliquer} />}
        {showDelete && <DeleteCard setShow={setShowDelete} />}
      </div>
    </TabProvider>
  );
}
