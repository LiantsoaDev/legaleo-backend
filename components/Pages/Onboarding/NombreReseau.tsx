import { MultiSelectGroup } from "../../Form";
import { Paragraphe, Title } from "../../Typography";
import { Notices } from "../../Typography/Tips";

const options = [
  "1-10",
  "10-20",
  "20-30",
  "30-40",
  "40-50",
  "50-60",
  "60-70",
  "70-80",
  "80-90",
  "90-100",
];

export const NombreReseau = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center px-32 py-20 max-w-4xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8">
        Combien de franchisés composent actuellement votre réseau ?
      </Title>
      <Paragraphe className="text-2xl font-manrope font-normal leading-7">
        📊 Réponse estimée acceptable : même une fourchette suffit !
      </Paragraphe>
      <div className="flex flex-col gap-5 w-full mt-10">
        <MultiSelectGroup showLogo={true} options={options} />
      </div>
      <Notices classname="mt-10">
        Cette information nous aide à vous proposer les bons outils.
      </Notices>
    </div>
  );
};
