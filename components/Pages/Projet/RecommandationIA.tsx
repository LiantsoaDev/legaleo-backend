import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RecommandationIACard } from "./RecommandationIACard";

export const RecommandationIA = () => {
  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex flex-row items-center justify-between gap-5">
        <span className="px-1.5 py-1 bg-[#FEE5EA] text-[#B0060F] font-bold text-xs uppercase">
          A RISQUE
        </span>
        <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
      </div>
      <div className="flex flex-col gap-5">
        <RecommandationIACard />
        <RecommandationIACard />
      </div>
    </div>
  );
};
