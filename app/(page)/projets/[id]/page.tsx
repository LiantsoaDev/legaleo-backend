"use client";
import { Editor } from "@/components/blocks/editor-00/editor";
import { Button } from "@/components/Button";
import { Title } from "@/components/Typography";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons/faFolder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const page = () => {
  return (
    <div className="flex flex-col w-screen">
      <div className="flex flex-row justify-between py-5 px-8 bg-white shadow-sm w-full">
        <div className="flex flex-col gap-2">
          <Title className="font-bold">Nouveau document</Title>
          <div className="flex flex-row gap-2 items-center">
            <span className="bg-[#00A5EB1A] py-1 px-2 rounded text-[#00A5EB] text-xs font-medium">
              En cours de signature
            </span>
            <span className="flex flex-row gap-2 items-center text-xs text-[#828282]">
              <FontAwesomeIcon icon={faFolder} className="text-sm" />
              Dossier
            </span>
            <span className="flex flex-row gap-1 items-center text-xs text-[#828282]">
              Mis à jour il y a 2 jour par{" "}
              <span className="font-bold text-xs">Lorem ipsum</span> (vous)
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-5">
          <div className="flex flex-row gap-5 items-center !mt-5">
            <Button classname="!rounded-sm !flex gap-2 items-center !bg-transparent !text-black !border !border-black transition">
              <FontAwesomeIcon icon={faPlus} className="text-sm" />
              Inviter
            </Button>
            <Button classname="!rounded-sm">Envoyer</Button>
          </div>
          <div className="flex flex-row pt-5 items-center gap-5">
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.418 12C22.418 14.25 18.053 18.75 12.668 18.75C7.28297 18.75 2.91797 14.25 2.91797 12C2.91797 9.75 7.28297 5.25 12.668 5.25C18.053 5.25 22.418 9.75 22.418 12Z"
                stroke="#828282"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M16.418 12C16.418 12.9946 16.0229 13.9484 15.3196 14.6517C14.6164 15.3549 13.6625 15.75 12.668 15.75C11.6734 15.75 10.7196 15.3549 10.0163 14.6517C9.31306 13.9484 8.91797 12.9946 8.91797 12C8.91797 11.0054 9.31306 10.0516 10.0163 9.34835C10.7196 8.64509 11.6734 8.25 12.668 8.25C13.6625 8.25 14.6164 8.64509 15.3196 9.34835C16.0229 10.0516 16.418 11.0054 16.418 12Z"
                stroke="#828282"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              width="4"
              height="16"
              viewBox="0 0 4 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.33464 15.5C1.41416 15.5 0.667969 14.7538 0.667969 13.8333C0.667969 12.9129 1.41416 12.1667 2.33464 12.1667C3.25511 12.1667 4.0013 12.9129 4.0013 13.8333C4.0013 14.7538 3.25511 15.5 2.33464 15.5Z"
                fill="#828282"
              />
              <path
                d="M2.33464 9.66667C1.41416 9.66667 0.667969 8.92047 0.667969 8C0.667969 7.07952 1.41416 6.33333 2.33464 6.33333C3.25511 6.33333 4.0013 7.07952 4.0013 8C4.0013 8.92047 3.25511 9.66667 2.33464 9.66667Z"
                fill="#828282"
              />
              <path
                d="M0.667969 2.16667C0.667969 3.08714 1.41416 3.83333 2.33464 3.83333C3.25511 3.83333 4.0013 3.08714 4.0013 2.16667C4.0013 1.24619 3.25511 0.5 2.33464 0.5C1.41416 0.5 0.667969 1.24619 0.667969 2.16667Z"
                fill="#828282"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="mx-auto w-4/5 py-5">
        <Editor />
      </div>
    </div>
  );
};

export default page;
