import { RadioGroup } from "../Form";
import { Paragraphe, Title } from "../Typography";
import { Notices } from "../Typography/Tips";

const options = [
  "✅ Oui, je souhaite un accompagnement personnalisé",
  "❌ Non, je suis autonome pour l’instant",
];

export const Relecture = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center px-32 py-20 max-w-4xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8">
        Souhaitez-vous une relecture ou un accompagnement juridique personnalisé
        ?
      </Title>
      <Paragraphe className="text-2xl font-manrope font-normal leading-7">
        Nos avocats partenaires peuvent vous aider à rédiger, relire ou valider
        vos documents.
      </Paragraphe>
      <div className="flex flex-col gap-5 w-full mt-10">
        <RadioGroup options={options} name="autorise_relecture" />
      </div>
      <Notices classname="mt-10">Vous pouvez y revenir plus tard</Notices>
    </div>
  );
};
