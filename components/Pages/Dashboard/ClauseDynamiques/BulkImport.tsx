import { Button } from "@/components/Button";

export const BulkImport = () => {
  return (
    <form className="flex flex-col gap-3.5 py-5">
      <label
        htmlFor="clause_file"
        className="h-48 border-2 border-[#3300FF] border-dashed rounded-xl flex flex-col justify-center items-center gap-4 cursor-pointer bg-[#3300FF0D]"
      >
        <div className="flex flex-row gap-3 items-center">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 17.5V3.5"
              stroke="#3300FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.5 21.5H4.5"
              stroke="#3300FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.5 12.5L12.499 17.501L7.49902 12.5"
              stroke="#3300FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-black font-semibold text-sm">
            Choose file ( PDF OU DOCX)
          </span>
        </div>
        <span className="text-[#828282] font-semibold text-sm">
          or drop your file here
        </span>
      </label>
      <input type="file" id="clause_file" className="hidden" />
      <Button classname="w-full rounded-xs">Créer la clause</Button>
    </form>
  );
};
