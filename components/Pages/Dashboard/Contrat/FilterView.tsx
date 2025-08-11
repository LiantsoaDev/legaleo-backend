"use client";

import { Paragraphe } from "@/components/Typography";
import {
  faCircleUser,
  faStar,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const FilterView = () => {
  const [showFilter, setShowFilter] = useState(true);
  return (
    <div className="py-7">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setShowFilter(!showFilter)}
      >
        <Paragraphe className="text-[#86A2A3] text-base font-bold">
          Vue filtrés
        </Paragraphe>
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 1L7.70711 6.29289C7.31658 6.68342 6.68342 6.68342 6.29289 6.29289L1 1"
            stroke="#86A2A3"
            strokeWidth="1.67"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {showFilter && (
        <div className="flex flex-col gap-0 mt-5">
          <div className="flex flex-row gap-3.5 items-center text-[#86A2A3] px-2.5 py-3 cursor-pointer">
            <FontAwesomeIcon icon={faCircleUser} className="text-2xl" />
            Expirés
          </div>
          <div className="flex flex-row gap-3.5 items-center text-[#86A2A3] px-2.5 py-3 cursor-pointer">
            <svg
              width="25"
              height="25"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.4583 10.0002V14.4585H8V10.0002H12.4583ZM11.5417 0.208496H13.3333V2.00016H14.2083C14.7083 2.00016 15.1319 2.17377 15.4792 2.521C15.8264 2.86822 16 3.29183 16 3.79183V16.2085C16 16.7085 15.8264 17.1321 15.4792 17.4793C15.1319 17.8266 14.7083 18.0002 14.2083 18.0002H1.79167C1.29167 18.0002 0.868056 17.8266 0.520833 17.4793C0.173611 17.1321 0 16.7085 0 16.2085V3.79183C0 3.29183 0.173611 2.86822 0.520833 2.521C0.868056 2.17377 1.29167 2.00016 1.79167 2.00016H2.66667V0.208496H4.45833V2.00016H11.5417V0.208496ZM14.2083 16.2085V6.4585H1.79167V16.2085H14.2083Z"
                fill="#86A2A3"
              />
            </svg>
            À renouveler ce trimestre
          </div>
          <div className="flex flex-row gap-3.5 items-center text-[#86A2A3] px-2.5 py-3 cursor-pointer">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="text-2xl"
            />
            En cours de validation
          </div>
          <div className="flex flex-row gap-3.5 items-center text-[#86A2A3] px-2.5 py-3 cursor-pointer">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="text-2xl"
            />
            Assignés à mon avocat
          </div>
          <div className="flex flex-row gap-3.5 items-center text-[#86A2A3] px-2.5 py-3 cursor-pointer">
            <FontAwesomeIcon icon={faStar} className="text-2xl" />
            Favoris
          </div>
        </div>
      )}
    </div>
  );
};
