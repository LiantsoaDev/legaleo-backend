import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { useEffect } from "react";
import { Button } from "../Button";
import { Input } from "../Form";

interface CommentPopupProps {
  classname?: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  comments?: { id: string; content: string };
  setComments: React.Dispatch<
    React.SetStateAction<{ id: string; content: string }[]>
  >;
}

export const CommentPopup = ({
  classname,
  setShow,
  comments,
  setComments,
}: CommentPopupProps) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {}, [comments]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const selectedText = selection.getTextContent();
        setComments((prev) => [
          ...prev!,
          {
            id: Math.random().toString(36).substring(2, 9),
            content: selectedText,
          },
        ]);
        alert("Commentaire enregistré !");
        setShow(false);
      }
    });
  };

  return (
    <form
      className={`flex flex-col gap-2.5 p-3.5 bg-white border border-[#E3E3E3] rounded-sm w-[298px] shadow ${classname}`}
      onSubmit={(e) => handleAddComment(e)}
    >
      <div className="flex gap-1 items-center">
        <span className="flex flex-col justify-center items-center rounded-full bg-[#E6F2F2] w-6 h-6 text-[#087F83] font-bold text-sm uppercase">
          a
        </span>
        <span className="font-bold text-xs text-[#087F83]">ID utilisateur</span>
      </div>
      <Input
        type="text"
        name="commentaire"
        placeholder="Tapez un commentaire et assignez avec @"
        classname="!rounded-full !text-xs !font-medium !bg-[#F2F2F2]"
        isrequired={false}
        onChange={(e) =>
          setComments((prev) => [
            ...prev!,
            {
              id: Math.random().toString(36).substring(2, 9),
              content: e.target.value,
            },
          ])
        }
      />
      <div className="w-full flex flex-row gap-2.5 items-center justify-end">
        <Button
          classname="!text-[#087F83] !text-xs !font-semibold w-fit"
          href="#"
        >
          Annuler
        </Button>
        <Button
          type="submit"
          classname="!w-fit !px-2.5 !py-1.5 !bg-[#087F83] !text-xs !font-semibold !text-white hover:!border-none"
        >
          Commenter
        </Button>
      </div>
    </form>
  );
};
