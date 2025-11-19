import {
  Approvisionnement,
  ConceptExploitation,
  ConditionFinanciere,
  ConsentementRGPD,
  ConventionAnnuel,
  DonnerOutils,
  Formation,
  FormationReseauEtabli,
  InformationContractuel,
  InformationFinanciere,
  MarqueCommunication,
  MarqueJeuneReseau,
  OutilGestion,
  PersonnaliserProfilJuridique,
  PointVente,
  ProduitApprovisoinnement,
  SiteInternetReseauSociaux,
  Territoire,
  Welcome,
} from "@/components/Pages/Onboarding";
import { ConceptSavoirFaire } from "@/components/Pages/Onboarding/ConceptSavoirFaire";
import { RecrutementFranchiser } from "@/components/Pages/Onboarding/RecrutementFranchiser";
import { RedactionContrat } from "@/components/Pages/Onboarding/RedactionContrat";
import { UserName } from "@/components/Pages/Onboarding/UserName";
import { VotreEnseigne } from "@/components/Pages/Onboarding/VotreEnseigne";
import {
  VotreReseau,
  VotreReseauJeune,
} from "@/components/Pages/Onboarding/VotreReseau";
import { handleNextStep } from "@/lib/features/slice/onboardingSlice";
import { AppDispatch } from "@/lib/store";
import { OnboardingWithSteps } from "../types";

export const renderStep = (
  currentStep: number,
  internalStep: number,
  userId: any,
  onboardingDatas: OnboardingWithSteps | null,
  dispatch: AppDispatch
) => {
  const nextStepPayload = {
    userId: userId,
    onboardingDatas: onboardingDatas,
    linkToRedirect: "/dashboard",
  };

  switch (currentStep) {
    case 1:
      return (
        <Welcome onClick={() => dispatch(handleNextStep(nextStepPayload))} />
      );
    case 2:
      return <UserName />;
    case 3:
      return <VotreEnseigne />;
    case 4:
      return <VotreReseau internalStep={internalStep} dispatch={dispatch} />;
    case 5:
      return <RecrutementFranchiser internalStep={internalStep} />;
    case 6:
      return (
        <RedactionContrat
          internalStep={internalStep}
          onClick={() => dispatch(handleNextStep(nextStepPayload))}
        />
      );
    case 7:
      return <ConsentementRGPD />;
  }
};

export const renderStepJeuneReseau = (
  currentStep: number,
  internalStep: number,
  userId: any,
  onboardingDatas: OnboardingWithSteps | null,
  dispatch: AppDispatch
) => {
  const nextStepPayload = {
    userId: userId,
    onboardingDatas: onboardingDatas,
    linkToRedirect: "/dashboard",
  };

  switch (currentStep) {
    case 1:
      return (
        <Welcome onClick={() => dispatch(handleNextStep(nextStepPayload))} />
      );
    case 2:
      return <UserName />;
    case 3:
      return <VotreEnseigne />;
    case 4:
      return (
        <VotreReseauJeune internalStep={internalStep} dispatch={dispatch} />
      );
    case 5:
      return <ConceptSavoirFaire internalStep={internalStep} />;
    case 6:
      return <MarqueJeuneReseau internalStep={internalStep} />;
    case 7:
      return <PointVente internalStep={internalStep} />;
    case 8:
      return <Territoire />;
    case 9:
      return <InformationFinanciere internalStep={internalStep} />;
    case 10:
      return <SiteInternetReseauSociaux />;
    case 11:
      return <Approvisionnement internalStep={internalStep} />;
    case 12:
      return <Formation internalStep={internalStep} />;
    case 13:
      return <ConventionAnnuel />;
    case 14:
      return <OutilGestion internalStep={internalStep} />;
  }
};

export const renderStepReseauEtabli = (
  currentStep: number,
  internalStep: number,
  userId: any,
  onboardingDatas: OnboardingWithSteps | null,
  dispatch: AppDispatch
) => {
  const nextStepPayload = {
    userId: userId,
    onboardingDatas: onboardingDatas,
    linkToRedirect: "/dashboard",
  };

  switch (currentStep) {
    case 1:
      return (
        <PersonnaliserProfilJuridique
          onClick={() => dispatch(handleNextStep(nextStepPayload))}
        />
      );
    case 2:
      return <InformationContractuel internalStep={internalStep} />;
    case 3:
      return <ConceptExploitation internalStep={internalStep} />;
    case 4:
      return <MarqueCommunication internalStep={internalStep} />;
    case 5:
      return <DonnerOutils internalStep={internalStep} />;
    case 6:
      return <ProduitApprovisoinnement internalStep={internalStep} />;
    case 7:
      return <ConditionFinanciere />;
    case 8:
      return <FormationReseauEtabli internalStep={internalStep} />;
  }
};
