"use client";
import {
  faChevronDown,
  faCircle,
  faGear,
  faPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { setCurrentWorkspaceSpace } from "@/lib/features/slice/workspaceSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { Button } from "../Button";
import { UserSettingInfo } from "../User";
import { Logo } from "./Logo";

export const LogoDashboard = () => {
  const dispatch = useAppDispatch();
  const { workspaceName, currentSpace, spaces } = useAppSelector(
    (state) => state.workspace
  );
  const onboardingData = useAppSelector((state) => state.onboarding.formData);
  const spacesFromOnboarding = Array.isArray(onboardingData?.workspaceSpaces)
    ? onboardingData?.workspaceSpaces.filter(Boolean)
    : onboardingData?.brandName
    ? [onboardingData.brandName as string]
    : [];
  const resolvedWorkspaceName =
    workspaceName ||
    (onboardingData?.workspaceName as string | undefined) ||
    (onboardingData?.companyName as string | undefined) ||
    (onboardingData?.enseigne_nom as string | undefined) ||
    "";
  const resolvedSpaces = spaces.length ? spaces : spacesFromOnboarding;
  const [isOpen, setIsOpen] = useState(false);
  const currentWorkspaceSpace =
    currentSpace ||
    resolvedSpaces[0] ||
    resolvedWorkspaceName ||
    "Nom de l'espace de travail";

  const handleSelectSpace = (space: string) => {
    dispatch(setCurrentWorkspaceSpace(space));
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col g px-2.5 py-1 relative w-[19.5em]">
      <div
        className="flex flex-row gap-12 items-center justify-between w-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Logo className="w-50 h-14 invert" />
        <FontAwesomeIcon icon={faChevronDown} className="text-white text-xl" />
      </div>
      {isOpen && (
        <div className="py-5 px-5 flex flex-col gap-0 bg-white shadow-lg rounded-2xl absolute top-20 w-[365px] z-5">
          <div className="flex flex-row gap-2.5 items-center">
            <div className="w-8 h-8 bg-[#FFE9BD] rounded-sm" />
            <div className="flex flex-col justify-between">
              <div className="text-sm font-semibold text-black">
                {currentWorkspaceSpace}
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                Plan en cours{" "}
                <FontAwesomeIcon icon={faCircle} className="text-[3px]" /> X
                membres
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-5">
            {/* <span className="text-gray text-xs">Gérer</span> */}
            <div className="flex flex-row gap-2.5">
              <UserSettingInfo
                icon={<FontAwesomeIcon icon={faGear} />}
                link="/mon-compte/general"
                title="Paramètres"
              />
              <UserSettingInfo
                icon={<FontAwesomeIcon icon={faUsers} />}
                link="/mon-compte/equipe"
                title="Inviter des membres"
              />
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray mt-5" />
          <div className="py-3.5 px-3.5">
            <span className="text-gray text-xs">
              Changer d’environnment de travail
            </span>
            <div className="flex flex-col gap-2.5 mt-3">
              {(resolvedSpaces.length ? resolvedSpaces : [currentWorkspaceSpace]).map((space) => (
                <div
                  key={space}
                  className="flex flex-row items-center gap-2.5 cursor-pointer"
                  onClick={() => handleSelectSpace(space)}
                >
                  <div className="w-5 h-5 bg-gray rounded-sm" />
                  <span className="font-medium text-xs text-black">{space}</span>
                </div>
              ))}
            </div>
            <Button
              isLink
              href="/mon-compte/workspace"
              classname="!bg-transparent !border !border-black !text-black !rounded-xl !text-xs mt-5 flex items-center gap-1"
            >
              <FontAwesomeIcon icon={faPlus} />
              Créer un nouvel environnement de travail
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
