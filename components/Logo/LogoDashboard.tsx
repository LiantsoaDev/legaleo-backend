"use client";
import {
  faChevronDown,
  faGear,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { UserSettingInfo } from "../User";
import { Logo } from "./Logo";

export const LogoDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col px-2.5 py-1 relative">
      <div
        className="flex flex-row items-center justify-around w-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Logo className="w-50 h-10 invert" />
        <FontAwesomeIcon icon={faChevronDown} className="text-white text-xl" />
      </div>
      {isOpen && (
        <div className="py-3.5 px-3.5 flex flex-col gap-0 bg-white shadow-lg rounded-2xl absolute top-20 w-[20rem] z-5">
          <div className="flex flex-row gap-2.5 items-center">
            <div className="w-8 h-8 bg-[#FFE9BD] rounded-sm" />
            <div className="flex flex-col justify-between">
              <div className="text-sm font-semibold text-black">
                Nom du groupe
              </div>
              <div className="text-xs text-gray-500">X membres</div>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <span className="text-gray text-xs">Gérer</span>
            <div className="flex flex-col gap-2.5">
              <UserSettingInfo
                icon={<FontAwesomeIcon icon={faGear} />}
                link="/setting"
                title="Paramètres"
              />
              <UserSettingInfo
                icon={<FontAwesomeIcon icon={faUsers} />}
                link="/invite"
                title="Inviter des membres"
              />
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray mt-5" />
          <div className="py-3.5 px-3.5">
            <span className="text-gray text-xs">Changer d’environment</span>
            <div className="flex flex-col gap-2.5 mt-3">
              <div className="flex flex-row items-center gap-2.5 cursor-pointer">
                <div className="w-8 h-8 bg-[#D9FDFB] rounded-sm" />
                <span className="font-medium text-xs text-black">
                  Nom du groupe
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
