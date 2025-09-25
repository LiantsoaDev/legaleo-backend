import image from "@/assets/images/template.png";
import {
  FacturationNextPaymentCard,
  FacturationPlanCard,
} from "@/components/Pages/MonCompte";
import { IntegrationCard } from "@/components/Pages/MonCompte/IntegrationCard";
import { Paragraphe, Title } from "@/components/Typography";

const page = () => {
  return (
    <div className="flex flex-col gap-10 relative">
      <div className="flex flex-col gap-2">
        <Title level={2} className="font-semibold text-2xl text-black">
          Facturation
        </Title>
        <Paragraphe className="font-medium text-sm text-[#828282]">
          Pretend not to be evil meow to be let out intently stare at the same .
        </Paragraphe>
      </div>
      <div className="flex items-center gap-5">
        <FacturationPlanCard
          date_expiration="14 août 2026"
          description="Professionnel annuel"
          price="29€"
          type_reseaux="Jeunes réseaux"
        />
        <FacturationNextPaymentCard />
      </div>
      <Title className="font-semibold text-xl text-black" level={3}>
        Extensions et intégrations
      </Title>
      <div className="flex flex-row gap-5 w-full">
        <IntegrationCard
          category=""
          description=""
          imageUrl={image}
          link=""
          title="Lorem ipsum dolor sit amet"
          workspace="Actif sur 2 espaces de travail"
          isInFacturationPage
        />
        <IntegrationCard
          category=""
          description=""
          imageUrl={image}
          link=""
          title="Lorem ipsum dolor sit amet"
          workspace="Actif sur 2 espaces de travail"
          isInFacturationPage
        />
        <IntegrationCard
          category=""
          description=""
          imageUrl={image}
          link=""
          title="Lorem ipsum dolor sit amet"
          workspace="Actif sur 2 espaces de travail"
          isInFacturationPage
        />
      </div>
    </div>
  );
};

export default page;
