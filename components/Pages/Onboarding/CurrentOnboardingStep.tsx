import { Paragraphe, Title } from "@/components/Typography";

interface CurrentOnboardingStepProps {
  currentStep?: string;
}

export const CurrentOnboardingStep = ({
  currentStep,
}: CurrentOnboardingStepProps) => {
  return (
    <div className="flex flex-col gap-2.5">
      <Title level={4} className="font-manrope text-black text-sm font-medium">
        {currentStep ? currentStep : "1. Lorem ipsum"}
      </Title>
      <div className="flex flex-col gap-2.5">
        <div className="w-[300px] bg-white h-[6px] relative rounded-full after:absolute after:left-0 after:bg-primary after:w-1/6 after:content-[''] after:block after:h-[6px] after:rounded-full" />
        <Paragraphe className="font-medium text-xs">0/6 terminés</Paragraphe>
      </div>
    </div>
  );
};
