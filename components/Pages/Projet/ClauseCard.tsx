import { Button } from "@/components/Button";
import { DynamicParagraphNode } from "@/components/editor/DynamiqueParagraphNode";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodes } from "lexical";

interface ClauseCardProps {
  clauseName?: string;
  category?: string;
  type?: string;
  contenu?: string;
}

export const ClauseCard = ({
  clauseName,
  category,
  type,
  contenu,
}: ClauseCardProps) => {
  const [editor] = useLexicalComposerContext();

  const addParagraph = () => {
    editor.update(() => {
      const node = new DynamicParagraphNode(contenu ?? "", clauseName ?? "");

      $insertNodes([node]);
    });
  };

  return (
    <div className="flex flex-col gap-3 rounded-sm shadow px-3.5 py-3.5">
      <span className="px-2 py-1 bg-[#E6F2F2] text-[#087F83] font-semibold text-[10px] rounded-xs w-fit">
        {category}
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-black font-semibold">{clauseName}</span>
        <span className="text-xs text-[#828282] font-medium">
          Obligations · {type}
        </span>
      </div>
      <div className="flex flex-row gap-2.5 items-center">
        <Button classname="!w-1/2 !bg-transparent !border !border-[#087F83] !text-[#087F83] !rounded-sm !font-bold !text-[10px]">
          Aperçu
        </Button>
        <Button
          classname="!rounded-sm !bg-[#087F83] !w-1/2 !font-bold !text-[10px] hover:!text-white hover:!border-none"
          onclick={() => addParagraph()}
        >
          Inserer
        </Button>
      </div>
    </div>
  );
};
