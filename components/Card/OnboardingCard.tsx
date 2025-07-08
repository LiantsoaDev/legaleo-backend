import { Title } from "../Typography";

interface OnboardingCardProps {
  title: string;
  isActive?: boolean;
  isCompleted?: boolean;
  key?: string | number | undefined;
  step?: number;
  isLast?: boolean;
}

export const OnboardingCard = ({
  title,
  isActive,
  isCompleted,
  step,
  isLast,
}: OnboardingCardProps) => {
  return (
    <div className="flex flex-row gap-10 items-center">
      <div
        className={`flex justify-center items-center font-manrope text-2xl font-medium ${
          isActive || isCompleted
            ? "bg-primary text-secondary"
            : "bg-[#413734] text-[#8C8C8C]"
        }  w-14 h-14 rounded-full relative ${
          isActive || isCompleted ? "after:bg-primary" : "after:bg-[#413734]"
        } ${
          isLast
            ? ""
            : "after:content-[''] after:w-0.5 after:h-10 after:block after:absolute after:bottom-[-60%] after:left-1/2 after:translate-x-[-50%]"
        }  `}
      >
        {step}
      </div>
      <div
        className={`flex flex-col gap-2 py-3.5 ${
          isActive || isCompleted ? "opacity-100" : "opacity-50"
        }`}
      >
        <Title level={3} className="text-white font-bold text-xl capitalize">
          {title}
        </Title>
      </div>
    </div>
  );
};
