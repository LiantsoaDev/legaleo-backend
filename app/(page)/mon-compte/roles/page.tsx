import { AuthorisationCard } from "@/components/Pages/MonCompte";
import { Paragraphe, Title } from "@/components/Typography";

const roles = [
  {
    role: "administrateur",
    description:
      "Peut accéder aux documents créés par les membres du même espace de travail, ainsi qu’à d’autres informations. Peut également accéder à tous les paramètres.",
  },
  {
    role: "éditeur",
    description:
      "Peut accéder aux documents créés par les membres du même espace de travail, ainsi qu’à d’autres informations. Peut également accéder à tous les paramètres.",
  },
  {
    role: "lecteur",
    description:
      "Peut accéder aux documents créés par les membres du même espace de travail, ainsi qu’à d’autres informations. Peut également accéder à tous les paramètres.",
  },
];

const page = () => {
  return (
    <div className="flex flex-col gap-10 relative">
      <div className="flex flex-col gap-2">
        <Title level={2} className="font-semibold text-2xl text-black">
          Rôles
        </Title>
        <Paragraphe className="font-medium text-sm text-[#828282]">
          Pretend not to be evil meow to be let out intently stare at the same .
        </Paragraphe>
      </div>
      <div className="flex flex-col gap-5">
        {roles.map((roleItem, index) => (
          <AuthorisationCard
            role={roleItem.role}
            description={roleItem.description}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
