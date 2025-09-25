import image from "@/assets/images/template.png";
import { IntegrationCard } from "./IntegrationCard";

const mesIntegration = [
  {
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Catégorie",
    imageUrl: image,
    link: "#",
  },
  {
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Catégorie",
    imageUrl: image,
    link: "#",
  },
  {
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Catégorie",
    imageUrl: image,
    link: "#",
  },
  {
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Catégorie",
    imageUrl: image,
    link: "#",
  },
  {
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Catégorie",
    imageUrl: image,
    link: "#",
  },
  {
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Catégorie",
    imageUrl: image,
    link: "#",
  },
];

export const MesIntegration = () => {
  return (
    <div className="mt-10 flex flex-row flex-wrap justify-between gap-5">
      {mesIntegration.map((integration, index) => (
        <IntegrationCard
          category={integration.category}
          description={integration.description}
          imageUrl={integration.imageUrl}
          link={integration.link}
          title={integration.title}
          key={index}
          classname="w-[32%]"
        />
      ))}
    </div>
  );
};
