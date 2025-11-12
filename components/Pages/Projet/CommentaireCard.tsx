"use client";
import { Input } from "@/components/Form";
import { Paragraphe } from "@/components/Typography";
import Image from "next/image";
import { useState } from "react";

export const CommentaireCard = () => {
  const [showAnswersInput, setShowAnswersInput] = useState(false);
  return (
    <div className="flex flex-col gap-3 rounded-sm shadow px-3.5 py-3.5">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-1 items-center">
          <Image
            src="../../../app/assets/images/pdp.png"
            alt="pdp"
            width={24}
            height={24}
          />
          <span className="font-bold text-xs text-[#087F83]">
            ID utilisateur
          </span>
        </div>
        <span className="text-[#828282] font-medium text-[10px]">09/10/25</span>
      </div>
      <Paragraphe
        className="font-medium text-xs text-black cursor-pointer"
        onClick={() => setShowAnswersInput(!showAnswersInput)}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Paragraphe>
      {showAnswersInput && (
        <Input
          type="text"
          placeholder="Répondre"
          name="answers"
          classname="!text-xs"
        />
      )}
    </div>
  );
};
