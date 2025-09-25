import { Button } from "@/components/Button";
import { Paragraphe } from "@/components/Typography";

interface FacturationPlanCardProps {
  price: string;
  type_reseaux: string;
  description: string;
  date_expiration: string;
}

export const FacturationPlanCard = ({
  price,
  type_reseaux,
  description,
  date_expiration,
}: FacturationPlanCardProps) => {
  return (
    <div className="w-1/2 flex flex-col gap-5 px-6 py-7 bg-[#D9FDFB] rounded-md ">
      <span className="text-[#087F83] font-semibold text-sm uppercase">
        Votre plan
      </span>
      <div className="flex flex-col gap-2">
        <Paragraphe className="font-fraunces text-[#087F83] font-normal text-4xl">
          {price} / mois
        </Paragraphe>
        <Paragraphe className="font-fraunces font-normal text-3xl text-black">
          {type_reseaux}
        </Paragraphe>
      </div>
      <Paragraphe className="font-medium text-base text-[#087F83]">
        {description} • Expiré le {date_expiration}
      </Paragraphe>
      <div className="flex flex-row gap-4 items-center">
        <Button classname="!w-fit !bg-[#62E7EB] !text-black !font-bold !text-base">
          Upgrade
        </Button>
        <Button classname="!w-fit !bg-transparent border border-black !text-black !font-bold !text-base">
          Manage plan
        </Button>
      </div>
    </div>
  );
};
