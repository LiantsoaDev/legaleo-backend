"use client";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchBar } from "../Form";
import { LogoDashboard } from "../Logo";
import { User } from "../User";
import { Notification } from "./Notification";

interface HeaderDashboardProps {
  showCredit: boolean;
  setShowCreditCard: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderDashboard = ({
  showCredit,
  setShowCreditCard,
}: HeaderDashboardProps) => {
  return (
    <div className="flex flex-row items-center justify-between w-full px-8 h-[10%]">
      <LogoDashboard />
      <SearchBar />
      <div className="flex flex-row items-center gap-5">
        <div
          className="flex flex-row gap-2 py-2 px-3 items-center bg-[#62E7EB33] cursor-pointer text-white rounded-sm"
          onClick={() => setShowCreditCard(!showCredit)}
        >
          <svg
            width="18"
            height="22"
            viewBox="0 0 18 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.125 0.5H16.875C17.1734 0.5 17.4595 0.618526 17.6705 0.829505C17.8815 1.04048 18 1.32663 18 1.625C18 1.92337 17.8815 2.20952 17.6705 2.4205C17.4595 2.63147 17.1734 2.75 16.875 2.75H15.75V4.625C15.75 5.73112 15.4925 6.82205 14.9978 7.8114C14.5031 8.80074 13.7849 9.66133 12.9 10.325L12.4005 10.7C12.3539 10.7349 12.3161 10.7802 12.2901 10.8323C12.2641 10.8844 12.2505 10.9418 12.2505 11C12.2505 11.0582 12.2641 11.1156 12.2901 11.1677C12.3161 11.2198 12.3539 11.2651 12.4005 11.3L12.9 11.675C13.7849 12.3387 14.5031 13.1993 14.9978 14.1886C15.4925 15.1779 15.75 16.2689 15.75 17.375V19.25H16.875C17.1734 19.25 17.4595 19.3685 17.6705 19.5795C17.8815 19.7905 18 20.0766 18 20.375C18 20.6734 17.8815 20.9595 17.6705 21.1705C17.4595 21.3815 17.1734 21.5 16.875 21.5H1.125C0.826631 21.5 0.540483 21.3815 0.329505 21.1705C0.118526 20.9595 0 20.6734 0 20.375C0 20.0766 0.118526 19.7905 0.329505 19.5795C0.540483 19.3685 0.826631 19.25 1.125 19.25H2.25V17.375C2.25 16.2689 2.50753 15.1779 3.00221 14.1886C3.49688 13.1993 4.2151 12.3387 5.1 11.675L5.5995 11.3C5.64607 11.2651 5.68387 11.2198 5.70991 11.1677C5.73595 11.1156 5.7495 11.0582 5.7495 11C5.7495 10.9418 5.73595 10.8844 5.70991 10.8323C5.68387 10.7802 5.64607 10.7349 5.5995 10.7L5.1 10.325C4.2151 9.66133 3.49688 8.80074 3.00221 7.8114C2.50753 6.82205 2.25 5.73112 2.25 4.625V2.75H1.125C0.826631 2.75 0.540483 2.63147 0.329505 2.4205C0.118526 2.20952 0 1.92337 0 1.625C0 1.32663 0.118526 1.04048 0.329505 0.829505C0.540483 0.618526 0.826631 0.5 1.125 0.5ZM13.5 2.75H4.5V4.625C4.5 6.1595 5.223 7.604 6.45 8.525L6.9495 8.9C8.3505 9.95 8.3505 12.05 6.9495 13.1L6.45 13.475C5.84463 13.9292 5.35328 14.518 5.01483 15.1949C4.67637 15.8718 4.50012 16.6182 4.5 17.375V19.25H13.5V17.375C13.4999 16.6182 13.3236 15.8718 12.9852 15.1949C12.6467 14.518 12.1554 13.9292 11.55 13.475L11.0505 13.1C10.7239 12.8559 10.4588 12.5389 10.2762 12.1744C10.0936 11.8098 9.9985 11.4077 9.9985 11C9.9985 10.5923 10.0936 10.1902 10.2762 9.82562C10.4588 9.46107 10.7239 9.14414 11.0505 8.9L11.55 8.525C12.1554 8.07083 12.6467 7.48199 12.9852 6.80509C13.3236 6.12819 13.4999 5.3818 13.5 4.625V2.75Z"
              fill="url(#paint0_linear_861_11733)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_861_11733"
                x1="9"
                y1="0.5"
                x2="9"
                y2="21.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#62E7EB" />
                <stop offset="0.490385" stopColor="#D9FDFB" />
                <stop offset="1" stopColor="#62E7EB" />
              </linearGradient>
            </defs>
          </svg>
          <div className="font-semibold text-xs font-manrope">
            Crédits restants : <span className="font-bold text-base ">12h</span>
          </div>
        </div>
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
