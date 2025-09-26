import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchBarProps {
  placeholder?: string;
  classname?: string;
  inputClassname?: string;
  iconClassname?: string;
}

export const SearchBar = ({
  placeholder = "Rechercher...",
  classname = "",
  inputClassname,
  iconClassname,
}: SearchBarProps) => {
  return (
    <div
      className={`flex flex-row items-center justify-start gap-2.5 bg-white w-1/3 py-3 px-5 rounded-full focus-within:shadow-lg ${classname}`}
    >
      <input
        type="text"
        placeholder="Rechercher un projet..."
        className={`w-[90%] focus:outiline-none outline-none bg-transparent text-black placeholder:text-[#828282] text-sm order-2 ${inputClassname}`}
      />
      <button type="submit" className="cursor-pointer">
        <FontAwesomeIcon
          icon={faSearch}
          className={`text-[#828282] text-2xl order-1 ${iconClassname}`}
        />
      </button>
    </div>
  );
};
