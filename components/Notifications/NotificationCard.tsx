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
    <div className="flex flex-row items-center gap-2.5 border border-[#E3E3E3] rounded-xl p-4 hover:bg-gray-100 transition-colors duration-75 cursor-pointer">
      <div className="w-[20%]">
        <UserPictureWithName />
      </div>
      <div className="flex flex-col gap-2">
        <Title level={3} className="font-semibold text-sm text-black">
          {nom_project}
        </Title>
        <div className="flex flex-row items-center gap-1">
          <span className="font-semibold text-xs">Id Utilisateur</span>
          <span className="font-medium text-[#828282] text-xs">
            Aujourd’hui à 12h21
          </span>
        </div>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
};
