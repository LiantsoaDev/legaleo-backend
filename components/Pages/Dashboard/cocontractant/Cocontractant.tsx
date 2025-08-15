"use client";
import { Filter, SearchBar } from "@/components/Form";
import { Title } from "@/components/Typography";
import { useState } from "react";
import { Tables } from "./Tables";

export const Cocontractant = () => {
  const [selectedContrat, setSelectedContrat] = useState<any>(null);
  const [showListView, setShowListView] = useState(false);
  return (
    <div className="flex flex-col gap-7">
      <Title className="font-semibold text-2xl mb-9">Contrathèque</Title>
      <SearchBar classname="border !border-[#E3E3E3] w-1/2 mb-6" />
      <Filter
        setShowListView={setShowListView}
        showListView={showListView}
        hasListFilter={false}
      />
      <Tables
        selectedContrat={selectedContrat}
        setSelectedContrat={setSelectedContrat}
      />
    </div>
  );
};
