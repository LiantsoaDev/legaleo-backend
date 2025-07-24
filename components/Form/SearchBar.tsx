import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SearchBar = () => {
  return (
    <form className="flex flex-row items-center justify-between bg-white w-1/3 py-4 px-5 rounded-full shadow-md focus-within:shadow-2xl ">
      <input
        type="text"
        placeholder="Rechercher..."
        className="w-[90%] focus:outiline-none outline-none bg-transparent text-black placeholder:text-dark-green text-sm"
      />
      <button type="submit" className="cursor-pointer">
        <FontAwesomeIcon icon={faSearch} className="text-dark-green text-2xl" />
      </button>
    </form>
  );
};
