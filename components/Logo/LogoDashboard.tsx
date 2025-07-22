import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Logo } from "./Logo";

export const LogoDashboard = () => {
  return (
    <div className="flex flex-col px-2.5 py-1">
      <div className="flex flex-row items-center justify-around w-full">
        <Logo className="w-50 h-10 invert" />
        <FontAwesomeIcon icon={faChevronDown} className="text-white text-xl" />
      </div>
    </div>
  );
};
