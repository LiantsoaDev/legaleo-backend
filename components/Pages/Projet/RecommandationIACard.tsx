"use client";
import { Title } from "@/components/Typography";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface RecommandationIACardProps {
  title?: string;
  status?: string;
  textToReplace?: string;
  needToReplace?: string;
}

export const RecommandationIACard = ({
  status,
  title,
  textToReplace,
  needToReplace,
}: RecommandationIACardProps) => {
  const [showReplacement, setShowReplacement] = useState(false);
  return (
    <div className="flex flex-col gap-5 py-3.5 px-2.5 rounded-md shadow bg-[#9CA3AF0D]">
      <div className="flex flex-row gap-3.5 items-center">
        <FontAwesomeIcon
          icon={faCheck}
          className="text-[#828282] px-1.5 py-1.5 hover:bg-[#F2F2F2] rounded-xs"
        />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <Title className="font-semibold text-xs text-black" level={3}>
              Lorem ipsum dolor
            </Title>
            <span className="px-1.5 py-1 bg-[#FEE5EA] text-[#B0060F] font-bold text-xs uppercase">
              A RISQUE
            </span>
          </div>
          <span
            className="font-medium text-xs cursor-pointer text-[#828282]"
            onClick={() => setShowReplacement(!showReplacement)}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </span>
        </div>
      </div>
      {showReplacement && (
        <div className="flex flex-col gap-2 rounded-sm shadow">
          <div className="text-white font-bold text-xs rounded-t-sm bg-[#087F83] px-3.5 py-1">
            Recommendation de l’ia
          </div>
          <div className="py-3.5 px-2.5">
            <ul className="font-semibold text-xs text-[#087F83] list-disc pl-5">
              <li>Lorem ipsum dolor sit amet, consectetur</li>
              <li>Lorem ipsum dolor sit amet, consectetur</li>
              <li>Lorem ipsum dolor sit amet, consectetur</li>
              <li>Lorem ipsum dolor sit amet, consectetur</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
