import { Paragraphe, Title } from "@/components/Typography";

export const CurrentOnboardingStep = () => {
  return (
    <div className="flex flex-col gap-2.5">
      <Title
        level={4}
        className="font-manrope text-black text-base font-semibold"
      >
        1. Lorem ipsum
      </Title>
      <div className="flex flex-col gap-2.5">
        <div className="w-[300px] bg-white h-[6px] relative rounded-full after:absolute after:left-0 after:bg-primary after:w-1/6 after:content-[''] after:block after:h-[6px] after:rounded-full" />
        <Paragraphe className="font-medium text-xs">0/6 terminés</Paragraphe>
      </div>
    </div>
  );
};
