"use client";
import { Title } from "@/components/Typography";
import { useState } from "react";
import { ModeDiriger } from "./ModeDiriger";
import { ModeLibre } from "./ModeLIbre";

export const Generer = () => {
  const [isFreeMode, setIsFreeMode] = useState(false);
  return (
    <div className="py-12 flex flex-col gap-10">
      <div className="flex flex-col gap-5 items-center">
        <svg
          width="70"
          height="70"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="36" height="36" rx="18" fill="#62E7EB" />
          <path
            d="M19.4314 9.73291C18.5559 9.18571 17.4449 9.18571 16.5694 9.73291L11.1694 13.1079C10.38 13.6013 9.90039 14.4666 9.90039 15.3975V20.6022C9.90039 21.5332 10.38 22.3984 11.1694 22.8918L16.5694 26.2668C17.4449 26.814 18.5559 26.814 19.4314 26.2668L24.8314 22.8918C25.6208 22.3984 26.1004 21.5332 26.1004 20.6022V15.3975C26.1004 14.4666 25.6208 13.6013 24.8314 13.1079L19.4314 9.73291Z"
            fill="white"
            stroke="white"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </svg>
        <Title
          level={2}
          className="text-4xl font-manrope font-semibold text-black"
        >
          Génération assistée par IA
        </Title>
      </div>
      <div className="flex flex-col justify-center w-full">
        <div className="flex gap-0 items-center w-5xl mx-auto my-0">
          <div
            className={`w-1/2 py-3 text-center border-b-2 cursor-pointer font-semibold ${
              isFreeMode ? "border-[#62E7EB]" : "border-[#E3E3E3]"
            } `}
            onClick={() => setIsFreeMode(true)}
          >
            Mode libre
          </div>
          <div
            className={`w-1/2 py-3 text-center border-b-2 cursor-pointer font-semibold ${
              isFreeMode ? "border-[#E3E3E3]" : "border-[#62E7EB]"
            } `}
            onClick={() => setIsFreeMode(false)}
          >
            Mode dirigé
          </div>
        </div>
        {isFreeMode ? <ModeLibre /> : <ModeDiriger />}
      </div>
    </div>
  );
};
