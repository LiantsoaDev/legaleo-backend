import { Button } from "@/components/Button";
import { Title } from "@/components/Typography";
import { CurrentOnboardingStep } from "./CurrentOnboardingStep";

export const OnboardingFinalisation = () => {
  return (
    <div className="flex flex-row justify-between items-center bg-[#D9FDFB] p-7 rounded-[10px]">
      <div className="flex flex-col gap-2.5 w-3/4">
        <Title
          level={3}
          className="font-manrope text-black text-xl font-semibold"
        >
          Mes premiers pas sur Legaleo
        </Title>
        <CurrentOnboardingStep />
      </div>
      <Button classname="rounded-sm w-1/4 cursor-pointer !text-base">
        Commencer
      </Button>
    </div>
  );
};
