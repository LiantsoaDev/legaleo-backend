"use client";
import { Button } from "@/components/Button";
import { Invites, Membres } from "@/components/Pages/MonCompte";
import { Paragraphe, Title } from "@/components/Typography";
import { useState } from "react";

const page = () => {
  const [showMembres, setShowMembres] = useState(true);

  return (
    <div className="flex flex-col gap-10 relative">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <Title level={2} className="font-semibold text-2xl text-black">
            Tous les utilisateurs
          </Title>
          <Paragraphe className="font-medium text-sm text-[#828282]">
            Pretend not to be evil meow to be let out intently stare at the same
            .
          </Paragraphe>
        </div>
        <Button
          classname="!w-fit flex items-center gap-2 !rounded-sm bg-white !text-black border border-black cursor-pointer "
          // onclick={() => setCreateNewWorkspace(true)}
        >
          Inviter des membres{" "}
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
      </div>
      <div className="flex flex-row border-b-2 border-[#E3E3E3] w-full">
        <div
          className={`w-fit px-9 py-3 text-center border-b-2 cursor-pointer font-semibold ${
            showMembres ? "border-[#62E7EB]" : "border-[#E3E3E3]"
          } `}
          onClick={() => setShowMembres(true)}
        >
          Membres
        </div>
        <div
          className={`w-fit px-9 py-3 text-center border-b-2 cursor-pointer font-semibold ${
            showMembres ? "border-[#E3E3E3]" : "border-[#62E7EB]"
          } `}
          onClick={() => setShowMembres(false)}
        >
          Invités
        </div>
      </div>
      {showMembres ? <Membres /> : <Invites />}
    </div>
  );
};

export default page;
