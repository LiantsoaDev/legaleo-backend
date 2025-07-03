import { Paragraphe, Title } from "../Typography";

interface OnboardingCardProps {
  title: string;
  description: string;
  isActive?: boolean;
  isCompleted?: boolean;
}

export const OnboardingCard = ({
  description,
  title,
  isActive,
  isCompleted,
}: OnboardingCardProps) => {
  return (
    <div className="flex flex-row gap-10 items-center">
      <div
        className={`${
          isActive || isCompleted ? "bg-primary" : "bg-[#413734]"
        }  w-20 h-20 rounded-full relative after:not-last:content-[''] after:w-0.5 after:h-10 ${
          isActive || isCompleted ? "after:bg-primary" : "after:bg-[#413734]"
        }  after:block after:absolute after:bottom-[-50%] after:left-1/2 after:translate-x-[-50%]`}
      />
      <div
        className={`flex flex-col gap-2 py-3.5 ${
          isActive || isCompleted ? "opacity-100" : "opacity-50"
        }`}
      >
        <Title level={3} className="text-white font-bold text-2xl capitalize">
          {title}
        </Title>
        <Paragraphe className="text-white font-normal text-base capitalize">
          {description}
        </Paragraphe>
      </div>
    </div>
  );
};
