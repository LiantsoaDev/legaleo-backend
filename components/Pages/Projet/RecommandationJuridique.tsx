"use client";
import { Title } from "@/components/Typography";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { RecommandationIA } from "./RecommandationIA";
import { RecommandationJuridiqueCard } from "./RecommandationJuridiqueCard";

export const RecommandationJuridique = () => {
  const [showRecommandationJuridique, setShowRecommandationJuridique] =
    useState(false);
  const [showRecommandationIA, setShowRecommandationIA] = useState(false);
  return (
    <div className="h-4/5 overflow-y-auto">
      <Title
        className="font-bold text-base text-black p-5 border-b border-gray"
        level={3}
      >
        Recommandations juridique
      </Title>
      <div className="flex flex-col gap-5 shadow">
        <div className="flex flex-row justify-between items-center cursor-pointer px-5 py-5">
          <div
            className="flex flex-col gap-2.5"
            onClick={() =>
              setShowRecommandationJuridique(!showRecommandationJuridique)
            }
          >
            <Title className="font-semibold text-sm text-black">
              Recommandations avocats
            </Title>
            <span className="rounded-full bg-[#F2F2F2] px-1.5 py-0.5 text-[#828282] font-semibold text-[10px] w-fit">
              0/6 traitées
            </span>
          </div>
          <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
        </div>
        {showRecommandationJuridique && (
          <div className="">
            <RecommandationJuridiqueCard />
            <RecommandationJuridiqueCard />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-5 shadow">
        <div className="flex flex-row justify-between items-center cursor-pointer px-5 py-5">
          <div
            className="flex flex-col gap-2.5"
            onClick={() => setShowRecommandationIA(!showRecommandationIA)}
          >
            <Title className="font-semibold text-sm text-black">
              Recommendation par l’IA
            </Title>
            <span className="rounded-full bg-[#F2F2F2] px-1.5 py-0.5 text-[#828282] font-semibold text-[10px] w-fit">
              0/6 traitées
            </span>
          </div>
          <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
        </div>
        {showRecommandationIA && (
          <div className="">
            <RecommandationIA />
          </div>
        )}
      </div>
    </div>
  );
};
