import { Button } from "@/components/Button";

export const ClauseCard = () => {
  return (
    <div className="flex flex-col gap-3 rounded-sm shadow px-3.5 py-3.5">
      <span className="px-2 py-1 bg-[#E6F2F2] text-[#087F83] font-semibold text-[10px] rounded-xs w-fit">
        Catégorie
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-black font-semibold">
          Clause de non-concurrence
        </span>
        <span className="text-xs text-[#828282] font-medium">
          Obligations · Pour Franchiseur
        </span>
      </div>
      <div className="flex flex-row gap-2.5 items-center">
        <Button classname="!w-1/2 !bg-transparent !border !border-[#087F83] !text-[#087F83] !rounded-sm !font-bold !text-[10px]">
          Aperçu
        </Button>
        <Button classname="!rounded-sm !bg-[#087F83] !w-1/2 !font-bold !text-[10px] hover:!text-white hover:!border-none">
          Inserer
        </Button>
      </div>
    </div>
  );
};
