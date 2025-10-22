"use client";
import { onboardingData } from "@/utils/data/data";
import {
  faLongArrowLeft,
  faLongArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { OnboardingCard } from "../../Card";
import { Activite } from "./Activite";
import { Documents } from "./Documents";
import { Finalisation } from "./Finalisation";
import { NombreReseau } from "./NombreReseau";
import { Relecture } from "./Relecture";
import { ReseauFranchise } from "./ReseauFranchise";
import { TypeReseau } from "./TypeReseau";
import { UserName } from "./UserName";
import { Welcome } from "./Welcome";

type DocumentKey = "status_entreprise" | "kbis" | "pacte_associe";

interface InitialUserData {
  firstName?: string | null;
  lastName?: string | null;
}

interface SavedDocumentMeta {
  id: string;
  name: DocumentKey;
  originalName: string;
  path: string;
}

interface SavedOnboardingData {
  firstName?: string | null;
  lastName?: string | null;
  networkName?: string | null;
  networkActivity?: string | null;
  franchiseeCount?: string[] | null;
  networkType?: string | null;
  networkTypeOther?: string | null;
  legalSupportPreference?: string | null;
  documents?: SavedDocumentMeta[];
}

interface OnboardingProps {
  initialUser?: InitialUserData;
  savedOnboarding?: SavedOnboardingData | null;
}

interface FormState {
  firstName: string;
  lastName: string;
  networkName: string;
  networkActivity: string;
  franchiseeCount: string[];
  networkType: string;
  networkTypeOther: string;
  legalSupportPreference: string;
  documents: Record<DocumentKey, File | null>;
  documentNames: Partial<Record<DocumentKey, string>>;
}

const createEmptyDocumentsState = (): Record<DocumentKey, File | null> => ({
  status_entreprise: null,
  kbis: null,
  pacte_associe: null,
});

export const Onboarding = ({
  initialUser,
  savedOnboarding,
}: OnboardingProps) => {
  const [onboardingStep, setOnboardingStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(
    Boolean(savedOnboarding)
  );

  const initialDocumentNames = useMemo(() => {
    const names: Partial<Record<DocumentKey, string>> = {};
    savedOnboarding?.documents?.forEach((doc) => {
      if (doc.name) {
        names[doc.name] = doc.originalName;
      }
    });
    return names;
  }, [savedOnboarding]);

  const [formState, setFormState] = useState<FormState>(() => ({
    firstName:
      savedOnboarding?.firstName ?? initialUser?.firstName ?? "",
    lastName: savedOnboarding?.lastName ?? initialUser?.lastName ?? "",
    networkName: savedOnboarding?.networkName ?? "",
    networkActivity: savedOnboarding?.networkActivity ?? "",
    franchiseeCount: savedOnboarding?.franchiseeCount ?? [],
    networkType: savedOnboarding?.networkType ?? "",
    networkTypeOther: savedOnboarding?.networkTypeOther ?? "",
    legalSupportPreference: savedOnboarding?.legalSupportPreference ?? "",
    documents: createEmptyDocumentsState(),
    documentNames: { ...initialDocumentNames },
  }));

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      firstName:
        savedOnboarding?.firstName ?? initialUser?.firstName ?? prev.firstName,
      lastName:
        savedOnboarding?.lastName ?? initialUser?.lastName ?? prev.lastName,
      networkName: savedOnboarding?.networkName ?? prev.networkName,
      networkActivity: savedOnboarding?.networkActivity ?? prev.networkActivity,
      franchiseeCount: savedOnboarding?.franchiseeCount ?? prev.franchiseeCount,
      networkType: savedOnboarding?.networkType ?? prev.networkType,
      networkTypeOther:
        savedOnboarding?.networkTypeOther ?? prev.networkTypeOther,
      legalSupportPreference:
        savedOnboarding?.legalSupportPreference ?? prev.legalSupportPreference,
      documentNames: { ...initialDocumentNames },
    }));
    setHasSubmitted(Boolean(savedOnboarding));
  }, [
    initialUser?.firstName,
    initialUser?.lastName,
    savedOnboarding?.firstName,
    savedOnboarding?.lastName,
    savedOnboarding?.networkName,
    savedOnboarding?.networkActivity,
    savedOnboarding?.franchiseeCount,
    savedOnboarding?.networkType,
    savedOnboarding?.networkTypeOther,
    savedOnboarding?.legalSupportPreference,
    initialDocumentNames,
    savedOnboarding,
  ]);

  const setFieldValue = useCallback(
    <Key extends keyof FormState>(field: Key, value: FormState[Key]) => {
      setFormState((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleDocumentChange = useCallback(
    (key: DocumentKey, file: File | null) => {
      setFormState((prev) => ({
        ...prev,
        documents: { ...prev.documents, [key]: file },
        documentNames:
          file?.name
            ? { ...prev.documentNames, [key]: file.name }
            : prev.documentNames,
      }));
    },
    []
  );

  const validateBeforeSubmit = useCallback(() => {
    const missing: string[] = [];
    if (!formState.lastName.trim()) missing.push("votre nom");
    if (!formState.firstName.trim()) missing.push("votre prénom");
    if (!formState.networkName.trim()) missing.push("le nom du réseau");
    if (!formState.networkActivity) missing.push("le secteur d'activité");
    if (formState.franchiseeCount.length === 0)
      missing.push("le nombre de franchisés");
    if (!formState.networkType && !formState.networkTypeOther.trim())
      missing.push("le type de réseau");

    if (missing.length > 0) {
      toast.error(
        `Merci de renseigner ${missing
          .map((item, index) =>
            index === missing.length - 1 && index > 0 ? `et ${item}` : item
          )
          .join(missing.length > 1 ? ", " : "")} avant de continuer.`
      );
      return false;
    }
    return true;
  }, [formState]);

  const renderStep = () => {
    switch (onboardingStep) {
      case 0:
        return <Welcome />;
      case 1:
        return (
          <UserName
            firstName={formState.firstName}
            lastName={formState.lastName}
            onFirstNameChange={(value) => setFieldValue("firstName", value)}
            onLastNameChange={(value) => setFieldValue("lastName", value)}
          />
        );
      case 2:
        return (
          <ReseauFranchise
            networkName={formState.networkName}
            onNetworkNameChange={(value) => setFieldValue("networkName", value)}
          />
        );
      case 3:
        return (
          <Activite
            activity={formState.networkActivity}
            onActivityChange={(value) => setFieldValue("networkActivity", value)}
          />
        );
      case 4:
        return (
          <NombreReseau
            selectedRanges={formState.franchiseeCount}
            onChange={(values) => setFieldValue("franchiseeCount", values)}
          />
        );
      case 5:
        return (
          <TypeReseau
            networkType={formState.networkType}
            otherNetworkType={formState.networkTypeOther}
            onNetworkTypeChange={(value) => setFieldValue("networkType", value)}
            onOtherNetworkTypeChange={(value) =>
              setFieldValue("networkTypeOther", value)
            }
          />
        );
      case 6:
        return (
          <Relecture
            legalSupportPreference={formState.legalSupportPreference}
            onLegalSupportChange={(value) =>
              setFieldValue("legalSupportPreference", value)
            }
          />
        );
      case 7:
        return (
          <Documents
            documentNames={formState.documentNames}
            onFileChange={handleDocumentChange}
          />
        );
      default:
        return <Finalisation />;
    }
  };

  const submitOnboarding = useCallback(async () => {
    if (!validateBeforeSubmit()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("firstName", formState.firstName.trim());
      formData.append("lastName", formState.lastName.trim());
      formData.append("networkName", formState.networkName.trim());
      formData.append("networkActivity", formState.networkActivity);
      formData.append(
        "franchiseeCount",
        JSON.stringify(formState.franchiseeCount)
      );
      formData.append("networkType", formState.networkType);
      formData.append("networkTypeOther", formState.networkTypeOther.trim());
      formData.append(
        "legalSupportPreference",
        formState.legalSupportPreference
      );

      (Object.keys(formState.documents) as DocumentKey[]).forEach((key) => {
        const file = formState.documents[key];
        if (file) {
          formData.append(key, file);
        }
      });

      const response = await fetch("/api/onboarding", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de l'enregistrement");
      }

      const result = await response.json();

      if (!result?.success) {
        throw new Error(result?.message ?? "Impossible d'enregistrer");
      }

      const updatedDocumentNames: Partial<Record<DocumentKey, string>> = {};
      result?.data?.documents?.forEach((doc: SavedDocumentMeta) => {
        if (doc?.name && doc?.originalName) {
          updatedDocumentNames[doc.name] = doc.originalName;
        }
      });

      setFormState((prev) => ({
        ...prev,
        firstName: formState.firstName.trim(),
        lastName: formState.lastName.trim(),
        documents: createEmptyDocumentsState(),
        documentNames: {
          ...prev.documentNames,
          ...updatedDocumentNames,
        },
      }));
      setHasSubmitted(true);
      setOnboardingStep(onboardingData.step.length);
      toast.success(result?.message ?? "Onboarding enregistré avec succès");
    } catch (error: any) {
      toast.error(error?.message ?? "Impossible d'enregistrer vos données");
    } finally {
      setIsSubmitting(false);
    }
  }, [formState, validateBeforeSubmit]);

  const handleNextStep = useCallback(() => {
    if (isSubmitting) {
      return;
    }

    if (onboardingStep === onboardingData.step.length - 1) {
      void submitOnboarding();
      return;
    }

    setOnboardingStep((prevStep) =>
      prevStep < onboardingData.step.length ? prevStep + 1 : prevStep
    );
  }, [isSubmitting, onboardingStep, submitOnboarding]);

  const handlePrevStep = () => {
    setOnboardingStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  const isFinalisationStep = onboardingStep >= onboardingData.step.length;

  return (
    <div className="flex flex-row">
      <div className="w-2/3 justify-between flex flex-col items-center relative select-none">
        {renderStep()}
        <div className="fixed bottom-0 items-center left-[33%] translate-[-50%] bg-blue px-5 py-5 rounded-full flex gap-10 text-white text-xl">
          <FontAwesomeIcon
            icon={faLongArrowLeft}
            onClick={handlePrevStep}
            className={`cursor-pointer transition ${
              onboardingStep === 0
                ? "opacity-40 pointer-events-none"
                : "opacity-100"
            }`}
          />
          {isFinalisationStep ? (
            <Link href="/dashboard">
              <FontAwesomeIcon
                icon={faLongArrowRight}
                className={`cursor-pointer transition ${
                  hasSubmitted ? "opacity-100" : "opacity-40 pointer-events-none"
                }`}
              />
            </Link>
          ) : (
            <FontAwesomeIcon
              icon={faLongArrowRight}
              onClick={handleNextStep}
              className={`cursor-pointer transition ${
                onboardingStep === onboardingData.step.length - 1 && isSubmitting
                  ? "opacity-40 pointer-events-none"
                  : "opacity-100"
              }`}
            />
          )}
        </div>
      </div>
      <div className="bg-[#1F120E] w-1/3 rounded-l-4xl h-full p-8 flex flex-col gap-7 justify-center overflow-y-auto select-none">
        {onboardingData.step.map((onboarding, index) => (
          <OnboardingCard
            key={index}
            title={onboarding.title}
            isActive={index === onboardingStep}
            isCompleted={index < onboardingStep}
            step={index + 1}
            isLast={index === onboardingData.step.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
