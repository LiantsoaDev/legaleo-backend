"use client";
import { Button } from "@/components/Button";
import { Filter, SearchBar } from "@/components/Form";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ClauseCard } from "./ClauseCard";
import { ImportClause } from "./ImportClause";

export const ClauseDynamique = () => {
  const [showListView, setShowListView] = useState(false);
  const [importClause, setImportClause] = useState(false);
  return (
    <div className="flex flex-col gap-7">
      <SearchBar classname="border !border-[#E3E3E3] w-1/2 mb-2" />
      <div className="flex justify-between gap-2">
        <Filter
          setShowListView={setShowListView}
          showListView={showListView}
          hasListFilter={false}
        />
        <Button
          classname="flex gap-1 items-center justify-center py-2 rounded-sm !bg-black !text-white !text-xs hover:border-none cursor-pointer hover:opacity-85 transition-all duration-300"
          onclick={() => setImportClause(true)}
        >
          <FontAwesomeIcon icon={faPlus} /> Importer une clause
        </Button>
      </div>
      <div
        className="flex flex-col gap-5 "
        onClick={() => setImportClause(false)}
      >
        <ClauseCard />
        <ClauseCard />
        <ClauseCard />
        <ClauseCard />
        <ClauseCard />
      </div>
      {importClause && <ImportClause />}
    </div>
  );
};
