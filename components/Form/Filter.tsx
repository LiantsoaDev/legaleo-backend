"use client";
import { Select } from "./Input";

const options = [
  "Brouillon",
  "relecture interne",
  "relecture avocat",
  "en cours de signature",
  "Modifications requises",
];

interface FilterProps {
  showListView: boolean;
  setShowListView: React.Dispatch<React.SetStateAction<boolean>>;
  hasListFilter?: boolean;
}

export const Filter = ({
  showListView,
  setShowListView,
  hasListFilter = true,
}: FilterProps) => {
  // const [showListView, setShowListView] = useState(true);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row gap-2.5">
        <div className="flex items-center gap-2.5 text-[#86A2A3] mr-3">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 7H19.5M7 12H17M10 17H14"
              stroke="#86A2A3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm font-semibold">Filtrer</span>
        </div>
        <Select
          options={options}
          name="status"
          id="status"
          classname="text-xs font-semibold !p-3 !bg-[#F2F8F8] !text-[#86A2A3] w-full border-0 !rounded-none"
          isFilter={true}
        />
        <Select
          options={options}
          name="status"
          id="status"
          classname="text-xs font-semibold !p-3 !bg-[#F2F8F8] !text-[#86A2A3] w-full border-0 !rounded-none"
          isFilter={true}
        />
        <Select
          options={options}
          name="status"
          id="status"
          classname="text-xs font-semibold !p-3 !bg-[#F2F8F8] !text-[#86A2A3] w-full border-0 !rounded-none"
          isFilter={true}
        />
        <Select
          options={options}
          name="status"
          id="status"
          classname="text-xs font-semibold !p-3 !bg-[#F2F8F8] !text-[#86A2A3] w-full border-0 !rounded-none"
          isFilter={true}
        />
        <Select
          options={options}
          name="status"
          id="status"
          classname="text-xs font-semibold !p-3 !bg-[#F2F8F8] !text-[#86A2A3] w-full border-0 !rounded-none"
          isFilter={true}
        />
      </div>
      {hasListFilter && (
        <div className="flex flex-row items-center gap-2.5">
          <div className="flex flex-row items-center gap-1.5 text-[#86A2A3]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.205 11.745C22.3229 9.46324 20.7915 7.48996 18.8001 6.06906C16.8088 4.64817 14.4447 3.84193 12 3.75C9.55544 3.84193 7.19134 4.64817 5.19995 6.06906C3.20856 7.48996 1.67717 9.46324 0.795047 11.745C0.735473 11.9098 0.735473 12.0902 0.795047 12.255C1.67717 14.5368 3.20856 16.51 5.19995 17.9309C7.19134 19.3518 9.55544 20.1581 12 20.25C14.4447 20.1581 16.8088 19.3518 18.8001 17.9309C20.7915 16.51 22.3229 14.5368 23.205 12.255C23.2646 12.0902 23.2646 11.9098 23.205 11.745ZM12 18.75C8.02505 18.75 3.82505 15.8025 2.30255 12C3.82505 8.1975 8.02505 5.25 12 5.25C15.975 5.25 20.175 8.1975 21.6975 12C20.175 15.8025 15.975 18.75 12 18.75Z"
                fill="#86A2A3"
              />
              <path
                d="M12 7.5C11.11 7.5 10.24 7.76392 9.49994 8.25839C8.75991 8.75285 8.18314 9.45566 7.84254 10.2779C7.50195 11.1002 7.41283 12.005 7.58647 12.8779C7.7601 13.7508 8.18869 14.5526 8.81802 15.182C9.44736 15.8113 10.2492 16.2399 11.1221 16.4135C11.995 16.5872 12.8998 16.4981 13.7221 16.1575C14.5443 15.8169 15.2471 15.2401 15.7416 14.5001C16.2361 13.76 16.5 12.89 16.5 12C16.5 10.8065 16.0259 9.66193 15.182 8.81802C14.3381 7.97411 13.1935 7.5 12 7.5ZM12 15C11.4067 15 10.8266 14.8241 10.3333 14.4944C9.83994 14.1648 9.45543 13.6962 9.22836 13.148C9.0013 12.5999 8.94189 11.9967 9.05765 11.4147C9.1734 10.8328 9.45912 10.2982 9.87868 9.87868C10.2982 9.45912 10.8328 9.1734 11.4147 9.05764C11.9967 8.94189 12.5999 9.0013 13.1481 9.22836C13.6962 9.45542 14.1648 9.83994 14.4944 10.3333C14.8241 10.8266 15 11.4067 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7957 15 12 15Z"
                fill="#86A2A3"
              />
            </svg>

            <span className="text-sm font-semibold">Filtrer:</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <label
              htmlFor="tableau"
              className={`cursor-pointer border border-[#86A2A3] px-2 py-1 rounded-xs ${
                showListView
                  ? "text-[#86A2A3] hover:bg-[#F2F8F8]"
                  : "text-[#F2F8F8] bg-[#86A2A3]"
              }  text-sm p-1.5 flex gap-2 items-center`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.55556 0.777779H12.4444C12.857 0.777779 13.2527 0.941667 13.5444 1.23339C13.8361 1.52511 14 1.92078 14 2.33333V11.6667C14 12.0792 13.8361 12.4749 13.5444 12.7666C13.2527 13.0583 12.857 13.2222 12.4444 13.2222H1.55556C1.143 13.2222 0.747335 13.0583 0.455612 12.7666C0.163888 12.4749 0 12.0792 0 11.6667V2.33333C0 1.92078 0.163888 1.52511 0.455612 1.23339C0.747335 0.941667 1.143 0.777779 1.55556 0.777779ZM1.55556 3.88889V7H6.22222V3.88889H1.55556ZM7.77778 3.88889V7H12.4444V3.88889H7.77778ZM1.55556 8.55556V11.6667H6.22222V8.55556H1.55556ZM7.77778 8.55556V11.6667H12.4444V8.55556H7.77778Z"
                  fill={showListView ? "#86A2A3" : "#F2F8F8 "}
                />
              </svg>
              Tableau
            </label>
            <label
              htmlFor="liste"
              className={`cursor-pointer border border-[#86A2A3] px-2 py-1 rounded-xs ${
                showListView
                  ? "text-[#F2F8F8] bg-[#86A2A3]"
                  : "text-[#86A2A3] hover:bg-[#F2F8F8]"
              }  text-sm p-1.5 flex gap-2 items-center`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.00237289 2.74529H0.00496179C0.00501256 2.8742 0.0559324 2.99787 0.146656 3.08945C0.23738 3.18102 0.360577 3.23309 0.489476 3.23434L13.5103 3.23477C13.6397 3.2342 13.7636 3.18219 13.855 3.0905C13.9463 2.99882 13.9976 2.8747 13.9976 2.74529H13.9998V0.489044C13.9996 0.359377 13.9479 0.235098 13.8561 0.14349C13.7643 0.0518821 13.64 0.000430859 13.5103 0.000431061H0.489476C0.359676 0.000488229 0.235209 0.0520762 0.143427 0.143858C0.0516452 0.23564 5.71678e-05 0.360108 0 0.489907C0 0.49832 0.00215704 0.506302 0.00258849 0.514715L0.00237289 2.74529ZM11.5101 5.38294H0.489476C0.359676 5.383 0.235209 5.43459 0.143427 5.52637C0.0516452 5.61815 5.71678e-05 5.74262 0 5.87242C0 5.88083 0.00215704 5.88881 0.00258849 5.89722V8.1278H0.00517739C0.00522816 8.25671 0.056148 8.38038 0.146872 8.47195C0.237596 8.56353 0.360793 8.6156 0.489692 8.61685L11.5105 8.61728C11.6399 8.61671 11.7638 8.5647 11.8552 8.47301C11.9465 8.38133 11.9978 8.25721 11.9978 8.1278H12V5.87155C11.9996 5.74186 11.9478 5.61762 11.856 5.52603C11.7642 5.43445 11.6398 5.383 11.5101 5.38294ZM9.51009 10.7652H0.489476C0.359676 10.7653 0.235209 10.8169 0.143427 10.9087C0.0516452 11.0004 5.71678e-05 11.1249 0 11.2547C0 11.2631 0.00215704 11.2711 0.00258849 11.2795V13.5101H0.00517739C0.00522816 13.639 0.056148 13.7627 0.146872 13.8542C0.237596 13.9458 0.360793 13.9979 0.489692 13.9991L9.51052 13.9996C9.63995 13.9989 9.76386 13.9469 9.85518 13.8552C9.9465 13.7634 9.99779 13.6393 9.99784 13.5099H10V11.2536C9.99954 11.124 9.94774 10.9998 9.85592 10.9083C9.7641 10.8167 9.63975 10.7653 9.51009 10.7652Z"
                  fill={showListView ? "#F2F8F8" : "#86A2A3"}
                />
              </svg>
              Liste
            </label>
            <input
              className="hidden"
              id="tableau"
              type="radio"
              name="tableau"
              value="tableau"
              checked={!showListView}
              onChange={() => setShowListView(false)}
            />
            <input
              className="hidden"
              id="liste"
              type="radio"
              name="liste"
              value="liste"
              checked={showListView}
              onChange={() => setShowListView(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
