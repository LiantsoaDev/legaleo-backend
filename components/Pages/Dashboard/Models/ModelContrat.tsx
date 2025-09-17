"use client";
import { Button } from "@/components/Button";
import { Paragraphe, Title } from "@/components/Typography";
import Image from "next/image";
import { redirect } from "next/navigation";

interface ModelContratProps {
  type: string;
  logo: any;
  nom: string;
  description: string;
}

export const ModelContrat = ({
  description,
  type,
  nom,
  logo,
}: ModelContratProps) => {
  return (
    <div className="py-2.5 px-3.5 border border-[#E3E3E3] rounded-lg w-[280px]">
      <div className="flex flex-row justify-between items-center">
        <span className="py-1 px-2 bg-[#E6F2F2] text-[#087F83] text-[10px] font-semibold">
          {type}
        </span>
        <div className="flex flex-row items-center gap-1">
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.83856 9.35025C2.72081 9.132 2.72081 8.86725 2.83856 8.649C4.25756 6.02475 6.87881 3.75 9.50006 3.75C12.1213 3.75 14.7426 6.02475 16.1616 8.64975C16.2793 8.868 16.2793 9.13275 16.1616 9.351C14.7426 11.9753 12.1213 14.25 9.50006 14.25C6.87881 14.25 4.25756 11.9753 2.83856 9.35025Z"
              stroke="#A3CACB"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.091 7.40901C11.9697 8.28769 11.9697 9.71231 11.091 10.591C10.2123 11.4697 8.78769 11.4697 7.90901 10.591C7.03033 9.71231 7.03033 8.28769 7.90901 7.40901C8.78769 6.53033 10.2123 6.53033 11.091 7.40901"
              stroke="#A3CACB"
              strokeWidth="1.07145"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              d="M6.92407 6.31549L8.83514 2.65301C8.96441 2.40531 9.22064 2.25 9.50004 2.25C9.77945 2.25 10.0357 2.40531 10.1649 2.65301L12.076 6.31549"
              stroke="#A3CACB"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.92401 6.31543L3.37624 6.91269C3.1007 6.95908 2.8738 7.15479 2.78746 7.42053C2.70112 7.68626 2.76965 7.97797 2.9653 8.17745L5.6053 10.8691"
              stroke="#A3CACB"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.0759 6.31543L15.6237 6.91269C15.8992 6.95908 16.1261 7.15479 16.2125 7.42053C16.2988 7.68626 16.2303 7.97797 16.0346 8.17745L13.3946 10.8691"
              stroke="#A3CACB"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.60533 10.8691L5.00863 14.8884C4.96761 15.1648 5.08363 15.441 5.30968 15.6053C5.53574 15.7695 5.83434 15.7945 6.08452 15.67L9.50008 13.9712"
              stroke="#A3CACB"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.3947 10.8691L13.9915 14.8884C14.0325 15.1648 13.9165 15.441 13.6904 15.6053C13.4643 15.7695 13.1657 15.7945 12.9156 15.67L9.5 13.9712"
              stroke="#A3CACB"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              d="M6.14595 3H14.75C15.5784 3 16.25 3.67157 16.25 4.5V13.5C16.25 14.3284 15.5784 15 14.75 15H4.25C3.42157 15 2.75 14.3284 2.75 13.5V4.5C2.75 3.67157 3.42157 3 4.25 3H6.14595C6.71411 3 7.2335 3.321 7.48759 3.82918L8.36571 5.58541C8.49275 5.83949 8.75243 5.99999 9.0365 6H16.25"
              stroke="#A3CACB"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col gap-3.5 items-center">
        <Image src={logo} alt="Models logo" className="w-12 h-12" />
        <div className="flex flex-col gap-1.5">
          <Title className="font-semibold text-black text-sm text-center">
            {nom}
          </Title>
          <Paragraphe className="text-[#828282] font-medium text-xs text-center !leading-[15px]">
            {description}
          </Paragraphe>
        </div>
        <Button
          classname="w-full rounded-sm !bg-[#087F83] cursor-pointer hover:border-none font-semibold text-sm"
          onclick={() => redirect("/projets/nouveau/models/2/personnaliser")}
        >
          Commencer
        </Button>
      </div>
    </div>
  );
};
