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
      className="flex flex-row text-[#828282] gap-1.5 items-center hover:underline"
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
};
