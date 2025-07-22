import { Title } from "../Typography";
import { UserPictureWithName } from "../User";

interface NotificationCardProps {
  nom_project: string;
  nom_user: string;
  message: string;
}

export const NotificationCard = ({
  nom_project,
  nom_user,
  message,
}: NotificationCardProps) => {
  return (
    <div className="flex flex-col gap-2.5 border border-[#E3E3E3] rounded-xl p-4 hover:bg-gray-100 transition-colors duration-75 cursor-pointer">
      <Title level={3} className="font-semibold text-base text-black">
        {nom_project}
      </Title>
      <UserPictureWithName username={nom_user} />
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
};
