import { Paragraphe } from "@/components/Typography";
import Image from "next/image";

interface WorkspaceCardProps {
  icon: any;
  name: string;
  members: number;
}

export const WorkspaceCard = ({ icon, name, members }: WorkspaceCardProps) => {
  return (
    <div className="flex flex-col gap-5 border border-[#E3E3E3] rounded-lg p-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-2.5 items-center">
          <Image src={icon} alt="Workspace picture" width={40} height={40} />
          <Paragraphe className="font-semibold text-base text-black">
            {name}
          </Paragraphe>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.66675 2.66699H4.00008C3.64646 2.66699 3.30732 2.80747 3.05727 3.05752C2.80722 3.30756 2.66675 3.6467 2.66675 4.00033V12.0003C2.66675 12.3539 2.80722 12.6931 3.05727 12.9431C3.30732 13.1932 3.64646 13.3337 4.00008 13.3337H12.0001C12.3537 13.3337 12.6928 13.1932 12.9429 12.9431C13.1929 12.6931 13.3334 12.3539 13.3334 12.0003V9.33366M8.00008 8.00033L13.3334 2.66699M13.3334 2.66699V6.00033M13.3334 2.66699H10.0001"
            stroke="#C5C5C5"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="font-medium text-sm text-black">{members} membres</span>
    </div>
  );
};
