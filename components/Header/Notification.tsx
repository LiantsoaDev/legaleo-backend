import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NotificationProps {
  hasNotifications?: boolean;
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Notification = ({
  className,
  hasNotifications = false,
  onClick,
  icon,
}: NotificationProps) => {
  return (
    <div className={`relative cursor-pointer ${className}`} onClick={onClick}>
      {icon}
      {hasNotifications && (
        <FontAwesomeIcon
          icon={faCircle}
          className="text-xs text-orange absolute top-0 left-3.5"
        />
      )}
    </div>
  );
};
