"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Form";
import { Paragraphe, Title } from "@/components/Typography";

const page = () => {
  return (
    <div className="flex flex-col gap-10 relative max-w-2xl">
      <div className="flex flex-col gap-2">
        <Title level={2} className="font-semibold text-2xl text-black">
          Sécurité
        </Title>
        <Paragraphe className="font-medium text-sm text-[#828282]">
          Pretend not to be evil meow to be let out intently stare at the same .
        </Paragraphe>
      </div>
      <div className="flex flex-col gap-5 p-7 border border-[#E3E3E3] rounded-lg shadow">
        <div className="flex flex-col">
          <Title level={3} className="font-semibold text-xl text-black">
            Mot de passe
          </Title>
          <Paragraphe className="font-medium text-xs text-[#828282]">
            Modifier le mot de passe et les questions pour le mot de passe
          </Paragraphe>
        </div>
        <ul className="list-disc pl-5 font-medium text-xs text-[#828282]">
          <li>Doit contenir au moins 6 caractères.</li>
          <li>Ne doit contenir ni caractère &gt;, &lt; ni espace.</li>
          <li>Doit être différent des 12 derniers mots de passe.</li>
        </ul>
        <div className="flex flex-row gap-3">
          <Input
            name="current_password"
            placeholder="Mot de passe actuel"
            type="password"
            label="Ancien mot de passe"
          />
          <Input
            name="nex_password"
            placeholder="Nouveau mot de passe"
            type="password"
            label="Nouveau mot de passe"
          />
        </div>
        <Button classname="!bg-[#F2F2F2] !py-2 !px-4 !rounded-sm !text-xs !font-bold !cursor-pointer !text-[#828282] hover:!bg-[#E0E0E0] !transition hover:!border-none !w-fit">
          Changer le mot de passe
        </Button>
      </div>
    </div>
  );
};

export default page;
