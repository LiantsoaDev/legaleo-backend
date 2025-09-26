import Link from "next/link";
import React from "react";

interface UserSettingInfoProps {
  icon: React.ReactNode;
  title: string;
  link: string;
}

export const UserSettingInfo = ({
  icon,
  title,
  link = "/",
}: UserSettingInfoProps) => {
  return (
    <Link
      href={link}
      className="flex flex-row text-[#828282] gap-1.5 items-center hover:underline px-2 py-2 border border-gray rounded-lg text-xs font-semibold"
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
};
