import { Button } from "@/components/Button";
import { Paragraphe, Title } from "@/components/Typography";

interface AuthorisationCardProps {
  role: string;
  description: string;
}

export const AuthorisationCard = ({
  role,
  description,
}: AuthorisationCardProps) => {
  return (
    <div className="flex justify-between w-2/3 items-center">
      <div className="flex flex-col gap-2 w-3/5">
        <Title className="font-semibold text-black text-base" level={4}>
          Administrateur
        </Title>
        <Paragraphe className="font-medium text-sm text-[#1F120E]">
          Peut accéder aux documents créés par les membres du même espace de
          travail, ainsi qu’à d’autres informations. Peut également accéder à
          tous les paramètres.
        </Paragraphe>
      </div>
      <Button
        href="/mon-compte/authorisations"
        isLink
        classname="!bg-[#F2F2F2] !py-2 !px-4 !rounded-sm !text-xs !font-bold !cursor-pointer !text-[#828282] hover:!bg-[#E0E0E0] !transition hover:!border-none !w-fit"
      >
        Consulter les autorisations
      </Button>
    </div>
  );
};
