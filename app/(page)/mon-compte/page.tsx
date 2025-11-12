"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Form";
import { Paragraphe, Title } from "@/components/Typography";

import Image from "next/image";
import { useState } from "react";

const page = () => {
  const [showEditEmail, setShowEditEmail] = useState(false);
  return (
    <div className="flex flex-col gap-10 relative">
      <div className="flex flex-col gap-2">
        <Title level={2} className="font-semibold text-2xl text-black">
          Mon compte
        </Title>
        <Paragraphe className="font-medium text-sm text-[#828282]">
          Pretend not to be evil meow to be let out intently stare at the same .
        </Paragraphe>
      </div>
      <div className="flex flex-col gap-7 max-w-2xl">
        <div className="flex flex-col gap-2.5">
          <Title level={3} className="font-semibold text-sm text-black">
            Photo de profil
          </Title>
          <div className="flex flex-row items-center gap-4 mb-5">
            <Image
              src="../../assets/images/pdp.png"
              alt="photo de profil"
              width={80}
              height={80}
            />
            <div className="flex flex-row gap-4 items-center">
              <label
                htmlFor="photo_profil"
                className="bg-[#F2F2F2] py-2 px-4 rounded-sm text-xs font-bold cursor-pointer text-[#828282] hover:bg-[#E0E0E0] transition"
              >
                Importer une image
              </label>
              <input
                type="file"
                name="photo_profil"
                id="photo_profil"
                className="hidden"
              />
              <Button href="#" classname="!text-xs">
                Supprimer
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-3">
              <Input
                name="name"
                placeholder="Votre nom"
                type="text"
                label="Nom"
              />
              <Input
                name="prenom"
                placeholder="Votre prénom"
                type="text"
                label="Prénom"
              />
            </div>
            <Input
              name="email"
              placeholder="Votre email"
              type="text"
              label="Mail"
            />
            <Button
              onclick={() => setShowEditEmail(true)}
              classname="!bg-[#F2F2F2] !py-2 !px-4 !rounded-sm !text-xs !font-bold !cursor-pointer !text-[#828282] hover:!bg-[#E0E0E0] !transition hover:!border-none !w-fit"
            >
              Changer l’email
            </Button>
          </div>
        </div>
        <div className="flex flex-row gap-5 items-center !mt-5">
          <Button classname="!rounded-sm">Sauvegarder</Button>
          <Button href="#">Annuler</Button>
        </div>
      </div>
      {showEditEmail && (
        <div className="flex flex-col justify-center items-center bg-[#00000033] fixed top-0 left-0 w-full h-full">
          <div className="flex flex-col p-7 bg-white w-[700px] rounded-xl gap-7">
            <Title level={3} className="font-semibold text-xl text-black">
              Mettre à jour votre adresse e-mail
            </Title>
            <div className="flex flex-col gap-5">
              <Input
                name="email"
                placeholder="Adresse e-mail actuelle"
                type="text"
                label="Adresse e-mail actuelle"
              />
              <Input
                name="new_email"
                placeholder="Nouvelle adresse e-mail"
                type="text"
                label="Nouvelle adresse e-mail"
              />
              <div className="flex flex-row justify-between items-center">
                <Button
                  onclick={() => setShowEditEmail(false)}
                  classname="!bg-[#F2F2F2] !py-2 !px-4 !rounded-sm !text-xs !font-bold !cursor-pointer !text-[#828282] hover:!bg-[#E0E0E0] !transition hover:!border-none !w-fit"
                >
                  Annuler
                </Button>
                <Button classname="!bg-[#087F83] !py-2 !px-4 !rounded-sm !text-xs !font-bold !cursor-pointer !text-white hover:!bg-[#087F83] hover:opacity-70 !transition hover:!border-none !w-fit">
                  Mettre à jour
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
