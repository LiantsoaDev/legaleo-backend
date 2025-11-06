import { RadioGroup } from "@/components/Form";
import { Title } from "@/components/Typography";
import { IntegrationCard } from "./IntegrationCard";
const mesIntegration = [
  {
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Catégorie",
    link: "#",
  },
  {
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Catégorie",
    link: "#",
  },
  {
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Catégorie",
    link: "#",
  },
];

const options = [
  "Tous",
  "Ventes et CRM",
  "Resources Humaines",
  "Passerelles de paiement",
  "API",
];

export const Decouvrir = () => {
  return (
    <div className="flex flex-col gap-5">
      <RadioGroup
        options={options}
        name="autorise_relecture"
        classContainer="flex gap-1 flex-wrap justify-start"
        classLabel="!py-2 text-xs bg-[#F2F8F8] text-[#86A2A3] border-none"
        classSelected="!bg-[#86A2A3]"
      />
      <div className="flex flex-col gap-3">
        <Title className="font-semibold text-xl">Category 1</Title>
        <div className="mt-10 flex flex-row flex-wrap justify-between gap-5">
          {mesIntegration.map((integration, index) => (
            <IntegrationCard
              category={integration.category}
              description={integration.description}
              link={integration.link}
              title={integration.title}
              key={index}
              classname="w-[32%]"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Title className="font-semibold text-xl">Category 2</Title>
        <div className="mt-10 flex flex-row flex-wrap justify-between gap-5 relative">
          {mesIntegration.map((integration, index) => (
            <IntegrationCard
              category={integration.category}
              description={integration.description}
              link={integration.link}
              title={integration.title}
              key={index}
              classname="w-[32%]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
