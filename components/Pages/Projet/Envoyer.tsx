"use client";
import { Button } from "@/components/Button";
import { Paragraphe, Title } from "@/components/Typography";
import { useState } from "react";

interface EnvoyerProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  hasInvalideFields: boolean;
}

export const Envoyer = ({ setShow, hasInvalideFields }: EnvoyerProps) => {
  const [electronicSignature, setElectronicSignature] = useState(true);
  return (
    <div className="flex flex-col justify-center items-center fixed inset-0 bg-[#00000033] z-20">
      <div className="w-[700px] bg-white rounded-md shadow flex flex-col gap-5 p-7 relative">
        {hasInvalideFields ? (
          <>
            <Title className="font-semibold text-2xl text-black">
              Champs incomplets détectés
            </Title>
            <Paragraphe className="text-[#828282] text-base font-medium">
              Vous avez 2 champs non renseignés dans le contrat. Ces champs
              apparaîtront sous forme de variables (ex. : montant) dans le
              document final.
            </Paragraphe>
            <div className="flex flex-col gap-0">
              <div className="flex flex-row justify-between items-center group cursor-pointer hover:bg-[#F2F8F8] px-3.5 py-3.5 rounded-sm">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-base text-black">
                    🖊️ Continuer l’édition
                  </span>
                  <span className="font-semibold text-base text-[#828282]">
                    Retourner au formulaire pour compléter les champs manquants
                  </span>
                </div>
                <svg
                  width="30"
                  height="31"
                  viewBox="0 0 30 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <rect y="0.5" width="30" height="30" rx="15" fill="#1F120E" />
                  <path
                    d="M20 15.5L10 15.5M20 15.5L15 20.5M20 15.5L15 10.5"
                    stroke="white"
                    strokeWidth="1.42857"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-row justify-between items-center group cursor-pointer hover:bg-[#F2F8F8] px-4 py-3.5 rounded-sm">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-base text-black">
                    🚀 Envoyer quand même
                  </span>
                  <span className="font-semibold text-base text-[#828282]">
                    Laisser les variables telles quelles dans le document
                  </span>
                </div>
                <svg
                  width="30"
                  height="31"
                  viewBox="0 0 30 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <rect y="0.5" width="30" height="30" rx="15" fill="#1F120E" />
                  <path
                    d="M20 15.5L10 15.5M20 15.5L15 20.5M20 15.5L15 10.5"
                    stroke="white"
                    strokeWidth="1.42857"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </>
        ) : (
          <div className="relative">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-2 right-3 cursor-pointer"
              onClick={() => setShow(false)}
            >
              <path
                d="M20 20L4 4M20 4L4 20"
                stroke="#828282"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <Title
              className="text-left font-semibold text-xl  font-manrope text-black"
              level={2}
            >
              Vérifier les destinataires
            </Title>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-[#087F83] mt-5">
                Signataires
              </h3>
              <div className="flex items-center gap-5">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#E6F2F2] text-[#087F83] font-bold">
                  A
                </div>
                <span className="text-black text-xl font-medium">ACME</span>
              </div>
              <button className="text-sm text-[#1F120E] font-medium flex items-center gap-1 mb-2 mt-2">
                <span className="text-lg font-manrope font-medium">＋</span>{" "}
                Ajouter un signataire
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
                <span className="text-black text-xl font-medium">
                  Lorem Ipsum
                </span>
              </div>
              <button className="text-sm text-[#1F120E] font-medium flex items-center gap-1">
                <span className="text-lg">＋</span> Ajouter un destinataire
              </button>
            </div>

            {/* Signature électronique */}
            <div className="flex items-center justify-between border-t border-b py-4 ">
              <span className="text-black font-semibold">
                Signature électronique
              </span>
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
            <div className="w-full flex justify-end">
              <Button classname="rounded-sm !bg-[#087F83] hover:!bg-[#087F83] hover:!border-none hover:!text-white cursor-pointer">
                Envoyer
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
