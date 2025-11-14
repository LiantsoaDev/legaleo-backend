"use client";

import { createContext, ReactNode, useContext } from "react";

export type OnboardingFormValues = Record<string, any>;

const OnboardingFormContext = createContext<OnboardingFormValues>({});

interface OnboardingFormProviderProps {
  value: OnboardingFormValues;
  children: ReactNode;
}

export const OnboardingFormProvider = ({
  value,
  children,
}: OnboardingFormProviderProps) => {
  return (
    <OnboardingFormContext.Provider value={value}>
      {children}
    </OnboardingFormContext.Provider>
  );
};

export const useOnboardingFormData = () => useContext(OnboardingFormContext);
