import { Button } from "@/components/Button";
import { Input, SearchBar } from "@/components/Form";

export const ModeLibre = () => {
  return (
    <div className="w-5xl mx-auto my-0 flex flex-col gap-5 py-7">
      <form action="" className="flex flex-col gap-5">
        <div className="flex flex-row w-full gap-5 items-center relative">
          <Input
            label="Dites nous ce dont vous avez besoin ?"
            type="textarea"
            name="besoin"
            placeholder="Je souhaite rédiger un contrat de franchise sur 5 ans...."
            classname="w-full h-32"
          />
          <svg
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-5 bottom-5 cursor-pointer"
          >
            <rect width="33" height="33" rx="16.5" fill="#62E7EB" />
            <path
              d="M17.811 8.92198C17.0084 8.42037 15.99 8.42038 15.1875 8.92198L10.2375 12.0157C9.51383 12.468 9.07422 13.2612 9.07422 14.1145V18.8855C9.07422 19.7389 9.51383 20.532 10.2375 20.9843L15.1875 24.0781C15.99 24.5797 17.0084 24.5797 17.811 24.0781L22.761 20.9843C23.4846 20.532 23.9242 19.7389 23.9242 18.8855V14.1145C23.9242 13.2612 23.4846 12.468 22.761 12.0157L17.811 8.92198Z"
              fill="white"
              stroke="white"
              strokeWidth="1.2375"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="flex flex-row w-full gap-5 items-center">
          <Input
            type="text"
            name="nom_document"
            placeholder=""
            label="Nom du document"
            classname="w-full"
          />
        </div>
        <div className="flex flex-col w-full gap-2 mb-5">
          <label className="form-label font-manrope text-sm font-semibold">
            Cocontractant
          </label>
          <SearchBar
            classname="w-full rounded-xs !shadow-none border border-gray"
            placeholder="Rechercher"
          />
        </div>
        <Button
          type="submit"
          classname="w-fit mx-auto rounded-sm !bg-[#087F83] !text-sm !font-semibold hover:!border-none hover:!text-white cursor-pointer hover:opacity-85"
        >
          Commencer 🚀
        </Button>
      </form>
    </div>
  );
};
0;
