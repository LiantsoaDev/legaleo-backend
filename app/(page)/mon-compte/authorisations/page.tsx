import CategoryAuthorisation from "@/components/Pages/MonCompte/CategoryAuthorisation";
import { Paragraphe, Title } from "@/components/Typography";

const page = () => {
  return (
    <div className="flex flex-col gap-10 relative">
      <div className="flex flex-col gap-2">
        <Title level={2} className="font-semibold text-2xl text-black">
          Rôles
        </Title>
        <Paragraphe className="font-medium text-sm text-[#828282]">
          Pretend not to be evil meow to be let out intently stare at the same .
        </Paragraphe>
      </div>
      <CategoryAuthorisation />
    </div>
  );
};

export default page;
