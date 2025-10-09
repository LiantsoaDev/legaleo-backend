"use client";
import { SearchBar } from "@/components/Form";
import { Title } from "@/components/Typography";
import { useState } from "react";
import { CommentaireCard } from "./CommentaireCard";

export const Commentaire = () => {
  const [showCommentaireExterne, setshowCommentaireExterne] = useState(false);
  return (
    <div className="flex flex-col gap-0">
      <div className="flex justify-between items-center p-5 border-b border-gray">
        <Title className="font-bold text-base text-black" level={3}>
          Commentaires
        </Title>
      </div>
      <div className="px-5 py-5">
        <div className="flex flex-row items-center gap-0">
          <div
            className={`w-1/2 py-3 font-semibold text-sm text-black text-center cursor-pointer ${
              showCommentaireExterne ? "" : "border-b-2 border-b-[#62E7EB]"
            }`}
            onClick={() => setshowCommentaireExterne(false)}
          >
            Internes
          </div>
          <div
            className={`w-1/2 py-3 font-semibold text-sm text-black text-center cursor-pointer ${
              showCommentaireExterne ? "border-b-2 border-b-[#62E7EB]" : ""
            }`}
            onClick={() => setshowCommentaireExterne(true)}
          >
            Externes
          </div>
        </div>
        {showCommentaireExterne ? (
          ""
        ) : (
          <div className="flex flex-col gap-5 py-5">
            <SearchBar
              classname="w-full !shadow-none border"
              placeholder="Rechercher..."
            />
            <div className="flex flex-col gap-5">
              <CommentaireCard />
              <CommentaireCard />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
