"use client";
import { Title } from "@/components/Typography";
import { usePathname } from "next/navigation";
import { MenuAccountText } from "../Dashboard/MenuText";

const navMenu = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Contrat en cours", href: "/dashboard/contrat" },
  { name: "Contrathèque", href: "/dashboard/contratheque" },
  { name: "Cocontractant", href: "/dashboard/cocontractant" },
  { name: "Modèles", href: "/dashboard/models" },
  { name: "Clauses dynamiques", href: "/dashboard/clause-dynamiques" },
  { name: "Assistant IA", href: "/dashboard/assistance-ia" },
];

const monProfil = [
  { name: "Mon Compte", href: "/mon-compte" },
  { name: "Sécurité", href: "/mon-compte/securite" },
  { name: "Notification", href: "/mon-compte/notification" },
];

const espace_de_travail = [
  { name: "Général", href: "/mon-compte/general" },
  { name: "Équipe", href: "/mon-compte/equipe" },
  { name: "Intégrations", href: "/mon-compte/integrations" },
];

const organisation = [
  { name: "Workspaces", href: "/mon-compte/workspace" },
  { name: "Utilisateurs", href: "/mon-compte/utilisateurs" },
  { name: "Rôles", href: "/mon-compte/roles" },
  { name: "Facturation", href: "/mon-compte/facturation" },
  { name: "Paiement", href: "/mon-compte/paiement" },
];

export const Left = () => {
  const pathname = usePathname();
  return (
    <div className="w-1/5 fill-available px-5 py-2.5 flex flex-col justify-between">
      <div className="flex flex-col gap-0">
        <div className="flex flex-col gap-1 mb-8">
          <Title className="font-bold text-sm uppercase text-white mb-2.5">
            Mon profil
          </Title>
          {monProfil.map((item) => (
            <MenuAccountText
              key={item.name}
              href={item.href}
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4575 0.580114C9.56575 0.022774 8.43425 0.022775 7.5425 0.580114L2.0425 4.01761C1.23845 4.52015 0.75 5.40144 0.75 6.34961V11.6507C0.75 12.5989 1.23845 13.4802 2.0425 13.9827L7.5425 17.4202C8.43425 17.9775 9.56575 17.9775 10.4575 17.4202L15.9575 13.9827C16.7615 13.4802 17.25 12.5989 17.25 11.6507V6.34961C17.25 5.40144 16.7615 4.52014 15.9575 4.01761L10.4575 0.580114Z"
                    fill="white"
                  />
                </svg>
              }
            >
              {item.name}
            </MenuAccountText>
          ))}
        </div>
        <div className="flex flex-col gap-1 mb-8">
          <Title className="font-bold text-sm uppercase text-white mb-2.5">
            Espace de travail actuel
          </Title>
          {espace_de_travail.map((item) => (
            <MenuAccountText
              key={item.name}
              href={item.href}
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4575 0.580114C9.56575 0.022774 8.43425 0.022775 7.5425 0.580114L2.0425 4.01761C1.23845 4.52015 0.75 5.40144 0.75 6.34961V11.6507C0.75 12.5989 1.23845 13.4802 2.0425 13.9827L7.5425 17.4202C8.43425 17.9775 9.56575 17.9775 10.4575 17.4202L15.9575 13.9827C16.7615 13.4802 17.25 12.5989 17.25 11.6507V6.34961C17.25 5.40144 16.7615 4.52014 15.9575 4.01761L10.4575 0.580114Z"
                    fill="white"
                  />
                </svg>
              }
            >
              {item.name}
            </MenuAccountText>
          ))}
        </div>
        <div className="flex flex-col gap-1 mb-8">
          <Title className="font-bold text-sm uppercase text-white mb-2.5">
            Organisation
          </Title>
          {organisation.map((item) => (
            <MenuAccountText
              key={item.name}
              href={item.href}
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4575 0.580114C9.56575 0.022774 8.43425 0.022775 7.5425 0.580114L2.0425 4.01761C1.23845 4.52015 0.75 5.40144 0.75 6.34961V11.6507C0.75 12.5989 1.23845 13.4802 2.0425 13.9827L7.5425 17.4202C8.43425 17.9775 9.56575 17.9775 10.4575 17.4202L15.9575 13.9827C16.7615 13.4802 17.25 12.5989 17.25 11.6507V6.34961C17.25 5.40144 16.7615 4.52014 15.9575 4.01761L10.4575 0.580114Z"
                    fill="white"
                  />
                </svg>
              }
            >
              {item.name}
            </MenuAccountText>
          ))}
        </div>
      </div>
    </div>
  );
};
