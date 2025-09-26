"use client";
import { Recharge } from "@/utils/types";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Button } from "../Button";
import { Paragraphe, Title } from "../Typography";

interface CreditCardProps {
  restant: string;
  consommer: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  rechargers: Recharge[];
}

export const CreditCard = ({
  restant,
  consommer,
  rechargers,
  setShow,
}: CreditCardProps) => {
  return (
    <div className="z-10 flex flex-col justify-center items-center fixed top-0 bottom-0 w-full right-0 left-0 h-screen bg-[#00000033]">
      <div className="w-3xl bg-white rounded-xl shadow-lg flex flex-col gap-5 p-7 relative">
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute top-5 right-5 text-3xl cursor-pointer"
          onClick={() => setShow(false)}
        />
        <Title level={2} className="font-semibold text-3xl">
          Vos crédits
        </Title>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-end">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.15625 1.875H24.8438C25.2167 1.875 25.5744 2.02316 25.8381 2.28688C26.1018 2.5506 26.25 2.90829 26.25 3.28125C26.25 3.65421 26.1018 4.0119 25.8381 4.27562C25.5744 4.53934 25.2167 4.6875 24.8438 4.6875H23.4375V7.03125C23.4375 8.4139 23.1156 9.77757 22.4972 11.0142C21.8789 12.2509 20.9811 13.3267 19.875 14.1562L19.2506 14.625C19.1924 14.6687 19.1452 14.7253 19.1126 14.7904C19.0801 14.8555 19.0631 14.9272 19.0631 15C19.0631 15.0728 19.0801 15.1445 19.1126 15.2096C19.1452 15.2747 19.1924 15.3313 19.2506 15.375L19.875 15.8438C20.9811 16.6733 21.8789 17.7491 22.4972 18.9858C23.1156 20.2224 23.4375 21.5861 23.4375 22.9688V25.3125H24.8438C25.2167 25.3125 25.5744 25.4607 25.8381 25.7244C26.1018 25.9881 26.25 26.3458 26.25 26.7188C26.25 27.0917 26.1018 27.4494 25.8381 27.7131C25.5744 27.9768 25.2167 28.125 24.8438 28.125H5.15625C4.78329 28.125 4.4256 27.9768 4.16188 27.7131C3.89816 27.4494 3.75 27.0917 3.75 26.7188C3.75 26.3458 3.89816 25.9881 4.16188 25.7244C4.4256 25.4607 4.78329 25.3125 5.15625 25.3125H6.5625V22.9688C6.5625 21.5861 6.88442 20.2224 7.50276 18.9858C8.1211 17.7491 9.01888 16.6733 10.125 15.8438L10.7494 15.375C10.8076 15.3313 10.8548 15.2747 10.8874 15.2096C10.9199 15.1445 10.9369 15.0728 10.9369 15C10.9369 14.9272 10.9199 14.8555 10.8874 14.7904C10.8548 14.7253 10.8076 14.6687 10.7494 14.625L10.125 14.1562C9.01888 13.3267 8.1211 12.2509 7.50276 11.0142C6.88442 9.77757 6.5625 8.4139 6.5625 7.03125V4.6875H5.15625C4.78329 4.6875 4.4256 4.53934 4.16188 4.27562C3.89816 4.0119 3.75 3.65421 3.75 3.28125C3.75 2.90829 3.89816 2.5506 4.16188 2.28688C4.4256 2.02316 4.78329 1.875 5.15625 1.875ZM20.625 4.6875H9.375V7.03125C9.375 8.94938 10.2788 10.755 11.8125 11.9062L12.4369 12.375C14.1881 13.6875 14.1881 16.3125 12.4369 17.625L11.8125 18.0938C11.0558 18.6615 10.4416 19.3975 10.0185 20.2436C9.59547 21.0898 9.37515 22.0228 9.375 22.9688V25.3125H20.625V22.9688C20.6249 22.0228 20.4045 21.0898 19.9815 20.2436C19.5584 19.3975 18.9442 18.6615 18.1875 18.0938L17.5631 17.625C17.1549 17.3198 16.8235 16.9237 16.5953 16.468C16.367 16.0123 16.2481 15.5097 16.2481 15C16.2481 14.4903 16.367 13.9877 16.5953 13.532C16.8235 13.0763 17.1549 12.6802 17.5631 12.375L18.1875 11.9062C18.9442 11.3385 19.5584 10.6025 19.9815 9.75636C20.4045 8.91023 20.6249 7.97725 20.625 7.03125V4.6875Z"
                  fill="url(#paint0_linear_1040_28871)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1040_28871"
                    x1="15"
                    y1="1.875"
                    x2="15"
                    y2="28.125"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#087F83" />
                    <stop offset="0.490385" stopColor="#62E7EB" />
                    <stop offset="1" stopColor="#087F83" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-semibold text-3xl">{restant}</span>
              <span className="font-medium text-[#828282] text-base">
                restantes
              </span>
            </div>
            <span className="font-medium text-[#828282] text-sm">
              {consommer} consommées ce mois-ci
            </span>
          </div>
          <Link href="#" className="font-semibold text-black text-sm underline">
            Voir l’historique de consommation
          </Link>
        </div>
        <div className="w-full h-[1px] block bg-[#E3E3E3]" />
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2.5">
            <Title level={3} className="font-semibold text-xl text-black">
              Recharger vos crédits
            </Title>
            <Paragraphe className="text-base font-medium text-[#828282]">
              Les crédits correspondent au nombre d’heures de révision juridique
              disponible avec votre avocats.{" "}
              <span className="font-bold">1 crédit = 1 heure</span>
            </Paragraphe>
          </div>
          <div className="flex flex-row gap-3.5">
            {rechargers.map((recharge: Recharge, index) => (
              <div
                key={index}
                className="px-5 py-2.5 w-1/4 flex flex-col border border-[#E3E3E3] rounded-lg"
              >
                <span className="font-semibold text-base text-center">
                  {recharge.duration}
                </span>
                <span className="font-semibold text-base text-center">
                  {recharge.prix}
                </span>
              </div>
            ))}
          </div>
        </div>
        <Button classname="!rounded-md">Recharger mes crédits</Button>
      </div>
    </div>
  );
};
