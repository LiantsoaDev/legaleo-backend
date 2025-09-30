import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Notification } from "../Header";
import { Title } from "../Typography";
import { NotificationCard } from "./NotificationCard";

export const Notifications = () => {
  return (
    <div className="flex flex-col gap-5 bg-white rounded-2xl p-5 shadow-lg">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-3.5">
          <Notification
            hasNotifications
            icon={
              <FontAwesomeIcon icon={faBell} className="text-primary text-xl" />
            }
            className="!text-primary"
          />
          <Title level={3} className="text-black font-bold text-xl">
            Mes notifications
          </Title>
        </div>
        <Link
          href={`#`}
          className="text-xs text-primary font-semibold underline"
        >
          Voir plus
        </Link>
      </div>
      <div className="flex flex-col gap-3.5 max-h-80 overflow-y-auto scrollable px-2">
        <NotificationCard
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor..."
          nom_project="Project 1"
          nom_user="User"
          isRappel
        />
        <NotificationCard
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor..."
          nom_project="Project 1"
          nom_user="User"
        />
        <NotificationCard
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor..."
          nom_project="Project 1"
          nom_user="User"
        />
        <NotificationCard
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor..."
          nom_project="Project 1"
          nom_user="User"
        />
      </div>
    </div>
  );
};
