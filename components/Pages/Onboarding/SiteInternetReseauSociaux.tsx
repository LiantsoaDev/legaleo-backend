import { Input, RadioGroup } from "@/components/Form";
import { Paragraphe, Title } from "@/components/Typography";

const propre_site_internet = [
  "Oui, librement",
  "Non, uniquement une page dédiée sur le site franchiseur",
];

export const SiteInternetReseauSociaux = () => {
  return (
    <div className="flex flex-col gap-3 min-h-screen justify-center px-32 py-20 w-full max-w-5xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8 w-full">
        Site internet et réseaux sociaux
      </Title>
      <Paragraphe className="font-semibold text-2xl">
        Les affiliés peuvent-ils avoir leur propre site internet ?
      </Paragraphe>
      <RadioGroup
        showLogo={true}
        options={propre_site_internet}
        name="site_internet"
      />
      <Input
        type="textarea"
        name="precisions"
        placeholder="Apporter librement des précisions si nécessaire"
      />
    </div>
  );
};
