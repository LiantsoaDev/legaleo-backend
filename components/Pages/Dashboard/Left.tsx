import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../Button";
import { MenuText } from "./MenuText";

export const Left = () => {
  return (
    <div className="w-1/5 h-full px-5 py-0 flex flex-col justify-between">
      <div className="flex flex-col gap-0">
        {/* Add your menu items here */}
        {/* Example: */}
        <Button classname="flex gap-1 mb-10 items-center justify-center py-5 rounded-none !bg-primary !text-black hover:border-none cursor-pointer hover:opacity-85 transition-all duration-300">
          <FontAwesomeIcon icon={faPlus} /> Nouveau projet
        </Button>
        <MenuText href="/dashboard" className="text-white">
          Dashboard
        </MenuText>
        <MenuText href="/dashboard/revision" className="text-white">
          Révison
        </MenuText>
        <MenuText href="/dashboard/revision" className="text-white">
          Contrathèque
        </MenuText>
        <MenuText href="/dashboard/revision" className="text-white">
          Modèles
        </MenuText>
      </div>
      <div className="flex mt-10 flex-col gap-0">
        <MenuText href="/dashboard/revision" className="text-white">
          Documentation
        </MenuText>
        <MenuText href="/dashboard/revision" className="text-white">
          Supports
        </MenuText>
        <MenuText href="/dashboard/revision" className="text-white">
          Privacy & Légal
        </MenuText>
      </div>
    </div>
  );
};
