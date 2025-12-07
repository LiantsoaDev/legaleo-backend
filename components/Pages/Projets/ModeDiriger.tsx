"use client";

import { Button } from "@/components/Button";
import { Input, SearchBar, Select } from "@/components/Form";
import { Paragraphe } from "@/components/Typography";
import { useEffect, useState } from "react";

interface ContractType {
  id: string;
  name: string;
}

export const ModeDiriger = () => {
  const [contractTypes, setContractTypes] = useState<ContractType[]>([]);
  const [selectedContractType, setSelectedContractType] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContractTypes = async () => {
      try {
        const response = await fetch("/api/contract-types");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des types de contrats");
        }
        const data = await response.json();
        setContractTypes(data);
      } catch (error) {
        console.error("Erreur lors du chargement des types de contrats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContractTypes();
  }, []);

  return (
    <div className="w-5xl mx-auto my-0 flex flex-col gap-5 py-7">
      <Paragraphe className="text-left text-lg text-[#828282] font-medium">
        Complétez les champs suivant et laissez l’intelligence artificielle
        générez le contrat pour vous
      </Paragraphe>
      <form action="" className="flex flex-col gap-5">
        <div className="flex flex-row w-full gap-5 items-center">
          <div className="w-1/2 flex flex-col gap-2">
            <label className="form-label font-manrope text-sm font-semibold">
              Type de contrat
            </label>
            {isLoading ? (
              <div className="w-full border border-gray rounded-md px-8 py-5 bg-gray-100 animate-pulse">
                Chargement...
              </div>
            ) : (
              <Select
                id="type_contrat"
                name="type_contrat"
                options={contractTypes.map((type) => type.name)}
                defaultValue="Sélectionnez un type de contrat"
                classname="w-full"
                onChange={(value) => setSelectedContractType(value)}
              />
            )}
          </div>
          <Input
            type="text"
            name="duree_contrat"
            placeholder=""
            label="Durée"
            classname="w-1/2"
          />
        </div>
        <div className="flex flex-row w-full gap-5 items-center">
          <Input
            type="text"
            name="juridiction"
            placeholder=""
            label="Juridiction"
            classname="w-1/2"
          />
          <Input
            type="text"
            name="clause_specifique"
            placeholder=""
            label="Clause spécifique"
            classname="w-1/2"
          />
        </div>
        <div className="flex flex-row w-full gap-5 items-center">
          <Input
            type="text"
            name="nom_document"
            placeholder=""
            label="Nom du document"
            classname="w-full"
          />
        </div>
        <div className="flex flex-col w-full gap-2 mb-5">
          <label className="form-label font-manrope text-sm font-semibold">
            Cocontractant
          </label>
          <SearchBar
            classname="w-full rounded-xs !shadow-none border border-gray"
            placeholder="Rechercher"
          />
        </div>
        <Button
          type="submit"
          isLink
          href="/projets/1"
          classname="w-fit mx-auto rounded-sm !bg-[#087F83] !text-sm !font-semibold hover:!border-none hover:!text-white cursor-pointer hover:opacity-85"
        >
          Commencer 🚀
        </Button>
      </form>
    </div>
  );
};
