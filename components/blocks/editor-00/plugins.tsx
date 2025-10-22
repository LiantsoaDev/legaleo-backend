import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { BlockFormatDropDown } from "@/components/editor/plugins/toolbar/block-format-toolbar-plugin";
import { FormatBulletedList } from "@/components/editor/plugins/toolbar/block-format/format-bulleted-list";
import { FormatCheckList } from "@/components/editor/plugins/toolbar/block-format/format-check-list";
import { FormatHeading } from "@/components/editor/plugins/toolbar/block-format/format-heading";
import { FormatNumberedList } from "@/components/editor/plugins/toolbar/block-format/format-numbered-list";
import { FormatParagraph } from "@/components/editor/plugins/toolbar/block-format/format-paragraph";
import { FormatQuote } from "@/components/editor/plugins/toolbar/block-format/format-quote";
import { FontFamilyToolbarPlugin } from "@/components/editor/plugins/toolbar/font-family-toolbar-plugin";
import { FontFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/font-format-toolbar-plugin";
import { FontSizeToolbarPlugin } from "@/components/editor/plugins/toolbar/font-size-toolbar-plugin";
import { HistoryToolbarPlugin } from "@/components/editor/plugins/toolbar/history-toolbar-plugin";
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin";
import { Separator } from "@/components/ui/separator";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";

import { useCallback, useState } from "react";

import { AutoLinkPlugin } from "@/components/editor/plugins/auto-link-plugin";
import { AutocompletePlugin } from "@/components/editor/plugins/autocomplete-plugin";
import { FloatingLinkEditorPlugin } from "@/components/editor/plugins/floating-link-editor-plugin";
import { FloatingTextFormatToolbarPlugin } from "@/components/editor/plugins/floating-text-format-plugin";
import { LinkPlugin } from "@/components/editor/plugins/link-plugin";
import { ElementFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/element-format-toolbar-plugin";
import { LinkToolbarPlugin } from "@/components/editor/plugins/toolbar/link-toolbar-plugin";

import { AddTablePopup } from "@/components/Editor/AddTablePopup";
import { DynamiqueChampsCard } from "@/components/Pages/Projet";
import { useTabContext } from "@/hooks/useTabContext";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { INSERT_TABLE_COMMAND } from "@lexical/table";

const champs_dynamique = [
  "Nom franchise",
  "Raison Social",
  "Adresse du siège social",
  "Représentant légal (nom/premon)",
  "Numéro SIRET",
  "Numéro TVA intracommunautaire",
];

export function Plugins({}: {}) {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const [addDynamiqueChamps, setAddDynamiqueChamps] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const [addComment, setAddComment] = useState(false);
  const [comments, setComments] = useState<
    {
      id: string;
      content: string;
    }[]
  >([]);
  const [selectedText, setSelectedText] = useState("");

  const { showTab, setShowTab, handleShowTab } = useTabContext();

  const [showAddTable, setShowAddTable] = useState(false);

  const [editor] = useLexicalComposerContext();

  const insertTable = useCallback(() => {
    // Exemple : insérer un tableau 3x3
    editor.dispatchCommand(INSERT_TABLE_COMMAND, {
      columns: "3",
      rows: "3",
    });
  }, [editor]);

  const getCursorTextPositionAndShowPopup = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const rect = selection.getRangeAt(0).getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY + rect.height, // juste sous le curseur
        left: rect.left + window.scrollX,
      });
      setAddDynamiqueChamps(!addDynamiqueChamps);
    }
  }, [addDynamiqueChamps]);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className="relative pb-10">
      {/* toolbar plugins */}
      <ToolbarPlugin>
        {({ blockType }) => (
          <div className="rounded-full bg-[#E6F2F2] text-[#087F83] vertical-align-middle sticky top-0 z-10 flex gap-5 overflow-auto p-2 mb-5">
            <HistoryToolbarPlugin />
            <Separator
              orientation="vertical"
              className="!h-7 !bg-[#087F83] !border-none"
            />
            <BlockFormatDropDown>
              <FormatParagraph />
              <FormatHeading levels={["h1", "h2", "h3"]} />
              <FormatNumberedList />
              <FormatBulletedList />
              <FormatCheckList />
              <FormatQuote />
            </BlockFormatDropDown>
            <Separator
              orientation="vertical"
              className="!h-7 !bg-[#087F83] !border-none"
            />
            <FontFamilyToolbarPlugin />
            <Separator
              orientation="vertical"
              className="!h-7 !bg-[#087F83] !border-none"
            />
            <FontSizeToolbarPlugin />
            <Separator
              orientation="vertical"
              className="!h-7 !bg-[#087F83] !border-none"
            />
            <FontFormatToolbarPlugin />
            <Separator
              orientation="vertical"
              className="!h-7 !bg-[#087F83] !border-none"
            />
            <ElementFormatToolbarPlugin />
            <Separator
              orientation="vertical"
              className="!h-7 !bg-[#087F83] !border-none"
            />
            <div className="flex flex-row gap-1.5 justify-between items-center">
              <LinkToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
              <svg
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => getCursorTextPositionAndShowPopup()}
              >
                <path
                  d="M11.5884 4.58984H20.1433C20.3496 4.58984 20.5474 4.67178 20.6933 4.81764C20.8391 4.96348 20.921 5.1613 20.921 5.36757V10.0339C20.921 10.2402 20.8391 10.438 20.6933 10.5838C20.5474 10.7297 20.3496 10.8116 20.1433 10.8116H11.5884"
                  stroke="#087F83"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.81108 10.8116H1.47792C1.27165 10.8116 1.07384 10.7297 0.927985 10.5838C0.782133 10.438 0.700195 10.2402 0.700195 10.0339V5.36757C0.700195 5.1613 0.782133 4.96348 0.927985 4.81764C1.07384 4.67178 1.27165 4.58984 1.47792 4.58984H3.81108"
                  stroke="#087F83"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.14453 0.699219H9.25542"
                  stroke="#087F83"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.14453 14.6992H9.25542"
                  stroke="#087F83"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.69971 0.699219V14.6982"
                  stroke="#087F83"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => handleShowTab(showTab, setShowTab, 6)}
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

              {/* <ClearFormattingToolbarPlugin /> */}
            </div>
            {/* 
            <Separator orientation="vertical" className="!h-7" />
            <ElementFormatToolbarPlugin />
            <Separator orientation="vertical" className="!h-7" />
            <div className="flex flex-row gap-1.5">
              <LinkToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
              <ClearFormattingToolbarPlugin />
            </div> */}
            {/* */}
          </div>
        )}
      </ToolbarPlugin>
      <div className="relative shadow rounded-md min-h-screen mt-5 border bg-white">
        <div className="bg-[#E6F2F2] px-1 py-4 rounded-full flex flex-col gap-0 w-fit absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 z-10">
          <div
            className="relative group"
            onClick={() => handleShowTab(showTab, setShowTab, 5)}
          >
            <span className="bg-[#087F83] px-1.5 py-1 rounded-sm text-white font-medium text-sm opacity-0 group-hover:opacity-100 absolute left-1/2 translate-x-[-120%] top-1/2 -translate-y-1/2 whitespace-nowrap">
              Insérer une clause dynamique
            </span>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31.0716 32.3588H18.8573C18.3458 32.3588 17.8552 32.1557 17.4936 31.794C17.1319 31.4323 16.9287 30.9417 16.9287 30.4302C16.9287 29.9188 17.1319 29.4282 17.4936 29.0665C17.8552 28.7048 18.3458 28.5017 18.8573 28.5017H29.7859C30.1268 28.5017 30.4539 28.3662 30.695 28.1251C30.9361 27.884 31.0716 27.557 31.0716 27.216V16.9302C31.0716 16.5892 30.9361 16.2622 30.695 16.0211C30.4539 15.78 30.1268 15.6445 29.7859 15.6445H18.8573C18.3546 15.6444 17.8717 15.8405 17.5114 16.1911C17.1512 16.5417 16.9421 17.0192 16.9287 17.5217V30.3788"
                stroke="#087F83"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M29.7856 28.5V32.3571"
                stroke="#087F83"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="relative group">
            <span className="bg-[#087F83] px-1.5 py-1 rounded-sm text-white font-medium text-sm opacity-0 group-hover:opacity-100 absolute left-1/2 translate-x-[-120%] top-1/2 -translate-y-1/2 whitespace-nowrap">
              Insérer une image
            </span>

            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.7141 31.4275H30.2856C30.9168 31.4275 31.4284 30.9158 31.4284 30.2846V17.7132C31.4284 17.082 30.9168 16.5703 30.2856 16.5703H17.7141C17.083 16.5703 16.5713 17.082 16.5713 17.7132V30.2846C16.5713 30.9158 17.083 31.4275 17.7141 31.4275Z"
                stroke="#087F83"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 31.4289L26.3429 23.5659C26.4455 23.4804 26.5749 23.4336 26.7086 23.4336C26.8422 23.4336 26.9716 23.4804 27.0743 23.5659L31.4286 26.6859"
                stroke="#087F83"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.143 22.8544C22.0898 22.8544 22.8573 22.0868 22.8573 21.1401C22.8573 20.1933 22.0898 19.4258 21.143 19.4258C20.1962 19.4258 19.4287 20.1933 19.4287 21.1401C19.4287 22.0868 20.1962 22.8544 21.143 22.8544Z"
                stroke="#087F83"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            className="relative group"
            onClick={() => setShowAddTable(!showAddTable)}
          >
            <span className="bg-[#087F83] px-1.5 py-1 rounded-sm text-white font-medium text-sm opacity-0 group-hover:opacity-100 absolute left-1/2 translate-x-[-120%] top-1/2 -translate-y-1/2 whitespace-nowrap">
              Insérer un tableau
            </span>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.2856 16.5703H17.7141C17.083 16.5703 16.5713 17.082 16.5713 17.7132V30.2846C16.5713 30.9158 17.083 31.4275 17.7141 31.4275H30.2856C30.9168 31.4275 31.4284 30.9158 31.4284 30.2846V17.7132C31.4284 17.082 30.9168 16.5703 30.2856 16.5703Z"
                stroke="#087F83"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.5713 20H31.4284"
                stroke="#087F83"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24 20V31.4286"
                stroke="#087F83"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.5713 25.7148H31.4284"
                stroke="#087F83"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            className="relative group"
            onClick={() => getCursorTextPositionAndShowPopup()}
          >
            <span className="bg-[#087F83] px-1.5 py-1 rounded-sm text-white font-medium text-sm opacity-0 group-hover:opacity-100 absolute left-1/2 translate-x-[-120%] top-1/2 -translate-y-1/2 whitespace-nowrap">
              Insérer un champs dynamique
            </span>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.8892 20.4453H34.6662C34.9019 20.4453 35.1281 20.539 35.2948 20.7056C35.4614 20.8723 35.5551 21.0984 35.5551 21.3341V26.6671C35.5551 26.9028 35.4614 27.1289 35.2948 27.2956C35.1281 27.4623 34.9019 27.5559 34.6662 27.5559H24.8892"
                stroke="#087F83"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.0006 27.5559H13.3341C13.0984 27.5559 12.8723 27.4623 12.7056 27.2956C12.539 27.1289 12.4453 26.9028 12.4453 26.6671V21.3341C12.4453 21.0984 12.539 20.8723 12.7056 20.7056C12.8723 20.539 13.0984 20.4453 13.3341 20.4453H16.0006"
                stroke="#087F83"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.6675 16H22.2228"
                stroke="#087F83"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.6675 32H22.2228"
                stroke="#087F83"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.4448 16V31.9988"
                stroke="#087F83"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {addDynamiqueChamps && (
          <DynamiqueChampsCard
            champs={champs_dynamique}
            classname={`z-20 !top-[${position.top}px] !left-[${position.left}px]`}
            setShow={setAddDynamiqueChamps}
          />
        )}

        {showAddTable && (
          <AddTablePopup setShow={setShowAddTable} show={showAddTable} />
        )}

        {/* <MenuFlottantEditor /> */}
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="" ref={onRef}>
                <ContentEditable placeholder={"Start typing ..."} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        {/* editor plugins */}
        <HistoryPlugin />
        <TabIndentationPlugin />
        <CheckListPlugin />
        <ClickableLinkPlugin />
        <AutoLinkPlugin />
        <AutocompletePlugin />
        <LinkPlugin />
        <TablePlugin />

        <FloatingTextFormatToolbarPlugin
          anchorElem={floatingAnchorElem}
          setIsLinkEditMode={setIsLinkEditMode}
        />
        <FloatingLinkEditorPlugin
          anchorElem={floatingAnchorElem}
          isLinkEditMode={isLinkEditMode}
          setIsLinkEditMode={setIsLinkEditMode}
        />
      </div>
      {/* actions plugins */}
    </div>
  );
}
