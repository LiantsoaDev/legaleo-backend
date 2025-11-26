import { Button } from "@/components/Button";
import { Title } from "@/components/Typography";
import { CurrentOnboardingStep } from "./CurrentOnboardingStep";

interface OnboardingFinalisationProps {
  title: string;
  linkText: string;
  linkHref: string;
  bgColor?: string;
  onboardingStep?: string;
}

export const OnboardingFinalisation = ({
  title,
  linkText,
  linkHref,
  bgColor,
  onboardingStep,
}: OnboardingFinalisationProps) => {
  return (
    <div
      className={`flex flex-row justify-between items-center p-7 rounded-[10px] ${
        bgColor ? `bg-[${bgColor}]` : "bg-[#D9FDFB]"
      }`}
    >
      <div className="flex flex-col gap-2.5 w-3/4">
        <Title
          level={3}
          className="font-manrope text-black text-xl font-semibold"
        >
          {title}
        </Title>
        <CurrentOnboardingStep currentStep={onboardingStep} />
      </div>
      <Button
        href={linkHref}
        isLink
        classname="rounded-sm w-1/4 cursor-pointer !text-md !py-2.5"
      >
        {linkText}
      </Button>
    </div>
  );
};
