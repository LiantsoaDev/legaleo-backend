import { OnboardingStep } from "@/app/generated/prisma";
import { OnboardingWithSteps } from "@/utils/types";
import { toast } from "react-toastify";

type FormDataValue =
  | string
  | { name: string; type: string; content: string }
  | FormDataValue[];

export const getOnboardings = async (title: string, userId?: string) => {
  try {
    const params = new URLSearchParams({ title });
    if (userId) {
      params.append("userId", userId);
    }

    const res = await fetch(`/api/user/onboarding?${params.toString()}`);

    if (!res.ok) throw new Error("Erreur serveur");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const postOnboardingData = async (data: Record<string, any>) => {
  try {
    const res = await fetch("/api/user/onboarding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur serveur");
    console.log("Données envoyées avec succès", res);
    return await res.json();
  } catch (error) {
    toast.error("Impossible d'envoyer les données", {
      position: "top-right",
      theme: "colored",
    });
    return null;
  }
};

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // encode en base64
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const saveStepData = async (
  setFormDataState: React.Dispatch<React.SetStateAction<Record<string, any>>>,
  onboardingDatas: OnboardingWithSteps[] | null,
  user: any
) => {
  const formElement = document.querySelector("form");
  if (!formElement) return;

  const formData = new FormData(formElement as HTMLFormElement);
  const data: Record<string, FormDataValue> = Object.fromEntries(
    Array.from(formData.entries()).filter(
      ([_, value]) => !(value instanceof File)
    )
  ) as Record<string, FormDataValue>;

  for (const [key, value] of formData.entries()) {
    if (value instanceof File && value.size > 0) {
      const base64 = await fileToBase64(value);
      // On ajoute le fichier encodé dans data
      data[key] = {
        name: value.name,
        type: value.type,
        content: base64,
      };
    }
  }

  // Fusionner avec les données précédentes
  setFormDataState((prev) => ({ ...prev, ...data }));
  const userId = user.id;
  const onboarding_id = onboardingDatas && onboardingDatas[0]?.id;

  if (!onboarding_id) return;

  const dataToSend = {
    userId,
    onboarding_id,
    value: data,
  };

  console.log("Données à envoyer :", dataToSend);

  postOnboardingData(dataToSend);
};

export const handleNextStep = (
  internalCurrentStep: number,
  internalStep: number,
  onboardingSteps: OnboardingStep[],
  onboardingStep: number,
  setOnboardingStep: React.Dispatch<React.SetStateAction<number>>,
  setInternalCurrentStep: React.Dispatch<React.SetStateAction<number>>,
  setFormDataState: React.Dispatch<React.SetStateAction<Record<string, any>>>,
  linkToRedirect: string,
  user: any,
  onboardingDatas: OnboardingWithSteps[] | null
) => {
  if (internalCurrentStep === internalStep) {
    saveStepData(setFormDataState, onboardingDatas, user);
    setOnboardingStep((prevStep) =>
      prevStep < onboardingSteps.length ? prevStep + 1 : prevStep
    );
    setInternalCurrentStep(1);
    if (onboardingStep === onboardingSteps.length) {
      // Redirection vers le tableau de bord ou une autre page
      window.location.href = linkToRedirect;
    }
  } else {
    console.log("internal current step", internalCurrentStep);
    setInternalCurrentStep((prev) => prev + 1);
  }
};

export const handlePrevStep = (
  internalCurrentStep: number,
  internalStep: number,
  setOnboardingStep: React.Dispatch<React.SetStateAction<number>>,
  setInternalCurrentStep: React.Dispatch<React.SetStateAction<number>>,
  setFormDataState: React.Dispatch<React.SetStateAction<Record<string, any>>>,
  user: any,
  onboardingDatas: OnboardingWithSteps[] | null
) => {
  if (internalCurrentStep > 1) {
    setInternalCurrentStep((prev) => prev - 1);
    return;
  }
  if (internalCurrentStep === 1) {
    saveStepData(setFormDataState, onboardingDatas, user);

    setOnboardingStep((prevStep) => {
      if (prevStep > 1) {
        return prevStep - 1;
      }
      return prevStep;
    });
    setInternalCurrentStep(internalStep);
  }
};
