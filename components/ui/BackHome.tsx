import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface BackProps {
  children: React.ReactNode;
  link: string;
  classname?: string;
}

export const Back = ({ children, classname, link }: BackProps) => {
  return (
    <div className={`relative w-fit ${classname} z-10`}>
      <Link
        href={link}
        className={`flex flex-row gap-2 items-center font-semibold text-xl text-black after:content-[''] after:w-full after:h-[0.5] after:inline-block after:bg-black after:absolute after:bottom-0 w-full`}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="scale-[0.7]" />
        {children}
      </Link>
    </div>
  );
};
