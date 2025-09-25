import { Button } from "@/components/Button";
import { Paragraphe } from "@/components/Typography";

export const FacturationNextPaymentCard = () => {
  return (
    <div className="w-1/2 flex flex-col gap-5 px-6 py-7 bg-[#FAF9F5] rounded-md ">
      <span className="text-[#1F120E] font-semibold text-sm uppercase">
        Next payment
      </span>
      <div className="flex flex-col gap-2">
        <Paragraphe className="font-fraunces text-[#1F120E] font-normal text-4xl">
          29€
        </Paragraphe>
        <Paragraphe className="font-manrope font-medium text-3xl text-black">
          DD/MM/YYYY
        </Paragraphe>
      </div>
      <Paragraphe className="font-medium text-base text-[#1F120E]">
        Payment details
      </Paragraphe>
      <Button classname="!w-fit !bg-transparent border border-black !text-black !font-bold !text-base">
        Change payment method
      </Button>
    </div>
  );
};
