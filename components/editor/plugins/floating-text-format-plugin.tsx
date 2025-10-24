"use client";

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { $isCodeHighlightNode } from "@lexical/code";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_LOW,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { Dispatch, JSX, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { CommentPopup } from "@/components/Editor/CommentPopup";
import { getDOMRangeRect } from "@/components/editor/utils/get-dom-range-rect";
import { getSelectedNode } from "@/components/editor/utils/get-selected-node";
import { setFloatingElemPosition } from "@/components/editor/utils/set-floating-elem-position";
import { DynamiqueChampsCard } from "@/components/Pages/Projet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTabContext } from "@/hooks/useTabContext";

const champs_dynamique = [
  "Nom franchise",
  "Raison Social",
  "Adresse du siège social",
  "Représentant légal (nom/premon)",
  "Numéro SIRET",
  "Numéro TVA intracommunautaire",
];

function FloatingTextFormat({
  editor,
  anchorElem,
  isLink,
  isBold,
  isItalic,
  isUnderline,
  isCode,
  isStrikethrough,
  isSubscript,
  isSuperscript,
  setIsLinkEditMode,
  champ_dynamique,
}: {
  editor: LexicalEditor;
  anchorElem: HTMLElement;
  isBold: boolean;
  isCode: boolean;
  isItalic: boolean;
  isLink: boolean;
  isStrikethrough: boolean;
  isSubscript: boolean;
  isSuperscript: boolean;
  isUnderline: boolean;
  setIsLinkEditMode: Dispatch<boolean>;
  champ_dynamique: string[];
}): JSX.Element {
  const popupCharStylesEditorRef = useRef<HTMLDivElement | null>(null);
  const [addDynamiqueChamps, setAddDynamiqueChamps] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [addSuggestion, setAddSuggestion] = useState(false);
  const [comments, setComments] = useState<
    {
      id: string;
      content: string;
    }[]
  >([]);
  const { isSuggestionMode, setIsSuggestionMode, handleClickSuggestion } =
    useTabContext();

  const insertLink = useCallback(() => {
    if (!isLink) {
      setIsLinkEditMode(true);
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
    } else {
      setIsLinkEditMode(false);
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink, setIsLinkEditMode]);

  const copySelectedText = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const text = selection.getTextContent();
        if (!text) return;

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).catch((err) => {
            console.error("Erreur de copie :", err);
          });
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          try {
            document.execCommand("copy");
          } catch (err) {
            console.error("Erreur fallback :", err);
          }
          document.body.removeChild(textarea);
        }
      }
    });
  }, [editor]);

  const handleSetSuggestionMode = useCallback(() => {
    setAddSuggestion(true);
    setIsSuggestionMode(true);
  }, [addSuggestion]);

  const cutSelectedText = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const text = selection.getTextContent();
        if (!text) return;

        // Copier dans le presse-papiers
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).catch((err) => {
            console.error("Erreur de copie :", err);
          });
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          try {
            document.execCommand("copy");
          } catch (err) {
            console.error("Erreur fallback :", err);
          }
          document.body.removeChild(textarea);
        }

        // 🔥 Supprimer le texte sélectionné (c’est le “cut”)
        selection.removeText();
      }
    });
  }, [editor]);

  const pasteFromClipboard = useCallback(() => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .readText()
        .then((text) => {
          if (!text) return;

          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              selection.insertText(text);
            }
          });
        })
        .catch((err) => {
          console.error("Erreur de collage :", err);
        });
    } else {
      // Fallback pour anciens navigateurs
      const textarea = document.createElement("textarea");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();

      try {
        const success = document.execCommand("paste");
        if (success) {
          const pastedText = textarea.value;
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              selection.insertText(pastedText);
            }
          });
        }
      } catch (err) {
        console.error("Erreur fallback de collage :", err);
      }

      document.body.removeChild(textarea);
    }
  }, [editor]);

  const setChampDynamique = useCallback(() => {
    setAddDynamiqueChamps(!addDynamiqueChamps);
  }, [editor]);

  function mouseMoveListener(e: MouseEvent) {
    if (
      popupCharStylesEditorRef?.current &&
      (e.buttons === 1 || e.buttons === 3)
    ) {
      if (popupCharStylesEditorRef.current.style.pointerEvents !== "none") {
        const x = e.clientX;
        const y = e.clientY;
        const elementUnderMouse = document.elementFromPoint(x, y);

        if (!popupCharStylesEditorRef.current.contains(elementUnderMouse)) {
          // Mouse is not over the target element => not a normal click, but probably a drag
          popupCharStylesEditorRef.current.style.pointerEvents = "none";
        }
      }
    }
  }
  function mouseUpListener(e: MouseEvent) {
    if (popupCharStylesEditorRef?.current) {
      if (popupCharStylesEditorRef.current.style.pointerEvents !== "auto") {
        popupCharStylesEditorRef.current.style.pointerEvents = "auto";
      }
    }
  }

  useEffect(() => {
    if (popupCharStylesEditorRef?.current) {
      document.addEventListener("mousemove", mouseMoveListener);
      document.addEventListener("mouseup", mouseUpListener);

      return () => {
        document.removeEventListener("mousemove", mouseMoveListener);
        document.removeEventListener("mouseup", mouseUpListener);
      };
    }
  }, [popupCharStylesEditorRef]);

  const $updateTextFormatFloatingToolbar = useCallback(() => {
    const selection = $getSelection();

    const popupCharStylesEditorElem = popupCharStylesEditorRef.current;
    const nativeSelection = window.getSelection();

    if (popupCharStylesEditorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      nativeSelection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const rangeRect = getDOMRangeRect(nativeSelection, rootElement);

      rootElement.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        setFloatingElemPosition(
          rangeRect,
          popupCharStylesEditorElem,
          anchorElem,
          isLink
        );
      });
    }
  }, [editor, anchorElem, isLink]);

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement;

    const update = () => {
      editor.getEditorState().read(() => {
        $updateTextFormatFloatingToolbar();
      });
    };

    window.addEventListener("resize", update);
    if (scrollerElem) {
      scrollerElem.addEventListener("scroll", update);
    }

    return () => {
      window.removeEventListener("resize", update);
      if (scrollerElem) {
        scrollerElem.removeEventListener("scroll", update);
      }
    };
  }, [editor, $updateTextFormatFloatingToolbar, anchorElem]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      $updateTextFormatFloatingToolbar();
    });
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateTextFormatFloatingToolbar();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateTextFormatFloatingToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, $updateTextFormatFloatingToolbar]);

  return (
    <div
      ref={popupCharStylesEditorRef}
      className="bg-background absolute top-0 left-0 flex gap-1 rounded-md border p-1 opacity-0 shadow-md transition-opacity duration-300 will-change-transform"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      {editor.isEditable() && (
        <div className="relative">
          <ToggleGroup
            type="multiple"
            defaultValue={[
              isBold ? "bold" : "",
              isItalic ? "italic" : "",
              isUnderline ? "underline" : "",
              isStrikethrough ? "strikethrough" : "",
              isSubscript ? "subscript" : "",
              isSuperscript ? "superscript" : "",
              isCode ? "code" : "",
              isLink ? "link" : "",
            ]}
          >
            <ToggleGroupItem
              value="copy"
              aria-label="Copy selected text"
              onClick={copySelectedText}
              size="sm"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.16039 8.15844V4.31844C8.16039 3.26244 9.02439 2.39844 10.0804 2.39844H19.6804C20.1896 2.39844 20.678 2.60072 21.038 2.96079C21.3981 3.32086 21.6004 3.80922 21.6004 4.31844V13.9184C21.6004 14.4277 21.3981 14.916 21.038 15.2761C20.678 15.6362 20.1896 15.8384 19.6804 15.8384H15.8404V19.6784C15.8404 20.1877 15.6381 20.676 15.278 21.0361C14.918 21.3962 14.4296 21.5984 13.9204 21.5984H4.32039C3.81117 21.5984 3.32282 21.3962 2.96275 21.0361C2.60268 20.676 2.40039 20.1877 2.40039 19.6784V10.0784C2.40039 9.02244 3.26439 8.15844 4.32039 8.15844H8.16039ZM10.0804 8.15844H13.9204C14.4296 8.15844 14.918 8.36072 15.278 8.72079C15.6381 9.08086 15.8404 9.56922 15.8404 10.0784V13.9184H19.6804V4.31844H10.0804V8.15844ZM4.32039 10.0784V19.6784H13.9204V10.0784H4.32039Z"
                  fill="#087F83"
                />
              </svg>
            </ToggleGroupItem>

            <ToggleGroupItem
              value="paste"
              aria-label="past selected text"
              onClick={pasteFromClipboard}
              size="sm"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.1091 19.853H5.89096V5.88935H7.63642V8.50753H16.3637V5.88935H18.1091M12.0001 4.14389C12.2315 4.14389 12.4535 4.23584 12.6172 4.39951C12.7808 4.56318 12.8728 4.78516 12.8728 5.01662C12.8728 5.24808 12.7808 5.47006 12.6172 5.63373C12.4535 5.7974 12.2315 5.88935 12.0001 5.88935C11.7686 5.88935 11.5466 5.7974 11.3829 5.63373C11.2193 5.47006 11.1273 5.24808 11.1273 5.01662C11.1273 4.78516 11.2193 4.56318 11.3829 4.39951C11.5466 4.23584 11.7686 4.14389 12.0001 4.14389ZM18.1091 4.14389H14.4611C14.0946 3.13153 13.1346 2.39844 12.0001 2.39844C10.8655 2.39844 9.90551 3.13153 9.53896 4.14389H5.89096C5.42804 4.14389 4.98408 4.32779 4.65674 4.65512C4.3294 4.98246 4.14551 5.42642 4.14551 5.88935V19.853C4.14551 20.3159 4.3294 20.7599 4.65674 21.0872C4.98408 21.4145 5.42804 21.5984 5.89096 21.5984H18.1091C18.5721 21.5984 19.016 21.4145 19.3434 21.0872C19.6707 20.7599 19.8546 20.3159 19.8546 19.853V5.88935C19.8546 5.42642 19.6707 4.98246 19.3434 4.65512C19.016 4.32779 18.5721 4.14389 18.1091 4.14389Z"
                  fill="#087F83"
                />
              </svg>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="cut"
              aria-label="cut selected text"
              onClick={cutSelectedText}
              size="lg"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8903 14.1023C16.4268 14.0217 16.9743 14.0577 17.4956 14.208C18.017 14.3582 18.4998 14.619 18.9111 14.9728C19.3225 15.3265 19.6527 15.7647 19.8793 16.2577C20.1059 16.7506 20.2236 17.2866 20.2243 17.8291C20.2235 18.8286 19.8262 19.7869 19.1195 20.4936C18.4127 21.2004 17.4544 21.5977 16.455 21.5984C15.4555 21.5977 14.4972 21.2004 13.7905 20.4936C13.0837 19.7869 12.6864 18.8286 12.6857 17.8291C12.6857 16.6887 13.1955 15.6635 14.0001 14.9727L12.0003 11.9723L10.0005 14.9727C10.413 15.3255 10.7442 15.7636 10.9711 16.2567C11.198 16.7498 11.3153 17.2863 11.315 17.8291C11.3143 18.8286 10.9169 19.7869 10.2102 20.4936C9.50346 21.2004 8.54514 21.5977 7.54568 21.5984C6.54622 21.5977 5.5879 21.2004 4.88118 20.4936C4.17445 19.7869 3.77709 18.8286 3.77637 17.8291C3.77665 17.2865 3.89398 16.7504 4.12036 16.2573C4.34673 15.7642 4.67682 15.3258 5.08809 14.9719C5.49937 14.618 5.98215 14.357 6.50349 14.2067C7.02484 14.0564 7.57247 14.0203 8.10902 14.1009L10.764 10.1178L6.68902 4.00603C6.61237 3.89375 6.55875 3.76738 6.53127 3.63424C6.50379 3.5011 6.50299 3.36382 6.52891 3.23037C6.55484 3.09692 6.60699 2.96993 6.68232 2.85677C6.75766 2.7436 6.85469 2.6465 6.96781 2.57109C7.08093 2.49568 7.20788 2.44345 7.34132 2.41744C7.47475 2.39142 7.61202 2.39213 7.74518 2.41952C7.87835 2.44692 8.00475 2.50045 8.11708 2.57703C8.22941 2.65361 8.32544 2.7517 8.3996 2.86564L15.8903 14.1009V14.1023ZM5.83099 17.8291C5.83099 18.7735 6.59992 19.5424 7.54431 19.5424V19.5411C7.88323 19.5411 8.21454 19.4406 8.49632 19.2522C8.77811 19.0639 8.99771 18.7962 9.12734 18.4831C9.25698 18.17 9.29083 17.8254 9.22461 17.493C9.15839 17.1606 8.99508 16.8553 8.75533 16.6158C8.51558 16.3762 8.21016 16.2131 7.87772 16.1472C7.54528 16.0812 7.20074 16.1154 6.8877 16.2452C6.57465 16.3751 6.30716 16.5949 6.11907 16.8769C5.93097 17.1588 5.83071 17.4902 5.83099 17.8291ZM14.7403 17.8291C14.758 18.2717 14.9462 18.6902 15.2656 18.997C15.585 19.3039 16.0107 19.4753 16.4536 19.4753C16.8965 19.4753 17.3222 19.3039 17.6416 18.997C17.961 18.6902 18.1492 18.2717 18.1669 17.8291C18.1662 17.5535 18.0991 17.2821 17.9714 17.038C17.8436 16.7938 17.6589 16.5839 17.4329 16.4262C17.2069 16.2685 16.9462 16.1675 16.6729 16.1319C16.3996 16.0962 16.1218 16.1269 15.8628 16.2213L15.845 16.2282C15.5205 16.3519 15.2412 16.5712 15.0439 16.857C14.8467 17.1429 14.7408 17.4818 14.7403 17.8291ZM17.0238 2.58192C17.2506 2.73315 17.4081 2.96829 17.4615 3.23562C17.515 3.50294 17.4601 3.78056 17.3089 4.0074L14.4689 8.26604L13.2339 6.41154L15.5983 2.86564C15.6729 2.75304 15.7691 2.65631 15.8812 2.58099C15.9934 2.50568 16.1193 2.45327 16.2518 2.42677C16.3842 2.40028 16.5206 2.40023 16.6531 2.42662C16.7856 2.453 16.9116 2.50532 17.0238 2.58055V2.58192Z"
                  fill="#087F83"
                />
              </svg>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="cut"
              aria-label="cut selected text"
              onClick={setChampDynamique}
              size="lg"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.7378 9.04688H20.8613C21.0572 9.04688 21.245 9.12468 21.3836 9.26318C21.522 9.40167 21.5998 9.58951 21.5998 9.78538V14.2164C21.5998 14.4123 21.522 14.6001 21.3836 14.7386C21.245 14.8771 21.0572 14.9549 20.8613 14.9549H12.7378"
                  stroke="#087F83"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.35342 14.9549H3.13792C2.94205 14.9549 2.75421 14.8771 2.61572 14.7386C2.47722 14.6001 2.39941 14.4123 2.39941 14.2164V9.78538C2.39941 9.58951 2.47722 9.40167 2.61572 9.26318C2.75421 9.12468 2.94205 9.04688 3.13792 9.04688H5.35342"
                  stroke="#087F83"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.56982 5.35156H10.5238"
                  stroke="#087F83"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.56982 18.6445H10.5238"
                  stroke="#087F83"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.04395 5.35156V18.6446"
                  stroke="#087F83"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="link"
              aria-label="insert link selected text"
              onClick={insertLink}
              size="lg"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.7085 6.82831L12.6008 4.93583C14.3851 3.1516 17.2778 3.1516 19.0622 4.93583C20.8464 6.72008 20.8464 9.61289 19.0622 11.3971L17.1698 13.2896"
                  stroke="#087F83"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.2919 17.1683L11.3996 19.0608C9.61533 20.8451 6.72252 20.8451 4.93828 19.0608C3.15404 17.2766 3.15404 14.3837 4.93828 12.5995L6.8306 10.707"
                  stroke="#087F83"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.5841 9.41406L9.41504 14.5831"
                  stroke="#087F83"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="link"
              aria-label="insert link selected text"
              onClick={() => setAddComment(!addComment)}
              size="lg"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.76982 19.1093L3.60059 20.4016L4.89289 16.5246V4.89387C4.89289 4.55112 5.02905 4.22243 5.2714 3.98007C5.51376 3.73772 5.84246 3.60156 6.1852 3.60156H19.1083C19.451 3.60156 19.7798 3.73772 20.0221 3.98007C20.2644 4.22243 20.4006 4.55112 20.4006 4.89387V17.8169C20.4006 18.1597 20.2644 18.4884 20.0221 18.7307C19.7798 18.973 19.451 19.1093 19.1083 19.1093H8.76982Z"
                  stroke="#087F83"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.771 9.41797H16.5248"
                  stroke="#087F83"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.771 13.293H13.9402"
                  stroke="#087F83"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="link"
              aria-label="insert link selected text"
              onClick={() => handleClickSuggestion()}
              onMouseDown={(e) => e.preventDefault()}
              size="lg"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7648 2.20637H8.82374C8.62874 2.20637 8.44172 2.28384 8.30383 2.42173C8.16594 2.55961 8.08848 2.74663 8.08848 2.94164C8.08848 3.13664 8.16594 3.32366 8.30383 3.46154C8.44172 3.59943 8.62874 3.6769 8.82374 3.6769H11.7648C11.9598 3.6769 12.1468 3.75436 12.2847 3.89225C12.4226 4.03014 12.5001 4.21716 12.5001 4.41216V11.5589L11.3457 10.4928C11.2101 10.3658 11.0315 10.2949 10.8457 10.2943H4.41216C4.21716 10.2943 4.03014 10.2168 3.89225 10.0789C3.75436 9.94103 3.6769 9.75401 3.6769 9.559V8.82374C3.6769 8.62874 3.59943 8.44172 3.46154 8.30383C3.32366 8.16594 3.13664 8.08848 2.94164 8.08848C2.74663 8.08848 2.55961 8.16594 2.42173 8.30383C2.28384 8.44172 2.20637 8.62874 2.20637 8.82374V9.559C2.20637 10.144 2.43877 10.7051 2.85243 11.1187C3.2661 11.5324 3.82715 11.7648 4.41216 11.7648H10.559L12.7648 13.7721C12.9004 13.899 13.079 13.9699 13.2647 13.9706C13.3656 13.9695 13.4653 13.9495 13.5588 13.9118C13.6904 13.8544 13.8022 13.7597 13.8806 13.6395C13.959 13.5193 14.0005 13.3788 14 13.2353V4.41216C14 4.12 13.942 3.83075 13.8293 3.56119C13.7166 3.29164 13.5515 3.04716 13.3436 2.84194C13.1356 2.63673 12.889 2.47487 12.6179 2.36576C12.3469 2.25665 12.0569 2.20248 11.7648 2.20637ZM4.83861 7.35322H6.61795C6.81296 7.35322 6.99997 7.27575 7.13786 7.13786C7.27575 6.99997 7.35322 6.81296 7.35322 6.61795V4.83861C7.35377 4.74185 7.33523 4.64593 7.29864 4.55634C7.26205 4.46676 7.20813 4.38528 7.13999 4.31658L3.03722 0.213809C2.89946 0.0768657 2.71311 0 2.51886 0C2.32461 0 2.13826 0.0768657 2.0005 0.213809L0.213809 2.0005C0.0768657 2.13826 0 2.32461 0 2.51886C0 2.71311 0.0768657 2.89946 0.213809 3.03722L4.31658 7.13999C4.38528 7.20813 4.46676 7.26205 4.55634 7.29864C4.64593 7.33523 4.74185 7.35377 4.83861 7.35322ZM2.51518 1.77257L5.88269 5.14007V5.87534H5.14743L1.77257 2.51518L2.51518 1.77257Z"
                  fill="#087F83"
                />
              </svg>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      )}
      {addDynamiqueChamps && (
        <DynamiqueChampsCard
          classname="absolute right-1/2 translate-x-[50%] bottom-[-800%]"
          champs={champ_dynamique}
        />
      )}
      {addComment && (
        <CommentPopup
          classname="absolute right-1/2 translate-x-[50%] bottom-[-300%]"
          setComments={setComments}
          setShow={setAddComment}
        />
      )}
    </div>
  );
}

function useFloatingTextFormatToolbar(
  editor: LexicalEditor,
  anchorElem: HTMLDivElement | null,
  setIsLinkEditMode: Dispatch<boolean>
): JSX.Element | null {
  const [isText, setIsText] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const updatePopup = useCallback(() => {
    editor.getEditorState().read(() => {
      // Should not to pop up the floating toolbar when using IME input
      if (editor.isComposing()) {
        return;
      }
      const selection = $getSelection();
      const nativeSelection = window.getSelection();
      const rootElement = editor.getRootElement();

      // if (
      //   nativeSelection !== null &&
      //   (!$isRangeSelection(selection) ||
      //     rootElement === null ||
      //     !rootElement.contains(nativeSelection.anchorNode))
      // ) {
      //   setIsText(false);
      //   return;
      // }

      if (!$isRangeSelection(selection)) {
        return;
      }

      const node = getSelectedNode(selection);

      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsSubscript(selection.hasFormat("subscript"));
      setIsSuperscript(selection.hasFormat("superscript"));
      setIsCode(selection.hasFormat("code"));

      // Update links
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      if (
        !$isCodeHighlightNode(selection.anchor.getNode()) &&
        selection.getTextContent() !== ""
      ) {
        setIsText($isTextNode(node) || $isParagraphNode(node));
      } else {
        setIsText(false);
      }

      const rawTextContent = selection.getTextContent().replace(/\n/g, "");
      if (!selection.isCollapsed() && rawTextContent === "") {
        setIsText(false);
        return;
      }
    });
  }, [editor]);

  useEffect(() => {
    document.addEventListener("selectionchange", updatePopup);
    return () => {
      document.removeEventListener("selectionchange", updatePopup);
    };
  }, [updatePopup]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => {
        updatePopup();
      }),
      editor.registerRootListener(() => {
        if (editor.getRootElement() === null) {
          setIsText(false);
        }
      })
    );
  }, [editor, updatePopup]);

  if (!isText || !anchorElem) {
    return null;
  }

  return createPortal(
    <FloatingTextFormat
      editor={editor}
      anchorElem={anchorElem}
      isLink={isLink}
      isBold={isBold}
      isItalic={isItalic}
      isStrikethrough={isStrikethrough}
      isSubscript={isSubscript}
      isSuperscript={isSuperscript}
      isUnderline={isUnderline}
      isCode={isCode}
      setIsLinkEditMode={setIsLinkEditMode}
      champ_dynamique={champs_dynamique}
    />,
    anchorElem
  );
}

export function FloatingTextFormatToolbarPlugin({
  anchorElem,
  setIsLinkEditMode,
}: {
  anchorElem: HTMLDivElement | null;
  setIsLinkEditMode: Dispatch<boolean>;
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  return useFloatingTextFormatToolbar(editor, anchorElem, setIsLinkEditMode);
}
