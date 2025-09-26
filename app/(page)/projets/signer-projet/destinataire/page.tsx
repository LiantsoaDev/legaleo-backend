"use client";
import { Button } from "@/components/Button";
import { Title } from "@/components/Typography";
import { useState } from "react";

const page = () => {
  const [electronicSignature, setElectronicSignature] = useState(true);
  return (
    <div className="flex flex-col gap-5 py-32 px-72 mx-auto w-7xl">
      <Title
        className="text-left font-semibold text-4xl  font-manrope text-black"
        level={2}
      >
        Vérifier les destinataires
      </Title>
      <div className="space-y-2">
        <Title
          className="text-left font-semibold text-2xl mb-5  font-manrope text-black"
          level={3}
        >
          Nom du contrat
        </Title>
        <h3 className="text-sm font-semibold text-[#087F83]">Signataires</h3>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#E6F2F2] text-[#087F83] font-bold">
            A
          </div>
          <span className="text-black text-xl font-medium">ACME</span>
        </div>
        <button className="text-sm text-[#1F120E] font-medium flex items-center gap-1">
          <span className="text-lg">＋</span> Ajouter un signataire
        </button>
      </div>

      {/* Destinataires */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-[#087F83]">
          Autres destinataires
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#E6F2F2] text-[#087F83] font-bold">
            A
          </div>
          <span className="text-black text-xl font-medium">Lorem Ipsum</span>
        </div>
        <button className="text-sm text-[#1F120E] font-medium flex items-center gap-1">
          <span className="text-lg">＋</span> Ajouter un destinataire
        </button>
      </div>

      {/* Signature électronique */}
      <div className="flex items-center justify-between border-t border-b py-4 ">
        <span className="text-black font-semibold">Signature électronique</span>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={electronicSignature}
            onChange={() => setElectronicSignature(!electronicSignature)}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#087F83] transition">
            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition" />
          </div>
        </label>
      </div>

      {/* Note */}
      <div>
        <label
          htmlFor="note"
          className="block text-sm font-semibold text-black mb-1"
        >
          Ajouter une note
        </label>
        <textarea
          id="note"
          rows={4}
          className="w-full border rounded-lg p-2 focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="Écrivez votre note ici..."
        />
      </div>
      <Button classname="rounded-sm !bg-[#087F83] hover:!bg-[#087F83] hover:!border-none hover:!text-white cursor-pointer">
        Envoyer
      </Button>
    </div>
  );
};

export default page;
