"use client";
import { Input } from "../../Form";
import { Paragraphe, Title } from "../../Typography";
import { Notices } from "../../Typography/Tips";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "@/lib/hook";
import { updateFormData } from "@/lib/features/slice/onboardingSlice";
import {
  setWorkspaceData,
  setWorkspaceSpaces,
} from "@/lib/features/slice/workspaceSlice";
import { useOnboardingFormData } from "./OnboardingFormContext";
import { useDebounce } from "@/hooks/use-debounce";
import { resolveWorkspaceName } from "@/utils/functions";
import { DataInfogreffeResponse } from "@/utils/functions/dataInfogreffe";

export const VotreEnseigne = ({}) => {
  const dispatch = useAppDispatch();
  const onboardingFormData = useOnboardingFormData();

  const initialSiret = useMemo(
    () => (typeof onboardingFormData?.siret === "string" ? onboardingFormData.siret : ""),
    [onboardingFormData?.siret]
  );
  const initialBrand = useMemo(
    () =>
      typeof onboardingFormData?.brandName === "string"
        ? onboardingFormData.brandName
        : "",
    [onboardingFormData?.brandName]
  );
  const [siret, setSiret] = useState(initialSiret);
  const [brandName, setBrandName] = useState(initialBrand);
  const [companyName, setCompanyName] = useState<string | null>(
    (onboardingFormData?.companyName as string | null) ?? null
  );
  const [workspaceName, setWorkspaceName] = useState<string | null>(
    (onboardingFormData?.workspaceName as string | null) ?? null
  );
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSiret = useDebounce(siret, 500);

  useEffect(() => {
    dispatch(updateFormData({ siret }));
  }, [dispatch, siret]);

  useEffect(() => {
    const spaces = brandName ? [brandName] : [];
    dispatch(
      updateFormData({
        brandName,
        workspaceSpaces: spaces,
        currentWorkspaceSpace: brandName || null,
      })
    );
    dispatch(setWorkspaceSpaces({ spaces, currentSpace: brandName || undefined }));
  }, [brandName, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedSiret || debouncedSiret.length < 9) return;
      setIsLoading(true);
      setApiError(null);

      try {
        const response = await fetch(
          `/api/datainfogreffe/repartition-capital?siret=${debouncedSiret}`
        );

        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(
            payload?.error ?? "Impossible de récupérer les informations de l'entreprise."
          );
        }

        const data = (await response.json()) as DataInfogreffeResponse;
        const { workspaceName, companyName, shareholder } = resolveWorkspaceName(data);

        if (!workspaceName && !companyName) {
          throw new Error(
            "Impossible d'interpréter la réponse de DataInfogreffe."
          );
        }

        setCompanyName(companyName ?? null);
        setWorkspaceName(workspaceName ?? companyName ?? null);

        dispatch(
          updateFormData({
            companyName: companyName ?? null,
            workspaceName: workspaceName ?? companyName ?? null,
            shareholderName: shareholder?.denomination ?? null,
            shareholderSiren: shareholder?.siren ?? null,
          })
        );

        dispatch(
          setWorkspaceData({
            workspaceName: workspaceName ?? companyName ?? undefined,
            companyName: companyName ?? null,
            shareholderName: shareholder?.denomination ?? null,
            shareholderSiren: shareholder?.siren ?? null,
          })
        );
      } catch (error: any) {
        setApiError(error?.message ?? "Une erreur inconnue est survenue.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [debouncedSiret, dispatch]);

  const handleSiretChange = (value: string) => {
    const sanitized = value.replace(/\D/g, "").slice(0, 14);
    setSiret(sanitized);
  };

  const handleBrandChange = (value: string) => {
    setBrandName(value);
  };

  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
        Votre enseigne
      </Title>
      <Paragraphe className="font-medium text-xl">
        Renseignez votre SIRET afin que l’on puisse retrouver votre entreprise et
        renseigner automatiquement vos informations.
      </Paragraphe>
      <div className="flex flex-col gap-5">
        <Input
          type="text"
          placeholder="Numéro SIRET (14 chiffres)"
          name="siret"
          classname="text-xl px-6 py-4 w-full"
          defaultValue={initialSiret}
          onChange={(e) => handleSiretChange(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Nom de votre marque"
          name="brandName"
          classname="text-xl px-6 py-4 w-full"
          defaultValue={initialBrand}
          onChange={(e) => handleBrandChange(e.target.value)}
        />
      </div>
      {isLoading && (
        <Paragraphe className="text-sm text-gray">
          Recherche des informations de votre entreprise...
        </Paragraphe>
      )}
      {apiError && (
        <span className="text-danger text-sm md:text-lg lg:text-sm mt-1">
          {apiError}
        </span>
      )}
      {(companyName || workspaceName) && !apiError && (
        <div className="mt-2 bg-[#F6F6F6] rounded-md p-4 flex flex-col gap-2">
          {companyName && (
            <Paragraphe className="text-base text-black">
              Société identifiée : <strong>{companyName}</strong>
            </Paragraphe>
          )}
          {workspaceName && (
            <Paragraphe className="text-base text-black">
              Workspace proposé : <strong>{workspaceName}</strong>
            </Paragraphe>
          )}
        </div>
      )}
      <Notices classname="mt-5 !text-xl">
        Indiquez ici le nom de votre marque. Cela nous permettra de
        personnaliser vos modèles de contrat.
      </Notices>
    </div>
  );
};
