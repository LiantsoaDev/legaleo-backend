import { Button } from "@/components/Button";
import NotificationsList from "@/components/Pages/MonCompte/NotificationList";
import { Paragraphe, Title } from "@/components/Typography";

const page = () => {
  return (
    <div className="flex flex-col gap-10 relative max-w-2xl">
      <div className="flex flex-col gap-2">
        <Title level={2} className="font-semibold text-2xl text-black">
          Notifications
        </Title>
        <Paragraphe className="font-medium text-sm text-[#828282]">
          Pretend not to be evil meow to be let out intently stare at the same .
        </Paragraphe>
      </div>
      <div className="flex flex-col gap-5 p-7 border border-[#E3E3E3] rounded-lg shadow">
        <div className="flex flex-col">
          <Title level={3} className="font-semibold text-xl text-black">
            Catégorie 1
          </Title>
          <Paragraphe className="font-medium text-xs text-[#828282]">
            Pretend not to be evil meow to be let out intently stare at the same
            .
          </Paragraphe>
        </div>
        <NotificationsList />
      </div>
      <div className="flex flex-col gap-5 p-7 border border-[#E3E3E3] rounded-lg shadow">
        <div className="flex flex-col">
          <Title level={3} className="font-semibold text-xl text-black">
            Catégorie 2
          </Title>
          <Paragraphe className="font-medium text-xs text-[#828282]">
            Pretend not to be evil meow to be let out intently stare at the same
            .
          </Paragraphe>
        </div>
        <NotificationsList />
      </div>
      <div className="flex flex-row gap-5 items-center">
        <Button classname="!rounded-sm">Sauvegarder</Button>
        <Button href="#">Annuler</Button>
      </div>
    </div>
  );
};

export default page;
