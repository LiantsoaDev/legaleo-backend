import { Paragraphe, Title } from "@/components/Typography";

interface CurrentOnboardingStepProps {
  index: number;
  title: string;
  completedSteps: number;
  totalSteps: number;
}

export const CurrentOnboardingStep = ({
  index,
  title,
  completedSteps,
  totalSteps,
}: CurrentOnboardingStepProps) => {
  const safeTotal = totalSteps > 0 ? totalSteps : 1;
  const clampedCompleted = Math.min(Math.max(completedSteps, 0), safeTotal);
  const completionPercent = Math.round((clampedCompleted / safeTotal) * 100);

  return (
    <div className="flex flex-col gap-2.5">
      <Title
        level={4}
        className="font-manrope text-black text-base font-semibold"
      >
        {index}. {title}
      </Title>
      <div className="flex flex-col gap-2.5">
        <div className="w-[300px] bg-white h-[12px] relative rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
        <Paragraphe className="font-medium text-xs">
          {clampedCompleted}/{safeTotal} terminés
        </Paragraphe>
      </div>
    </div>
  );
};
