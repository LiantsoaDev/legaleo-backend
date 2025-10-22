"use client";
import pdp from "@/assets/images/pdp.png";
import { Input } from "@/components/Form";
import { Paragraphe } from "@/components/Typography";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, LexicalEditor } from "lexical";
import Image from "next/image";

export const RecommandationJuridiqueCard = () => {
  const [editor] = useLexicalComposerContext();

  function replaceSelectedText(editor: LexicalEditor, newText: string) {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        // Supprime la sélection actuelle
        selection.insertText(newText);
      }
    });
  }

  return (
    <div className="hover:bg-[#F2F2F2] px-5 py-2.5 w-full cursor-pointer">
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
              onClick={() =>
                replaceSelectedText(
                  editor,
                  `X_AE_B-22's pursuit leads it to the subterranean depths of the city, where forgotten tunnels and abandoned cyber-labs hide secrets long buried by time…” par “The city, a kaleidoscope of digital billboards and holographic projections, is in a state ...`
                )
              }
            />
            <FontAwesomeIcon
              icon={faXmark}
              className="text-|#828282] text-xl px-1.5 py-2 hover:bg-[#F2F2F2] cursor-pointer"
            />
          </div>
        </div>
        <Paragraphe className="font-medium text-xs text-black">
          <span className="font-bold">Remplacer</span> : “X_AE_B-22's pursuit
          leads it to the subterranean depths of the city, where forgotten
          tunnels and abandoned cyber-labs hide secrets long buried by time…”
          par “The city, a kaleidoscope of digital billboards and holographic
          projections, is in a state ...”
        </Paragraphe>
        <Input
          type="text"
          placeholder="Répondre"
          name="repondre"
          classname="!rounded-full !bg-[#F2F2F2] !text-[#828282] !text-xs"
          isrequired={false}
        />
      </div>
    </div>
  );
};
