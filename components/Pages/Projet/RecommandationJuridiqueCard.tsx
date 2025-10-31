"use client";
import pdp from "@/assets/images/pdp.png";
import { Input } from "@/components/Form";
import { Paragraphe } from "@/components/Typography";
import { useTabContext } from "@/hooks/useTabContext";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createTextNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_HIGH,
  DELETE_CHARACTER_COMMAND,
  FORMAT_TEXT_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  KEY_DOWN_COMMAND,
  LexicalEditor,
  TextFormatType,
} from "lexical";
import Image from "next/image";
import { useEffect, useState } from "react";

interface RecommandationJuridiqueCardProps {
  classname?: string;
  cardId?: number;
  createdAt?: Date;
}

// Formats utilisés
const INSERT_FORMAT: TextFormatType = "underline";
const DELETE_FORMAT: TextFormatType = "strikethrough";

export const RecommandationJuridiqueCard = ({
  classname,
  cardId,
  createdAt,
}: RecommandationJuridiqueCardProps) => {
  const [editor] = useLexicalComposerContext();
  const { isSuggestionMode } = useTabContext();

  // --- États React pour stocker et afficher la suggestion ---
  const [suggestedInsertions, setSuggestedInsertions] = useState("");
  const [suggestedDeletions, setSuggestedDeletions] = useState("");
  const [currentState, setCurrentState] = useState<
    "remplacer" | "supprimer" | "ajouter" | ""
  >("");

  // --- Fonctions d'action (inchangées) ---
  function replaceSelectedText(editor: LexicalEditor, newText: string) {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.insertText(newText);
      }
    });
  }

  function handleClickAcceptSuggestion() {
    if (isSuggestionMode) {
      acceptSuggestion(editor);
    } else {
      replaceSelectedText(
        editor,
        `X_AE_B-22's pursuit leads it to the subterranean depths of the city, where forgotten tunnels and abandoned cyber-labs hide secrets long buried by time…” par “The city, a kaleidoscope of digital billboards and holographic projections, is in a state ...`
      );
    }
  }

  function acceptSuggestion(editor: LexicalEditor) {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      const nodes = selection.getNodes();
      nodes.forEach((node) => {
        if (!$isTextNode(node)) return;
        if (node.hasFormat(DELETE_FORMAT)) {
          node.remove();
        }
        if (node.hasFormat(INSERT_FORMAT)) {
          node.toggleFormat(INSERT_FORMAT);
        }
      });
    });
  }

  function rejectSuggestion(editor: LexicalEditor) {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      const nodes = selection.getNodes();
      nodes.forEach((node) => {
        if (!$isTextNode(node)) return;
        if (node.hasFormat(DELETE_FORMAT)) {
          node.toggleFormat(DELETE_FORMAT);
        }
        if (node.hasFormat(INSERT_FORMAT)) {
          node.remove();
        }
      });
    });
  }

  // --- Effet pour dériver l'état principal ("ajouter", "supprimer", "remplacer") ---
  useEffect(() => {
    const hasInsertions = suggestedInsertions.length > 0;
    const hasDeletions = suggestedDeletions.length > 0;

    if (hasInsertions && hasDeletions) {
      setCurrentState("remplacer");
    } else if (hasInsertions) {
      setCurrentState("ajouter");
    } else if (hasDeletions) {
      setCurrentState("supprimer");
    } else {
      setCurrentState("");
    }
  }, [suggestedInsertions, suggestedDeletions]);

  // --- EFFET 1 : MOTEUR DE SUGGESTION (Gère le "remplacement" correct) ---
  useEffect(() => {
    if (!isSuggestionMode) return; // Ne s'active qu'en mode suggestion

    // Interception des frappes au clavier
    const unregisterKeyDown = editor.registerCommand(
      KEY_DOWN_COMMAND,
      (event: KeyboardEvent) => {
        if (!isSuggestionMode) return false;

        // Gérer les caractères imprimables (lettres, chiffres, symboles...)
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            event.preventDefault(); // Empêche le navigateur de remplacer le texte

            // Créer le nouveau nœud de texte pour l'insertion
            const textNode = $createTextNode(event.key);
            textNode.toggleFormat(INSERT_FORMAT); // Le formater en "insertion" (souligné)

            if (!selection.isCollapsed()) {
              // CAS 1: Du texte EST sélectionné (Comportement "Remplacer")
              // 1. Marquer le texte actuellement sélectionné comme 'supprimé' (strikethrough)
              selection.formatText(DELETE_FORMAT);

              // 2. Réduire (collapse) la sélection à son point final (le "focus")
              const focus = selection.focus;
              selection.anchor.set(focus.key, focus.offset, focus.type);
              selection.focus.set(focus.key, focus.offset, focus.type);
            }

            // 3. Insérer le nouveau nœud (souligné) à la position actuelle du curseur
            selection.insertNodes([textNode]);

            return true; // Indiquer à Lexical que nous avons géré cet événement
          }
        }
        return false; // Laisser les autres gestionnaires s'exécuter
      },
      COMMAND_PRIORITY_HIGH
    );

    // INTERCEPTION DE LA SUPPRESSION (RETOUR ARRIÈRE / SUPPR)
    const unregisterDelete = editor.registerCommand(
      DELETE_CHARACTER_COMMAND,
      (isBackward: boolean) => {
        if (!isSuggestionMode) return false;
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          if (selection.isCollapsed()) {
            selection.modify("extend", isBackward, "character");
          }
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, DELETE_FORMAT);
          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_HIGH
    );

    // Interception spécifique de Backspace
    const unregisterBackspace = editor.registerCommand(
      KEY_BACKSPACE_COMMAND,
      (event) => {
        if (!isSuggestionMode) return false;
        event.preventDefault();
        return editor.dispatchCommand(DELETE_CHARACTER_COMMAND, true);
      },
      COMMAND_PRIORITY_HIGH
    );

    // Interception spécifique de Delete
    const unregisterKeyDelete = editor.registerCommand(
      KEY_DELETE_COMMAND,
      (event) => {
        if (!isSuggestionMode) return false;
        event.preventDefault();
        return editor.dispatchCommand(DELETE_CHARACTER_COMMAND, false);
      },
      COMMAND_PRIORITY_HIGH
    );

    return () => {
      unregisterKeyDown();
      unregisterDelete();
      unregisterBackspace();
      unregisterKeyDelete();
    };
  }, [editor, isSuggestionMode]);

  // --- EFFET 2 : LECTEUR DE SUGGESTION (Gère le "retour à la normale") ---
  // Lit l'état de l'éditeur ET nettoie l'éditeur si le mode est désactivé
  useEffect(() => {
    // --- MODIFICATION ICI ---
    // Si on n'est PAS en mode suggestion
    if (!isSuggestionMode) {
      // 1. Vider les états React (pour la carte)
      setSuggestedInsertions("");
      setSuggestedDeletions("");

      // 2. "Rejeter" toutes les suggestions dans l'éditeur
      // (Garde le texte original, ignore les suggestions)
      editor.update(() => {
        const root = $getRoot();
        const textNodes = root.getAllTextNodes();

        textNodes.forEach((node) => {
          // Si un texte était marqué comme 'supprimé' (barré)
          if (node.hasFormat(DELETE_FORMAT)) {
            // On enlève juste le format 'barré' (on le garde)
            node.toggleFormat(DELETE_FORMAT);
          }
          // Si un texte était marqué comme 'ajouté' (souligné)
          if (node.hasFormat(INSERT_FORMAT)) {
            // On supprime ce nœud de texte (on l'ignore)
            node.remove();
          }
        });
      });

      return; // On arrête ici (on n'enregistre pas l'écouteur de màj)
    }
    // --- FIN DE LA MODIFICATION ---

    // Si on EST en mode suggestion, on enregistre l'écouteur de mise à jour
    const unregisterUpdate = editor.registerUpdateListener(
      ({ editorState }) => {
        // editorState.read() est essentiel pour accéder à l'état en toute sécurité
        editorState.read(() => {
          const root = $getRoot();
          const textNodes = root.getAllTextNodes();

          let insertions = "";
          let deletions = "";

          textNodes.forEach((node) => {
            if (node.hasFormat(INSERT_FORMAT))
              insertions += node.getTextContent();
            if (node.hasFormat(DELETE_FORMAT))
              deletions += node.getTextContent();
          });

          setSuggestedInsertions(insertions);
          setSuggestedDeletions(deletions);
        });
      }
    );

    // Nettoyage : on retire l'écouteur
    return () => {
      unregisterUpdate();
    };
  }, [editor, isSuggestionMode]); // Se ré-exécute si le mode change

  // --- Rendu du composant (Inchangé) ---
  return (
    <div
      className={`hover:bg-[#F2F2F2] px-5 py-2.5 w-full cursor-pointer ${classname}`}
    >
      <div className="flex flex-col gap-5 shadow bg-white rounded-sm p-3.5">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <div className="font-medium text-sm text-black flex gap-1 items-center">
              <Image src={pdp} alt="photo de profil" width={24} height={24} />
              <span className="font-semibold text-xs text-[#087F83]">
                ID utilisateur
              </span>
            </div>
            <span className="font-medium text-[#828282] text-[10px]">
              02/10/2025
            </span>
          </div>
          <div className="flex flex-row gap-2.5 items-center">
            <FontAwesomeIcon
              icon={faCheck}
              className="text-|#828282] text-xl px-1.5 py-2 hover:bg-[#F2F2F2] cursor-pointer"
              onClick={() => handleClickAcceptSuggestion()}
            />
            <FontAwesomeIcon
              icon={faXmark}
              className="text-|#828282] text-xl px-1.5 py-2 hover:bg-[#F2F2F2] cursor-pointer"
              onClick={() => rejectSuggestion(editor)}
            />
          </div>
        </div>

        <Paragraphe className="font-medium text-xs text-black">
          {isSuggestionMode ? (
            <>
              <span className="font-bold capitalize">
                {currentState || "Suggestion"}
                {currentState ? " : " : ""}
              </span>
              {suggestedDeletions && (
                <span className="text-red-600 line-through">
                  {` "${suggestedDeletions}" `}
                </span>
              )}
              {suggestedInsertions && (
                <span className="text-green-600 underline">
                  {` "${suggestedInsertions}" `}
                </span>
              )}
              {!currentState && (
                <span className="text-gray-500 italic">
                  Commencez à taper pour suggérer...
                </span>
              )}
            </>
          ) : (
            `X_AE_B-22's pursuit
            leads it to the subterranean depths of the city, where forgotten
            tunnels and abandoned cyber-labs hide secrets long buried by time…”
            par “The city, a kaleidoscope of digital billboards and holographic
            projections, is in a state ...`
          )}
        </Paragraphe>

        <Input
          type="text"
          placeholder="Répondre"
          name="repondre"
          classname="!bg-[#F2F2F2] !text-[#828282] !text-xs"
          isrequired={false}
        />
      </div>
    </div>
  );
};
