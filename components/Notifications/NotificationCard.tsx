import { Title } from "../Typography";
import { UserPictureWithName } from "../User";

interface NotificationCardProps {
  nom_project: string;
  nom_user: string;
  message: string;
  isRappel?: boolean;
}

export const NotificationCard = ({
  nom_project,
  nom_user,
  message,
  isRappel = false,
}: NotificationCardProps) => {
  return (
    <div className="flex flex-row items-center gap-2.5 border border-[#E3E3E3] rounded-xl p-4 hover:bg-gray-100 transition-colors duration-75 cursor-pointer">
      <div className="w-[20%]">
        {isRappel ? (
          <svg
            width="22"
            height="24"
            viewBox="0 0 22 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.77565 1.49872C8.95493 1.05562 9.26244 0.676154 9.65878 0.408961C10.0551 0.141768 10.5222 -0.000976563 11.0002 -0.000976562C11.4782 -0.000976562 11.9453 0.141768 12.3417 0.408961C12.738 0.676154 13.0455 1.05562 13.2248 1.49872C14.9991 1.98669 16.5642 3.04362 17.6796 4.5072C18.7951 5.97078 19.3993 7.76007 19.3993 9.60027V15.2361L21.5975 18.5333C21.7181 18.714 21.7873 18.9241 21.7978 19.141C21.8084 19.358 21.7598 19.5738 21.6573 19.7653C21.5549 19.9569 21.4023 20.117 21.216 20.2286C21.0296 20.3402 20.8164 20.3992 20.5992 20.3991H15.1578C15.0133 21.3988 14.5135 22.3129 13.75 22.974C12.9864 23.6351 12.0102 23.999 11.0002 23.999C9.99021 23.999 9.01402 23.6351 8.25046 22.974C7.48691 22.3129 6.98712 21.3988 6.84265 20.3991H1.40123C1.184 20.3992 0.970834 20.3402 0.78448 20.2286C0.598125 20.117 0.445569 19.9569 0.343088 19.7653C0.240607 19.5738 0.192046 19.358 0.202585 19.141C0.213124 18.9241 0.282368 18.714 0.40293 18.5333L2.6011 15.2361V9.60027C2.6011 5.73187 5.21682 2.47302 8.77565 1.49872ZM9.3036 20.3991C9.42752 20.7503 9.6573 21.0543 9.96127 21.2694C10.2652 21.4845 10.6284 21.6 11.0008 21.6C11.3732 21.6 11.7364 21.4845 12.0404 21.2694C12.3443 21.0543 12.5741 20.7503 12.698 20.3991H9.30239H9.3036ZM11.0002 3.6009C9.40909 3.6009 7.88312 4.23297 6.75802 5.35807C5.63292 6.48317 5.00085 8.00914 5.00085 9.60027V15.5996C5.0009 15.8366 4.93076 16.0684 4.79927 16.2656L3.64379 17.9994H18.3554L17.2 16.2656C17.0689 16.0682 16.9992 15.8365 16.9996 15.5996V9.60027C16.9996 8.00914 16.3675 6.48317 15.2424 5.35807C14.1173 4.23297 12.5913 3.6009 11.0002 3.6009Z"
              fill="#A3310F"
            />
          </svg>
        ) : (
          <UserPictureWithName />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Title level={3} className="font-semibold text-sm text-black">
          {nom_project}
        </Title>
        <div className="flex flex-row items-center gap-2">
          {isRappel ? (
            <span className="font-bold text-xs text-[#A3310F]">Rappel</span>
          ) : (
            <span className="font-semibold text-xs">Id Utilisateur</span>
          )}
          <span className="font-medium text-[#828282] text-xs">
            Aujourd’hui à 12h21
          </span>
        </div>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
};
