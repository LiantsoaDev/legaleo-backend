import { jumpToStep } from "@/lib/features/slice/onboardingSlice";
import { AppDispatch } from "@/lib/store";
import { OnboardingWithSteps } from "@/utils/types";
import { Title } from "../Typography";

interface OnboardingCardProps {
  title: string;
  isActive?: boolean;
  isCompleted?: boolean;
  key: string | number | undefined;
  step: number;
  isLast: boolean;
  dispatch: AppDispatch;
  userId: string | null;
  onboardingDatas: OnboardingWithSteps | null;
}

export const OnboardingCard = ({
  title,
  isActive,
  isCompleted,
  step,
  isLast,
  dispatch, // <-- Prop mise à jour
  userId,
  onboardingDatas,
}: OnboardingCardProps) => {
  const handleJump = () => {
    if (userId) {
      dispatch(
        jumpToStep({
          step: step,
          userId: userId,
          onboardingDatas: onboardingDatas,
        })
      );
    }
  };

  return (
    <div
      className="flex flex-row gap-8 items-center cursor-pointer"
      onClick={handleJump}
    >
      <div
        className={`flex justify-center items-center font-manrope text-xl font-medium ${
          isActive || isCompleted
            ? "bg-primary text-secondary"
            : "bg-[#413734] text-[#8C8C8C]"
        }  w-13 h-13 rounded-full relative ${
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
        <Title level={3} className="text-white font-bold text-md">
          {title}
        </Title>
      </div>
    </div>
  );
};
