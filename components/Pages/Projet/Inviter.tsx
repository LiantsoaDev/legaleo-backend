import { Button } from "@/components/Button";
import { Input } from "@/components/Form";
import { Title } from "@/components/Typography";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InviteUser } from "./InviteUser";

interface InviterProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Inviter = ({ setShow }: InviterProps) => {
  return (
    <div className="flex flex-col justify-center items-center fixed inset-0 bg-[#00000033] z-20">
      <div className="w-[700px] bg-white rounded-md shadow flex flex-col gap-5 p-7 relative">
        <svg
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-7 right-7 cursor-pointer"
          onClick={() => setShow(false)}
        >
          <path
            d="M17 17.5L1 1.5M17 1.5L1 17.5"
            stroke="#828282"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <Title className="font-semibold text-2xl text-black">
          Collaborer sur “Nom du document”
        </Title>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-3.5 items-center">
            <Input
              type="email"
              placeholder="Ajouter un nom ou une adresse email..."
              name="email_invite"
            />
            <Button classname="!rounded-sm !flex gap-2 items-center !bg-transparent !text-black !border !border-black transition">
              Inviter
            </Button>
          </div>
          <div className="flex flex-col gap-7">
            <Title className="font-semibold text-base text-[#828282]">
              Utilisateurs avec accès
            </Title>
            <div className="flex flex-col gap-5">
              <InviteUser currentRole="proprietaire" />
              <InviteUser currentRole="editeur" />
              <InviteUser currentRole="lecteur" />
            </div>
          </div>
        </div>
        <Button
          classname="!flex !flex-row !items-center !gap-1.5 !bg-transparent border !text-[#087F83] !border-[#087F83] !rounded-md w-fit !text-sm !py-1.5 cursor-pointer !mt-5"
          onclick={(e) => {
            navigator.clipboard.writeText(window.location.href);
          }}
        >
          <FontAwesomeIcon icon={faLink} />
          Copier le lien
        </Button>
      </div>
    </div>
  );
};
