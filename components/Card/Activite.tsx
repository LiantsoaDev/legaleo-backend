import { Paragraphe } from "../Typography";

interface ActiviteProps {
  classname?: string;
  status: string;
  children: React.ReactNode;
}
export const Activite = ({ classname, status, children }: ActiviteProps) => {
  return (
    <div className={`w-1/2 flex flex-col gap-2.5 rounded-xl p-5 ${classname}`}>
      <Paragraphe className="font-normal text-black text-xl">
        {children}
      </Paragraphe>
      <span className="font-semibold text-sm text-black">{status}</span>
    </div>
  );
};
