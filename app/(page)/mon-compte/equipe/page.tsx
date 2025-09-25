"use client";
import { Button } from "@/components/Button";
import { Tables } from "@/components/Pages/MonCompte";
import ToggleList from "@/components/Pages/MonCompte/ToggleList";
import { Paragraphe, Title } from "@/components/Typography";
import { useState } from "react";

const page = () => {
  const [selectedContrat, setSelectedContrat] = useState<any>(null);
  return (
    <div className="flex flex-col gap-10 relative ">
      <div className="flex flex-col gap-2">
        <Title level={2} className="font-semibold text-2xl text-black">
          Équipe
        </Title>
        <Paragraphe className="font-medium text-sm text-[#828282]">
          Pretend not to be evil meow to be let out intently stare at the same .
        </Paragraphe>
      </div>
      <div className="flex flex-row gap-5">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm w-1/2">
          <h2 className="text-sm font-semibold text-gray-900">
            Utilisateurs inclus dans votre forfait
          </h2>

          <div className="mt-4 grid grid-cols-2 gap-6">
            {/* Administrateurs */}
            <div>
              <p className="text-xs text-gray-500">Administrateurs</p>
              <p className="text-sm">
                <span className="font-bold text-red-600">1</span>
                <span className="text-gray-700"> / 1 inclus</span>
              </p>
            </div>

            {/* Contributeurs */}
            <div>
              <p className="text-xs text-gray-500">Contributeurs</p>
              <p className="text-sm">
                <span className="font-bold text-gray-900">2</span>
                <span className="text-gray-700"> / 10 inclus</span>
              </p>
            </div>
          </div>
        </div>
        <div className="border border-[#62E7EB] rounded-lg p-4 flex items-center justify-between bg-[#62E7EB0D] shadow-sm w-1/2">
          <div>
            <h3 className="text-[#087F83] text-base font-semibold">
              Besoin de plus d’utilisateurs ?
            </h3>
            <p className="text-black text-sm font-medium">
              Mettez à niveau votre forfait et ajoutez autant d’administrateurs
              ou de contributeurs que nécessaire pour votre organisation.
            </p>
          </div>
          <button className="bg-[#62E7EB] text-black px-4 py-2 rounded-sm font-bold hover:bg-[#62E7EB] transition">
            Upgrade
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Title level={3} className="font-semibold text-sm text-black">
          Utilisateurs présents dans l’espace de travail actuel
        </Title>
      </div>
      <Tables
        selectedContrat={selectedContrat}
        setSelectedContrat={setSelectedContrat}
      />
      <div className="flex flex-col gap-5">
        <Title level={3} className="font-semibold text-sm text-black">
          Droit
        </Title>
        <ToggleList />
        <div className="flex flex-row gap-5 items-center !mt-5">
          <Button classname="!rounded-sm">Sauvegarder</Button>
          <Button href="#">Annuler</Button>
        </div>
      </div>
    </div>
  );
};

export default page;
