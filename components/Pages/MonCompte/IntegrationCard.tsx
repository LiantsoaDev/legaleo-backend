"use client";
import { Button } from "@/components/Button";
import { Paragraphe, Title } from "@/components/Typography";
import Image from "next/image";
import { useState } from "react";

interface IntegrationCardProps {
  title: string;
  description: string;
  category: string;
  imageUrl?: any;
  link: string;
  classname?: string;
  isInFacturationPage?: boolean;
  workspace?: string;
}

export const IntegrationCard = ({
  title,
  description,
  category,
  imageUrl,
  link,
  classname,
  isInFacturationPage = false,
  workspace,
}: IntegrationCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      {isInFacturationPage ? (
        <div
          className={`flex w-1/3 flex-row justify-between px-5 py-7 border border-[#E3E3E3] shadow-sm rounded-md relative ${classname}`}
        >
          <div className="flex flex-col gap-5">
            <div className="w-10 h-10 bg-[#86A2A3] rounded-[3px]" />
            {/* <Image
              src={imageUrl}
              alt={title}
              width={60}
              height={60}
              className="rounded-xl mt-5"
            /> */}
            <div className="flex flex-col gap-1">
              <Title className="font-semibold text-base text-black" level={3}>
                {title}
              </Title>
              <Paragraphe className="font-medium text-sm text-[#1F120E]">
                {workspace}
              </Paragraphe>
            </div>
            <Button
              onclick={() => setShowDetails(true)}
              classname="!bg-[#F2F2F2] !py-2 !px-4 !rounded-sm !text-xs !font-bold !cursor-pointer !text-[#828282] hover:!bg-[#E0E0E0] !transition hover:!border-none !w-fit"
            >
              Gérer l’intégration
            </Button>
          </div>
          <div className="w-1/2 flex flex-col justify-end">
            <Paragraphe className="font-bold text-right text-sm text-[#1F120E]">
              2 $US <span className="block">per item</span>
            </Paragraphe>
          </div>
        </div>
      ) : (
        <div
          className={`flex flex-col gap-5 px-5 py-7 border border-[#E3E3E3] shadow-sm rounded-md relative ${classname}`}
        >
          <span className="font-semibold text-[10px] text-[#087F83] px-2 py-1 bg-[#E6F2F2] absolute top-7 right-5">
            {category}
          </span>
          <Image
            src={imageUrl}
            alt={title}
            width={60}
            height={60}
            className="rounded-xl mt-5"
          />
          <div className="flex flex-col gap-1">
            <Title className="font-semibold text-base text-black" level={3}>
              {title}
            </Title>
            <Paragraphe className="font-medium text-sm text-[#1F120E]">
              {description}
            </Paragraphe>
          </div>
          <Button
            onclick={() => setShowDetails(true)}
            classname="!bg-[#F2F2F2] !py-2 !px-4 !rounded-sm !text-xs !font-bold !cursor-pointer !text-[#828282] hover:!bg-[#E0E0E0] !transition hover:!border-none !w-fit"
          >
            Gérer l’intégration
          </Button>
        </div>
      )}
      {showDetails && (
        <div className="flex w-full bg-[#00000033] fixed top-0 left-0 bottom-0 right-0 flex-col justify-center items-center z-10">
          <div className="w-5xl flex flex-col gap-5 p-7 bg-white rounded-lg shadow">
            <div className="flex flex-row gap-7 items-center">
              <Image
                src={imageUrl}
                alt={title}
                width={60}
                height={60}
                className="rounded-xl mt-5"
              />
              <div className="flex flex-col gap-2">
                <Title level={4} className="font-semibold text-xl text-black">
                  {title}
                </Title>
                <Paragraphe>{description}</Paragraphe>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
