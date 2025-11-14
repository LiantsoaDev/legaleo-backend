"use client";
import { Title } from "@/components/Typography";
import { setMaxInternalStep } from "@/lib/features/slice/onboardingSlice";
import { useAppDispatch } from "@/lib/hook";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useOnboardingFormData } from "./OnboardingFormContext";

export const ConsentementRGPD = () => {
  const onboardingFormData = useOnboardingFormData();
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMaxInternalStep(1));
  }, [dispatch]);

  useEffect(() => {
    if (
      onboardingFormData &&
      typeof onboardingFormData["consentement_rgpd"] === "string"
    ) {
      setIsChecked(onboardingFormData["consentement_rgpd"] === "accepted");
    } else if (!onboardingFormData || onboardingFormData["consentement_rgpd"] === undefined) {
      setIsChecked(false);
    }
  }, [onboardingFormData]);

  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
        Consentement RGPD
      </Title>
      <div className="py-8 px-10 bg-[#D9FDFB] rounded-4xl flex gap-10 items-center w-full maw-w-[760px]">
        <input
          type="checkbox"
          id="consent"
          name="consentement_rgpd"
          value="accepted"
          className="accent-black w-6 h-6 rounded-sm"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <div className="flex flex-col gap-2.5">
          <label htmlFor="consent" className="font-medium text-2xl text-black">
            J’accepte que mes documents soient utilisés par Legaleo afin
            d’optimiser mon expérience sur la plateforme.
          </label>
          <Link
            href="politique-confidentialite"
            className="font-medium text-sm text-black underline"
          >
            Politique de confidentilité
          </Link>
        </div>
      </div>
    </div>
  );
};
