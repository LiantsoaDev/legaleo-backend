import { Button } from "../Button";
import { Paragraphe, Title } from "../Typography";
import { Notices } from "../Typography/Tips";

interface WelcomeCardProps {
  setShowWelcomeCard: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WelcomeCard = ({ setShowWelcomeCard }: WelcomeCardProps) => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#010711c9] fixed bottom-0 right-0 left-0 z-10 h-screen">
      <div className="flex flex-row items-center w-3/5 shadow-lg">
        <div className="flex flex-col justify-center items-center bg-white px-12 py-28 w-3/5 rounded-l-2xl">
          <span className="text-center font-bold text-3xl mb-7">🎉</span>
          <Title
            level={2}
            className="text-center font-bold text-2xl mb-5 max-w-md"
          >
            Bienvenue sur votre espace Legaleo !
          </Title>
          <Paragraphe className="text-center text-lg font-semibold mb-5 max-w-md">
            Cliquez sur “Explorer mon tableau de bord” pour lancer l’assistant
            de création.
          </Paragraphe>
          <Notices classname="text-center mb-5">
            Vos infos sont stockées en toute sécurité.
          </Notices>
          <Button
            onclick={() => setShowWelcomeCard(false)}
            classname="cursor-pointer"
          >
            Explorer mon tableau de bord
          </Button>
        </div>
        <div className="flex flex-col justify-center items-end w-2/5 bg-primary h-full relative rounded-r-2xl">
          <div className="w-4/5 bg-white h-3/5 rounded-l-2xl"></div>
        </div>
      </div>
    </div>
  );
};
