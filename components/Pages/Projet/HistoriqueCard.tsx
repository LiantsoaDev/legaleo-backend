import { Title } from "@/components/Typography";

interface HistoriqueCardProps {
  date: string;
  editeur: string;
  isCurrentVersion?: boolean;
}

export const HistoriqueCard = ({
  date,
  editeur,
  isCurrentVersion = false,
}: HistoriqueCardProps) => {
  return (
    <div className="bg-white px-5 py-2.5 hover:bg-[#F2F2F2] cursor-pointer">
      <div className="flex flex-col gap-2.5 bg-white shadow rounded-sm py-2.5 px-3.5">
        <Title className="font-semibold text-xs text-[#087F83]">{date}</Title>
        <div className="flex flex-col gap-1.5">
          {isCurrentVersion && (
            <span className="font-medium text-[10px] text-[#828282]">
              Version actuelle
            </span>
          )}
          <span className="text-[10px] font-medium">
            {" "}
            <span className="inline-block rounded-full bg-[#545FFF] h-1.5 w-1.5" />{" "}
            {editeur}
          </span>
        </div>
      </div>
    </div>
  );
};
