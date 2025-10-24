// components/editor/plugins/SuggestionPlugin.tsx
import { useTabContext } from "@/hooks/useTabContext";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createTextNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_HIGH,
  DELETE_CHARACTER_COMMAND,
  FORMAT_TEXT_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  KEY_DOWN_COMMAND,
  TextFormatType,
} from "lexical";
import { useEffect } from "react";

const INSERT_FORMAT: TextFormatType = "underline";
const DELETE_FORMAT: TextFormatType = "strikethrough";

export function SuggestionPlugin() {
  const [editor] = useLexicalComposerContext();
  const { isSuggestionMode } = useTabContext();

  useEffect(() => {
    // Interception des frappes au clavier
    const unregisterKeyDown = editor.registerCommand(
      KEY_DOWN_COMMAND,
      (event: KeyboardEvent) => {
        if (!isSuggestionMode) return false;

        // Gérer les caractères imprimables
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            event.preventDefault();

            const textNode = $createTextNode(event.key);
            textNode.toggleFormat(INSERT_FORMAT);
            selection.insertNodes([textNode]);

            return true;
          }
        }

        return false;
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
            // Pour une sélection réduite (curseur), on doit d'abord
            // modifier la sélection pour inclure le caractère à "supprimer"
            if (isBackward) {
              // Retour arrière : étendre la sélection vers la gauche
              selection.modify("extend", true, "character");
            } else {
              // Suppression : étendre la sélection vers la droite
              selection.modify("extend", false, "character");
            }
          }

          // Applique le format de suppression (barré) au lieu de supprimer
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, DELETE_FORMAT);

          // On replace le curseur à la position appropriée
          // En mode suggestion, on veut juste garder le curseur là où il était
          // Pour backspace : curseur au début de la sélection
          // Pour delete : curseur à la fin de la sélection
          if (isBackward) {
            // Pour backspace, on veut que le curseur reste au même endroit
            // donc on ne fait rien de spécial
          } else {
            // Pour delete, on veut que le curseur reste après le texte formaté
            // donc on ne fait rien non plus
          }

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

  return null;
}
