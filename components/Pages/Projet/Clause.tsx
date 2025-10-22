"use client";
import { RadioGroup, SearchBar } from "@/components/Form";
import { Title } from "@/components/Typography";
import { useState } from "react";
import { ClauseCard } from "./ClauseCard";

const options = ["Tous", "Contrat de franchise"];

const clauseDynamiques = [
  {
    clauseName: "Clause de non-concurrence",
    category: "Contrat de franchise",
    type: "Pour Franchiseur",
    contenu:
      "X_AE_B-22's pursuit leads it to the subterranean depths of the city, where forgotten tunnels and abandoned cyber-labs hide secrets long buried by time. Each step forward unravels more of the intricate web spun by the Shadow Code, revealing a plot to seize control of the entire megacity.",
  },
  {
    clauseName: "Clause de non-concurrence",
    category: "Contrat de franchise",
    type: "Pour Franchiseur",
    contenu:
      "X_AE_B-22's pursuit leads it to the subterranean depths of the city, where forgotten tunnels and abandoned cyber-labs hide secrets long buried by time. Each step forward unravels more of the intricate web spun by the Shadow Code, revealing a plot to seize control of the entire megacity.",
  },
];

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
              {clauseDynamiques.map((clause, index) => (
                <ClauseCard
                  clauseName={clause.clauseName}
                  category={clause.category}
                  type={clause.type}
                  contenu={clause.contenu}
                  key={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
