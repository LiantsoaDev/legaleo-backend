"use client";
import { RadioGroup, SearchBar } from "@/components/Form";
import { Title } from "@/components/Typography";
import { useState } from "react";
import { ClauseCard } from "./ClauseCard";

const options = ["Tous", "Contrat de franchise"];

export const Clause = () => {
  const [showClauseLegaleo, setShowClauseLegaleo] = useState(false);
  return (
    <div className="flex flex-col gap-0">
      <div className="flex justify-between items-center p-5 border-b border-gray">
        <Title className="font-bold text-base text-black" level={3}>
          Clauses
        </Title>
      </div>
      <div className="px-5 py-5">
        <div className="flex flex-row items-center gap-0">
          <div
            className={`w-1/2 py-3 font-semibold text-sm text-black text-center cursor-pointer ${
              showClauseLegaleo ? "" : "border-b-2 border-b-[#62E7EB]"
            }`}
            onClick={() => setShowClauseLegaleo(false)}
          >
            Mes clauses
          </div>
          <div
            className={`w-1/2 py-3 font-semibold text-sm text-black text-center cursor-pointer ${
              showClauseLegaleo ? "border-b-2 border-b-[#62E7EB]" : ""
            }`}
            onClick={() => setShowClauseLegaleo(true)}
          >
            Clauses Legaleo
          </div>
        </div>
        {showClauseLegaleo ? (
          ""
        ) : (
          <div className="flex flex-col gap-5 py-5">
            <SearchBar
              classname="w-full !shadow-none border"
              placeholder="Rechercher une clause"
            />
            <RadioGroup
              options={options}
              name="autorise_relecture"
              classContainer="flex gap-2.5 flex-nowrap justify-start"
              classLabel="!py-2 text-xs bg-[#F2F8F8] text-[#86A2A3] border-none"
              classSelected="!bg-[#86A2A3]"
            />
            <div className="flex flex-col gap-5">
              <ClauseCard />
              <ClauseCard />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
