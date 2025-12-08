"use client";

import { Button } from "@/components/Button";
import { Input, SearchBar, Select } from "@/components/Form";
import { Paragraphe } from "@/components/Typography";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hook";
import { useSession } from "next-auth/react";
import { FullLoader } from "@/components/Loader";
import { toast } from "react-toastify";

interface ContractType {
  id: string;
  name: string;
}

export const ModeDiriger = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { id: userId } = useAppSelector((state) => state.user);
  
  const [contractTypes, setContractTypes] = useState<ContractType[]>([]);
  const [selectedContractTypeId, setSelectedContractTypeId] = useState<string>("");
  const [formData, setFormData] = useState({
    duration: "",
    jurisdiction: "",
    specificClause: "",
    documentName: "",
    cocontractantId: null as string | null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

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
        toast.error("Erreur lors du chargement des types de contrats");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContractTypes();
  }, []);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContractTypeChange = (value: string) => {
    // Trouver l'ID du type de contrat sélectionné
    const selectedType = contractTypes.find((type) => type.name === value);
    if (selectedType) {
      setSelectedContractTypeId(selectedType.id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier que tous les champs requis sont remplis
    if (!selectedContractTypeId || !formData.documentName) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Récupérer l'ID de l'utilisateur
    const effectiveUserId = userId || session?.user?.id;
    if (!effectiveUserId) {
      toast.error("Vous devez être connecté pour générer un contrat");
      return;
    }

    setIsGenerating(true);

    try {
      // Créer le contrat
      const createResponse = await fetch("/api/contracts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: effectiveUserId,
          contractTypeId: selectedContractTypeId,
          name: formData.documentName,
          duration: formData.duration || null,
          jurisdiction: formData.jurisdiction || null,
          specificClause: formData.specificClause || null,
          cocontractantId: formData.cocontractantId,
        }),
      });

      if (!createResponse.ok) {
        const errorData = await createResponse.json();
        throw new Error(errorData.error || "Erreur lors de la création du contrat");
      }

      const { contract } = await createResponse.json();
      const contractId = contract.id;

      // Générer le contrat
      const generateResponse = await fetch("/api/contracts/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contractId,
          userId: effectiveUserId,
        }),
      });

      if (!generateResponse.ok) {
        const errorData = await generateResponse.json();
        throw new Error(errorData.error || "Erreur lors de la génération du contrat");
      }

      // Rediriger vers la page du projet
      router.push(`/projets/${contractId}`);
    } catch (error) {
      console.error("Erreur lors de la génération du contrat:", error);
      toast.error(
        error instanceof Error ? error.message : "Erreur lors de la génération du contrat"
      );
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="w-5xl mx-auto my-0 flex flex-col gap-5 py-7 items-center justify-center min-h-[400px]">
        <FullLoader />
        <Paragraphe className="text-center text-lg text-[#828282] font-medium">
          Génération du contrat en cours... Cela peut prendre quelques instants.
        </Paragraphe>
      </div>
    );
  }

  return (
    <div className="w-5xl mx-auto my-0 flex flex-col gap-5 py-7">
      <Paragraphe className="text-left text-lg text-[#828282] font-medium">
        Complétez les champs suivant et laissez l'intelligence artificielle
        générez le contrat pour vous
      </Paragraphe>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-row w-full gap-5 items-center">
          <div className="w-1/2 flex flex-col gap-2">
            <label className="form-label font-manrope text-sm font-semibold">
              Type de contrat *
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
                onChange={handleContractTypeChange}
              />
            )}
          </div>
          <Input
            type="text"
            name="duration"
            placeholder=""
            label="Durée"
            classname="w-1/2"
            value={formData.duration}
            onChange={(e) => handleInputChange("duration", e.target.value)}
          />
        </div>
        <div className="flex flex-row w-full gap-5 items-center">
          <Input
            type="text"
            name="jurisdiction"
            placeholder=""
            label="Juridiction"
            classname="w-1/2"
            value={formData.jurisdiction}
            onChange={(e) => handleInputChange("jurisdiction", e.target.value)}
          />
          <Input
            type="text"
            name="specificClause"
            placeholder=""
            label="Clause spécifique"
            classname="w-1/2"
            value={formData.specificClause}
            onChange={(e) => handleInputChange("specificClause", e.target.value)}
          />
        </div>
        <div className="flex flex-row w-full gap-5 items-center">
          <Input
            type="text"
            name="documentName"
            placeholder=""
            label="Nom du document *"
            classname="w-full"
            value={formData.documentName}
            onChange={(e) => handleInputChange("documentName", e.target.value)}
            isrequired
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
          classname="w-fit mx-auto rounded-sm !bg-[#087F83] !text-sm !font-semibold hover:!border-none hover:!text-white cursor-pointer hover:opacity-85"
          isdisabled={isGenerating || !selectedContractTypeId || !formData.documentName}
        >
          Commencer 🚀
        </Button>
      </form>
    </div>
  );
};
