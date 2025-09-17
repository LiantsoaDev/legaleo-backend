import { Button } from "@/components/Button";
import { Title } from "@/components/Typography";

export const ClauseCard = () => {
  return (
    <div className="flex flex-row justify-between border border-[#E3E3E3] rounded-md p-5">
      <div className="flex flex-col w-1/2 gap-5">
        <Title level={3} className="font-semibold text-xl font-manrope">
          Clause de non-concurrence
        </Title>
        <div className="flex flex-row items-center gap-2.5">
          <span className="inline-block px-2 py-1 text-xs font-semibold text-[#087F83] bg-[#E6F2F2] rounded-none">
            Catégorie
          </span>
          <span className="font-medium text-sm text-[#828282]">
            Obligations · Pour Franchiseur
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-5 items-end">
        <span className="inline-block px-2 py-1 text-xs font-semibold text-[#828282] bg-[#F2F2F2] rounded-none w-fit">
          Importé
        </span>
        <div className="flex flex-row gap-1.5 items-center">
          <Button classname="!py-1.5 border !border-[#087F83] !rounded-xs !bg-transparent !text-[#087F83] !text-sm !font-semibold">
            Lire
          </Button>
          <Button classname="!py-1.5 border !border-[#087F83] !rounded-xs !bg-transparent !text-[#087F83] !text-sm !font-semibold">
            Modifier
          </Button>
        </div>
      </div>
    </div>
  );
};
