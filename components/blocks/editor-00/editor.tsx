"use client";

import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createLineBreakNode,
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  EditorState,
  SerializedEditorState,
} from "lexical";
import { useEffect } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { toast } from "react-toastify";

import { Plugins } from "./plugins";

const ContractContentLoader = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    let cancelled = false;

    const replaceContent = (contract: string) => {
      editor.update(() => {
        const root = $getRoot();
        root.clear();

        // Parser le markdown de manière basique
        const lines = contract.split(/\n/);
        let currentParagraph = $createParagraphNode();
        let inList = false;

        lines.forEach((line, lineIndex) => {
          const trimmedLine = line.trim();

          // Ignorer les lignes vides
          if (trimmedLine.length === 0) {
            if (currentParagraph.getChildrenSize() > 0) {
              root.append(currentParagraph);
              currentParagraph = $createParagraphNode();
            }
            return;
          }

          // Détecter les titres (markdown #, ##, ###)
          if (trimmedLine.match(/^#{1,6}\s+/)) {
            if (currentParagraph.getChildrenSize() > 0) {
              root.append(currentParagraph);
              currentParagraph = $createParagraphNode();
            }
            const headingText = trimmedLine.replace(/^#{1,6}\s+/, "");
            const headingNode = $createParagraphNode();
            headingNode.append($createTextNode(headingText));
            headingNode.setFormat("bold");
            root.append(headingNode);
            currentParagraph = $createParagraphNode();
            return;
          }

          // Détecter les listes (markdown -, *, 1.)
          if (trimmedLine.match(/^[-*]\s+/) || trimmedLine.match(/^\d+\.\s+/)) {
            if (!inList && currentParagraph.getChildrenSize() > 0) {
              root.append(currentParagraph);
              currentParagraph = $createParagraphNode();
            }
            inList = true;
            const listText = trimmedLine.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "");
            const listNode = $createParagraphNode();
            listNode.append($createTextNode("• " + listText));
            root.append(listNode);
            return;
          }

          // Texte normal
          inList = false;
          if (trimmedLine.length > 0) {
            currentParagraph.append($createTextNode(trimmedLine));
            // Ajouter un saut de ligne si ce n'est pas la dernière ligne
            if (lineIndex < lines.length - 1) {
              currentParagraph.append($createLineBreakNode());
            }
          }
        });

        // Ajouter le dernier paragraphe s'il contient du contenu
        if (currentParagraph.getChildrenSize() > 0) {
          root.append(currentParagraph);
        }
      });
    };

    const fetchContract = async () => {
      try {
        // Récupérer l'ID du contrat depuis l'URL
        const pathParts = window.location.pathname.split("/");
        const contractId = pathParts[pathParts.length - 1];

        if (!contractId || contractId === "nouveau" || contractId === "generer") {
          console.warn("Aucun ID de contrat trouvé dans l'URL");
          return;
        }

        // Récupérer le contrat depuis l'API
        const response = await fetch(`/api/contracts?id=${contractId}`, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          let details = "";
          try {
            const payload = await response.json();
            details =
              (payload as { error?: string })?.error ??
              JSON.stringify(payload);
          } catch {
            details = await response.text();
          }

          throw new Error(
            `Erreur API ${response.status}${
              details ? ` : ${details}` : ""
            }`.trim()
          );
        }

        const { contract } = (await response.json()) as { contract?: { content?: string } };

        if (contract?.content && !cancelled) {
          replaceContent(contract.content);
        } else if (!contract?.content) {
          console.warn("Le contrat n'a pas encore de contenu généré");
          // Afficher un message si le contrat est en cours de génération
          if (contract?.status === "generating") {
            toast.info("Le contrat est en cours de génération...", {
              position: "top-right",
              theme: "colored",
            });
          }
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Erreur inconnue lors du chargement du contrat.";
        toast.error(
          `Impossible de charger le contrat : ${message}`,
          {
            position: "top-right",
            theme: "colored",
          }
        );
        console.error("Impossible de charger le contrat", error);
      }
    };

    fetchContract();

    return () => {
      cancelled = true;
    };
  }, [editor]);

  return null;
};

export function Editor({
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
}: {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
}) {
  return (
    <TooltipProvider>
      <ContractContentLoader />
      <Plugins />

      <OnChangePlugin
        ignoreSelectionChange={true}
        onChange={(editorState) => {
          onChange?.(editorState);
          onSerializedChange?.(editorState.toJSON());
        }}
      />
    </TooltipProvider>
  );
}
