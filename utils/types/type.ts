import React from "react";

export interface ButtonPropos {
  primary?: boolean;
  children: React.ReactNode;
  onclick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "button";
  href?: string;
  isdisabled?: boolean;
  classname?: string;
  isLink?: boolean;
  ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
}

export interface InputProps {
  type: "textarea" | "text" | "email" | "password" | "number";
  placeholder: string;
  label?: string;
  isrequired?: boolean;
  name: string;
  classname?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nombreCaractere?: number;
}

export interface CheckBoxProps {
  id: string;
  value: string;
  isSelected?: boolean;
  onSelect?: () => void;
  name?: string;
  type: "checkbox" | "radio";
  showLogo?: boolean;
  classLabel?: string;
  classSelected?: string;
}

export interface RadioProps {
  options: string[];
  name: string;
  showLogo?: boolean;
  classLabel?: string;
  classSelected?: string;
  classContainer?: string;
}

export interface MultiSelectGroupProps {
  options: string[];
  showLogo?: boolean;
  name?: string;
}

export interface InputFilesProps {
  name: string;
  label: string;
  isrequired?: boolean;
  accept?: string;
  id: string;
}

export interface SelectProps {
  options: string[];
  name: string;
  id: string;
  isMultiple?: boolean;
  classname?: string;
  isFilter?: boolean;
}

// Type générique pour chaque étape
export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  onboarding: OnboardingContent;
}

// Type pour chaque contenu d'onboarding possible
export type OnboardingContent =
  | OnboardingWelcome
  | OnboardingInput
  | OnboardingSelect
  | OnboardingFranchise
  | OnboardingObjectives
  | OnboardingFiles;

// Cas 1 : Étape de bienvenue
interface OnboardingWelcome {
  title: string;
  description: string;
  duration: string;
}

// Cas 2 : Étape avec input simple
interface OnboardingInput {
  placeholder: string;
  tips: string;
}

// Cas 3 : Étape avec options sélectionnables
interface OnboardingSelect {
  placeholder: string;
  options: string[];
}

// Cas 4 : Étape avec nombre de franchisés
interface OnboardingFranchise {
  now: string[];
  prevision: string[];
}

// Cas 5 : Étape avec choix multiples d’objectifs
interface OnboardingObjectives {
  optionsMultiples: string[];
}

// Cas 6 : Étape avec upload de fichiers
interface OnboardingFiles {
  files: FileUpload[];
}

interface FileUpload {
  name: string;
  accept: string;
  placeholder: string;
}

// Structure finale
export interface OnboardingData {
  step: OnboardingStep[];
}

export interface Project {
  status:
    | "Validé avocat"
    | "Modifications requises"
    | "En relecture"
    | "Non assigné";

  name: string;
  dateCreated: string;
  dateUpdated?: string;
  description?: string;
  teamMembers?: string[];
  commentaires?: number;
}

export interface ContractUsers {
  name: string;
  email: string;
  methode_2fa?: string;
  workspace?: string;
  role?: string;
  documentAssocier?: string;
  status?: string;
  date_invitation?: string;
}

export interface Contrat {
  status:
    | "brouillon"
    | "relecture interne"
    | "relecture avocat"
    | "en cours de signature"
    | "Modifications requises";
  projects: Project[];
}

export type FileNode = {
  id: string;
  name: string;
  type: "folder" | "file";
  children?: FileNode[]; // uniquement si type === 'folder'
};
