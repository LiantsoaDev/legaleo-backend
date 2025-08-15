"use client";
import { Button } from "@/components/Button";
import { Navigateur } from "@/components/Fichier";
import { Filter, SearchBar } from "@/components/Form";
import { Title } from "@/components/Typography";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ContratDetails } from "./ContratDetails";
import { FilterView } from "./FilterView";
import { Tables } from "./Tables";

export const Contratheque = () => {
  const [showListView, setShowListView] = useState(false);
  const [selectedContrat, setSelectedContrat] = useState<any>(null);
  return (
    <>
      <div className="flex flex-col gap-8 select-none">
        <Title className="font-semibold text-2xl">Contrathèque</Title>
        <div className="flex flex-row gap-0">
          <div className="w-1/5 py-0 border-r border-r-gray fill-available pr-3.5">
            <Navigateur />
            <div className="h-[1px] bg-gray w-full mt-8" />
            <FilterView />
            <div className="h-0.5 bg-gray w-full mt-8 mb-8" />
            <div className="flex flex-row gap-3.5 items-center text-[#86A2A3] px-2.5 py-3 cursor-pointer">
              <FontAwesomeIcon icon={faTrashAlt} className="text-2xl" />
              Corbeille
            </div>
          </div>
          <div className="w-4/5 flex flex-col px-7 gap-6">
            <div className="flex items-center justify-between">
              <SearchBar classname="border-gray border !shadow-none !w-1/2" />
              <Button classname="flex gap-2 items-center !py-3 !text-sm justify-center !font-semibold rounded-md !bg-primary !text-black hover:border-none cursor-pointer hover:opacity-85 transition-all duration-300">
                <FontAwesomeIcon icon={faPlus} /> Créer un contrat
              </Button>
            </div>
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
        </div>
        {selectedContrat && (
          <ContratDetails
            contrat={selectedContrat}
            setSelectedContrat={setSelectedContrat}
          />
        )}
      </div>
    </>
  );
};
