import logo_partner from "@/app/assets/images/logo_ipsum.png";
import Image from "next/image";
import { Paragraphe } from "../Typography";

export const LoginRight = () => {
  return (
    <div className="bg-[#087F83] w-1/2 rounded-l-4xl p-12">
      <div className="w-full bg-[#D9D9D9] rounded-3xl h-[528px]"></div>
      <Paragraphe className="text-white text-center font-fraunces font-normal text-[40px] leading-[48px] mt-10 w-2/3 mx-auto">
        La seule LegalTech dédiée au droit de la franchise
      </Paragraphe>
      <Paragraphe className="text-white text-center font-bold text-base mt-10">
        Ils nous ont fait confiance :
        <Image src={logo_partner} alt="Logo partner" className="mt-9 mx-auto" />
      </Paragraphe>
    </div>
  );
};
