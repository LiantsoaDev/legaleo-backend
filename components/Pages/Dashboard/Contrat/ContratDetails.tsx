import { Button } from "@/components/Button";
import { Title } from "@/components/Typography";
import {
  faChevronDown,
  faExternalLink,
  faFolder,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface ContratDetailsProps {
  contrat: any;
  setSelectedContrat: React.Dispatch<React.SetStateAction<any>>;
}

export const ContratDetails = ({
  contrat,
  setSelectedContrat,
}: ContratDetailsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "brouillon":
        return (
          <span className="px-2 py-2 bg-[#9CA3AF] text-white  w-fit capitalize text-xs font-bold rounded-md">
            {status}
          </span>
        );
      case "relecture interne":
        return (
          <span className="px-2 py-2 bg-[#FACC15] text-white w-fit capitalize text-xs font-bold rounded-md">
            {status}
          </span>
        );
      case "relecture avocat":
        return (
          <span className="px-2 py-2 bg-[#C500DB] text-white w-fit capitalize text-xs font-bold rounded-md">
            {status}
          </span>
        );
      case "en cours de signature":
        return (
          <span className="px-2 py-2 bg-[#3B82F61A] text-[#00A5EB] w-fit capitalize text-xs font-bold rounded-md">
            {status}
          </span>
        );
      case "Modifications requises":
        return (
          <span className="px-2 py-2 bg-[#A3310F] text-white w-fit capitalize text-xs font-bold rounded-md">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-96 flex flex-col gap-4 bg-white py-8 px-6 absolute top-0 right-0 bottom-0 shadow-2xl h-full z-10 rounded-2xl overflow-y-auto overflow-x-hidden">
      <FontAwesomeIcon
        icon={faXmark}
        className="font-medium text-3xl text-black absolute top-5 right-5 cursor-pointer hover:opacity-60"
        onClick={() => setSelectedContrat(null)}
      />
      <Title className="font-semibold text-xl ">
        Contrat de franchise ACME
      </Title>
      <span className="text-[#828282] text-sm font-medium">
        Ce contrat atteint son terme dans 45 jours
      </span>
      {getStatusColor(contrat.status)}
      <div className="flex flex-col gap-1.5">
        <span className="font-semibold text-xs text-[#828282]">
          Co contractant
        </span>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-100 text-teal-700 font-semibold">
            {contrat.coContractor[0]}
          </div>
          <span className="font-medium text-sm">{contrat.coContractor}</span>
          <Link href="#">
            <FontAwesomeIcon
              icon={faExternalLink}
              className="font-medium text-sm text-[#828282]"
            />
          </Link>
        </div>
      </div>
      <Button classname="flex gap-0 items-center justify-center py-2.5 rounded-none !bg-primary !text-black hover:border-none cursor-pointer hover:opacity-85 transition-all duration-300 text-xs font-semibold">
        Ouvrir le projet
      </Button>
      <div className="flex flex-col">
        <div className="flex flex-row justify-center items-center">
          <span className="px-8 py-3 font-semibold text-xs relative after:content-[''] after:absolute after:bottom-0 after:h-0.5 after:bg-primary after:block after:w-full after:left-0 hover:after:bg-primary transition-all duration-150 cursor-pointer">
            Sythèse
          </span>
          <span className="px-8 py-3 font-semibold text-xs relative after:content-[''] after:absolute after:bottom-0 after:h-0.5 after:bg-gray after:block after:w-full after:left-0 hover:after:bg-primary transition-all duration-150 cursor-pointer">
            Activités
          </span>
          <span className="px-8 py-3 font-semibold text-xs relative after:content-[''] after:absolute after:bottom-0 after:h-0.5 after:bg-gray after:block after:w-full after:left-0 hover:after:bg-primary transition-all duration-150 cursor-pointer">
            Notifications
          </span>
        </div>
        <div className="py-5 flex flex-col gap-5">
          <div className="flex flex-row justify-between items-center cursor-pointer">
            <span className="font-semibold text-sm">
              Informations générales
            </span>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-[#828282] font-semibold">
                Date de création
              </span>
              <span className="text-sm font-medium">{contrat.echeance}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-[#828282] font-semibold">
                Date d’échéance
              </span>
              <span className="text-sm font-medium">{contrat.echeance}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-[#828282] font-semibold">
                Propriétaire
              </span>
              <div className="flex flex-row gap-2.5 items-center">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-100 text-teal-700 font-semibold">
                  {contrat.proprietaire[0]}
                </div>
                <span className="font-medium text-sm">
                  {contrat.proprietaire}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-[#828282] font-semibold">
                  Modèle
                </span>
                <div className="flex flex-row gap-4 items-center">
                  <span className="px-3 py-1 bg-[#F2F2F2] text-[#828282] rounded-xs text-xs font-semibold">
                    Contrat de franchise
                  </span>
                  <Link href="#">
                    <FontAwesomeIcon
                      icon={faExternalLink}
                      className="font-medium text-sm text-[#828282]"
                    />
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-[#828282] font-semibold">
                  Dossier
                </span>
                <div className="flex flex-row gap-2.5 items-center text-sm font-medium">
                  <FontAwesomeIcon icon={faFolder} className="text-[#828282]" />
                  RH
                  <Link href="#">
                    <FontAwesomeIcon
                      icon={faExternalLink}
                      className="font-medium text-sm text-[#828282]"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-0.5 bg-gray mb-3.5" />
        <div className="py-5 flex flex-col gap-5">
          <div className="flex flex-row justify-between items-center cursor-pointer">
            <span className="font-semibold text-sm">
              Échéancier & dates clés
            </span>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-[#828282] font-semibold">
                Date d’envoi pour signature
              </span>
              <span className="text-sm font-medium">{contrat.echeance}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-[#828282] font-semibold">
                Date de début du contrat
              </span>
              <span className="text-sm font-medium">{contrat.echeance}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-[#828282] font-semibold">
                Renouvellement
              </span>
              <span className="text-sm font-semibold">Indéterminée</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-[#828282] font-semibold">
                Durée
              </span>
              <span className="text-sm font-semibold">Tacite</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
