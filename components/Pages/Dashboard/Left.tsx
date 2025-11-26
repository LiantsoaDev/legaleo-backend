"use client";
import { Title } from "@/components/Typography";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { Button } from "../../Button";
import { MenuText } from "./MenuText";

interface LeftProps {
  menuItems: { name: string; href: string }[];
  subtitles?: string;
  subtitlesMenu?: { name: string; href: string }[];
  isClient?: boolean;
}

export const Left = ({
  menuItems,
  subtitles,
  subtitlesMenu,
  isClient = true,
}: LeftProps) => {
  const pathname = usePathname();
  return (
    <div className="w-1/5 fill-available px-5 py-0 flex flex-col justify-between">
      <div className="flex flex-col gap-0">
        {isClient && (
          <Button
            isLink
            href="/projets/nouveau"
            classname="flex gap-1 mb-10 items-center justify-center py-5 rounded-sm !bg-primary !text-black hover:border-none cursor-pointer hover:opacity-85 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faPlus} /> Nouveau projet
          </Button>
        )}
        {menuItems.map((item) => (
          <MenuText
            key={item.name}
            href={item.href}
            className="text-white"
            isActive={pathname === item.href}
          >
            {item.name}
          </MenuText>
        ))}
        {subtitles && (
          <div className="flex flex-col gap-3 mt-10">
            <Title className="text-[#FFFFFF80] text-sm font-semibold uppercase">
              {subtitles}
            </Title>
            <div className="flex flex-col gap-0">
              {subtitlesMenu?.map((item) => (
                <MenuText
                  key={item.name}
                  href={item.href}
                  className="text-white"
                  isActive={pathname === item.href}
                >
                  {item.name}
                </MenuText>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex mt-10 flex-col gap-0">
        <MenuText
          href="/dashboard/revision"
          className="text-white"
          isActive={pathname === "/dashboard/documentation"}
        >
          Documentation
        </MenuText>
        <MenuText
          href="/dashboard/aide"
          className="text-white"
          isActive={pathname === "/dashboard/aide"}
        >
          Aide
        </MenuText>
      </div>
    </div>
  );
};
