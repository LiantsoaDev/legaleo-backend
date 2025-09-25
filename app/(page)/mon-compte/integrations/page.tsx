"use client";
import { Decouvrir, MesIntegration } from "@/components/Pages/MonCompte";
import { Paragraphe, Title } from "@/components/Typography";
import { useState } from "react";

const page = () => {
  const [showMesIntegration, setShowMesIntegration] = useState(true);
  return (
    <div className="flex flex-col gap-10 relative">
      <div className="flex flex-col gap-2">
        <Title level={2} className="font-semibold text-2xl text-black">
          Extensions et intégrations
        </Title>
        <Paragraphe className="font-medium text-sm text-[#828282]">
          Pretend not to be evil meow to be let out intently stare at the same .
        </Paragraphe>
      </div>
      <div className="flex flex-row">
        <div
          className={`w-fit px-9 py-3 text-center border-b-2 cursor-pointer font-semibold ${
            showMesIntegration ? "border-[#62E7EB]" : "border-[#E3E3E3]"
          } `}
          onClick={() => setShowMesIntegration(true)}
        >
          Mes intégrations
        </div>
        <div
          className={`w-fit px-9 py-3 text-center border-b-2 cursor-pointer font-semibold ${
            showMesIntegration ? "border-[#E3E3E3]" : "border-[#62E7EB]"
          } `}
          onClick={() => setShowMesIntegration(false)}
        >
          À découvrir
        </div>
      </div>
      {showMesIntegration ? <MesIntegration /> : <Decouvrir />}
    </div>
  );
};

export default page;
