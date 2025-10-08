import { Title } from "@/components/Typography";
import { HistoriqueCard } from "./HistoriqueCard";

const historiques = [
  {
    date: "30 septembre à 12:26",
    isCurrentVersion: true,
    editeur: "Cloe Vercellino",
  },
  {
    date: "30 septembre à 12:26",
    isCurrentVersion: false,
    editeur: "Cloe Vercellino",
  },
  {
    date: "30 septembre à 12:26",
    isCurrentVersion: false,
    editeur: "Cloe Vercellino",
  },
  {
    date: "30 septembre à 12:26",
    isCurrentVersion: false,
    editeur: "Cloe Vercellino",
  },
];

export const Historique = () => {
  return (
    <div className="flex flex-col gap-0">
      <Title
        className="font-bold text-base text-black p-5 border-b border-gray"
        level={3}
      >
        Historique des versions
      </Title>
      <div className="flex flex-col gap-0">
        <Title className="font-bold text-[#828282] text-sm p-5 bg-white border-b border-gray">
          Septembre
        </Title>
        <div className="flex flex-col gap-0">
          {historiques.map((historique, index) => (
            <HistoriqueCard
              key={index}
              date={historique.date}
              editeur={historique.editeur}
              isCurrentVersion={historique.isCurrentVersion}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
