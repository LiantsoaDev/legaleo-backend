import { useTabContext } from "@/hooks/useTabContext";

export const Historique = () => {
  const { showTab, setShowTab, handleShowTab } = useTabContext();
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
      onClick={() => handleShowTab(showTab, setShowTab, 7)}
    >
      <path
        d="M11.333 7.75V12.75H14.333"
        stroke="#828282"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.93848 7.87529C5.89276 6.22228 7.39068 4.95128 9.17701 4.27888C10.9633 3.60648 12.9276 3.57427 14.735 4.18774C16.5424 4.80121 18.0812 6.02241 19.0892 7.64325C20.0971 9.26409 20.5119 11.1843 20.2628 13.0767C20.0137 14.969 19.1162 16.7165 17.7231 18.0213C16.33 19.3261 14.5276 20.1075 12.623 20.2323C10.7184 20.3572 8.82946 19.8178 7.27797 18.706C5.72649 17.5943 4.60849 15.9789 4.11448 14.1353M3.93848 4.12529V8.87529H8.68848"
        stroke="#828282"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
