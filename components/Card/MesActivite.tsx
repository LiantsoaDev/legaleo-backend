import { Title } from "../Typography";
import { Activite } from "./Activite";

export const MesActivite = () => {
  return (
    <div className="flex flex-col gap-5 bg-white rounded-2xl p-5 shadow-lg">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-3.5">
          <Title level={3} className="text-black font-bold text-xl">
            Mon activité
          </Title>
        </div>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <Activite status="Assignés" classname="bg-[#F7F7F7] w-[48%]">
          2 Clients
        </Activite>
        <Activite
          status="En attente de révision"
          classname="bg-[#FEFAE8] w-[48%]"
        >
          2 Contrats
        </Activite>
        <Activite
          status="En cours de révision"
          classname="bg-[#E5F6FD] w-[48%]"
        >
          2 Contrats
        </Activite>
        <Activite
          status="En attente du client"
          classname="bg-[#F9E5FB] w-[48%]"
        >
          2 Contrats
        </Activite>
      </div>
    </div>
  );
};
