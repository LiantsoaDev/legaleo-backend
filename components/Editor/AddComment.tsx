"use client";
import { useEffect } from "react";

interface AddCommentProps {
  setShowCommentPopup: React.Dispatch<React.SetStateAction<boolean>>;
  commentPosition: { top: number; left: number };
  setCommentPosition: React.Dispatch<
    React.SetStateAction<{ top: number; left: number }>
  >;
  selectedText: string;
  setSelectedText: React.Dispatch<React.SetStateAction<string>>;
}

export const AddComment = ({
  setShowCommentPopup,
  commentPosition,
  setCommentPosition,
  selectedText,
  setSelectedText,
}: AddCommentProps) => {
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        setSelectedText(selection.toString());
        setCommentPosition({
          top: rect.top + window.scrollY + rect.height + 8,
          left: rect.left + window.scrollX,
        });
        setShowCommentPopup(true);
      } else {
        setShowCommentPopup(false);
      }
    };

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("keyup", handleSelection);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("keyup", handleSelection);
    };
  }, []);

  return (
    <div
      className="absolute bg-white shadow-lg border border-gray-300 rounded-md p-3 w-64 z-50"
      style={{ top: commentPosition.top, left: commentPosition.left }}
    >
      <p className="text-sm mb-2 text-gray-700">
        Ajouter un commentaire pour :
        <span className="font-medium text-[#087F83] block mt-1">
          “{selectedText}”
        </span>
      </p>
      <textarea
        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#087F83]"
        rows={3}
        placeholder="Écrire un commentaire..."
      ></textarea>
      <div className="flex justify-end mt-2 gap-2">
        <button
          onClick={() => setShowCommentPopup(false)}
          className="text-gray-500 text-sm"
        >
          Annuler
        </button>
        <button
          onClick={() => {
            // ici tu peux stocker le commentaire dans un state global, une DB, etc.
            alert(`Commentaire ajouté pour: "${selectedText}"`);
            setShowCommentPopup(false);
          }}
          className="bg-[#087F83] text-white text-sm px-3 py-1 rounded-md"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};
