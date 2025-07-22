import assistanceIA from "@/assets/images/assistance_logo.png";
import Image from "next/image";
import { Button } from "../Button";
import { Paragraphe, Title } from "../Typography";

export const Decouvrir = () => {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #62E7EB 14.42%, #087F83 81.73%)",
      }}
      className="flex flex-col gap-4 items-center bg-gradient-to-b py-5 px-5 rounded-xl shadow-lg text-white "
    >
      <Image
        src={assistanceIA}
        alt="Assistance IA Logo"
        width={40}
        height={40}
      />
      <Title level={2} className="font-bold text-base text-white">
        Découvrez notre assistant IA
      </Title>
      <Paragraphe className="text-sm text-white text-center mt-2 w-3/4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor...{" "}
      </Paragraphe>
      <Button classname="!bg-[#62E7EB] !rounded-lg !border-none !text-black w-full cursor-pointer">
        Découvrir
      </Button>
    </div>
  );
};
