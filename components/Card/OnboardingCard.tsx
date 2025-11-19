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
  progresscolor?: string;
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
  progresscolor,
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
            : `${progresscolor ? progresscolor : "bg-[#413734]"} text-white`
        }  w-13 h-13 rounded-full relative ${
          isActive || isCompleted
            ? `before:bg-primary`
            : ` ${
                progresscolor
                  ? "before:bg-[#FFFFFF33] z-0"
                  : "before:bg-[#413734]"
              } `
        } ${
          isLast
            ? ""
            : "before:content-[''] before:w-0.5 before:h-10 before:block before:absolute before:bottom-[-60%] before:left-1/2 before:translate-x-[-50%]"
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
