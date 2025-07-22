import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchBar } from "../Form";
import { LogoDashboard } from "../Logo";
import { User } from "../User";
import { Notification } from "./Notification";

export const HeaderDashboard = () => {
  return (
    <div className="flex flex-row items-center justify-between w-full py-7 px-8">
      <LogoDashboard />
      <SearchBar />
      <div className="flex flex-row items-center gap-5">
        <Notification
          icon={
            <FontAwesomeIcon icon={faBell} className="text-white text-3xl" />
          }
          hasNotifications
        />
        <User />
      </div>
    </div>
  );
};
