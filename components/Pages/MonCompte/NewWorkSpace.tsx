"use client";
import img from "@/assets/images/template.png";
import { Button } from "@/components/Button";
import { Input } from "@/components/Form";
import { Paragraphe, Title } from "@/components/Typography";
import Image from "next/image";
import { useState } from "react";

export const NewWorkSpace = () => {
  const [createNewWorkspace, setCreateNewWorkspace] = useState(false);
  return (
    <>
      <Button
        classname="!w-fit flex items-center gap-2 !rounded-sm bg-white !text-black border border-black cursor-pointer "
        onclick={() => setCreateNewWorkspace(true)}
      >
        Créer un workspace{" "}
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
        >
          <g clipPath="url(#clip0_862_13116)">
            <path
              d="M8.99972 17.3578C13.6153 17.3578 17.3569 13.6163 17.3569 9.0007C17.3569 4.38518 13.6153 0.643555 8.99972 0.643555C4.3842 0.643555 0.642578 4.38518 0.642578 9.0007C0.642578 13.6163 4.3842 17.3578 8.99972 17.3578Z"
              stroke="#1F120E"
              strokeWidth="1.28571"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.99976 5.14355V12.8578"
              stroke="#1F120E"
              strokeWidth="1.28571"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.14258 9.00098H12.8569"
              stroke="#1F120E"
              strokeWidth="1.28571"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_862_13116">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Button>
      {createNewWorkspace && (
        <div className="flex flex-col justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-[#00000033] w-full h-full">
          <div className="flex flex-col gap-7 bg-white p-7 rounded-2xl w-1/2">
            <div className="flex flex-col justify-center items-center gap-4">
              <Image
                src={img}
                alt="workspace"
                className="rounded-full"
                width={80}
                height={80}
              />
              <label
                htmlFor="couverture_workspace"
                className="bg-[#F2F2F2] py-2 px-4 rounded-sm text-xs font-bold cursor-pointer text-[#828282] hover:bg-[#E0E0E0] transition"
              >
                Importer une image
              </label>
              <input
                type="file"
                name="couverture_workspace"
                id="couverture_workspace"
                className="hidden"
              />
            </div>
            <div className="flex flex-col max-w-1/2 text-center gap-2 mx-auto">
              <Title className="font-semibold text-xl text-black">
                Créer un nouveau workspace
              </Title>
              <Paragraphe className="font-medium text-sm text-[#828282]">
                Vous pourrez à tout moment modifier ses informations et inviter
                des membres à rejoindre cet espace.
              </Paragraphe>
            </div>
            <Input
              type="text"
              name="new_workspace"
              placeholder="Nom de l’espace de travail"
              label="Nom de l’espace de travail"
              nombreCaractere={250}
            />
            <div className="flex flex-row justify-between items-center">
              <Button
                onclick={() => setCreateNewWorkspace(false)}
                classname="!bg-[#F2F2F2] !py-2 !px-4 !rounded-sm !text-sm !font-bold !cursor-pointer !text-[#828282] hover:!bg-[#E0E0E0] !transition hover:!border-none !w-fit"
              >
                Annuler
              </Button>
              <Button classname="!bg-[#087F83] !py-2 !px-4 !rounded-sm !text-sm !font-bold !cursor-pointer !text-white hover:!bg-[#087F83] hover:opacity-70 !transition hover:!border-none !w-fit">
                Créer
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
