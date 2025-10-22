import { Button } from "@/components/Button";
import { Title } from "@/components/Typography";
import { CurrentOnboardingStep } from "./CurrentOnboardingStep";

interface OnboardingFinalisationProps {
  title: string;
  stepIndex: number;
  completedSteps: number;
  totalSteps: number;
  ctaHref?: string;
}

export const OnboardingFinalisation = ({
  title,
  stepIndex,
  completedSteps,
  totalSteps,
  ctaHref,
}: OnboardingFinalisationProps) => {
  return (
    <div className="flex flex-row justify-between items-center bg-[#D9FDFB] p-7 rounded-[10px]">
      <div className="flex flex-col gap-2.5 w-3/4">
        <Title
          level={3}
          className="font-manrope text-black text-xl font-semibold"
        >
          {title}
        </Title>
        <CurrentOnboardingStep
          index={stepIndex}
          title={title}
          completedSteps={completedSteps}
          totalSteps={totalSteps}
        />
      </div>
      <Button
        classname="rounded-sm w-1/4 cursor-pointer !text-md !py-2.5"
        href={ctaHref}
        isLink={Boolean(ctaHref)}
        isdisabled={!ctaHref}
      >
        Afficher
      </Button>
    </div>
  );
};
