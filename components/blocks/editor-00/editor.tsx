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

        contract
          .trim()
          .split(/\n{2,}/)
          .forEach((block) => {
            const paragraphNode = $createParagraphNode();

            block.split(/\n/).forEach((line, index, lines) => {
              const trimmedLine = line.trim();
              if (trimmedLine.length > 0) {
                paragraphNode.append($createTextNode(trimmedLine));
              }

              if (index < lines.length - 1) {
                paragraphNode.append($createLineBreakNode());
              }
            });

            if (paragraphNode.getChildrenSize() > 0) {
              root.append(paragraphNode);
            }
          });
      });
    };

    const fetchContract = async () => {
      try {
        const response = await fetch("/api/contracts/generate", {
          method: "POST",
          cache: "no-store",
        });

        if (!response.ok) {
          let details = "";
          try {
            const payload = await response.json();
            details =
              (payload as { message?: string })?.message ??
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

        const { contract } = (await response.json()) as { contract?: string };

        if (contract && !cancelled) {
          replaceContent(contract);
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Erreur inconnue lors du chargement du contrat.";
        toast.error(
          `Impossible de charger le contrat de franchise : ${message}`,
          {
            position: "top-right",
            theme: "colored",
          }
        );
        console.error("Impossible de charger le contrat de franchise", error);
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
