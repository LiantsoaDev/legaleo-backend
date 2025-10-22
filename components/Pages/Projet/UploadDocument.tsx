import { Button } from "@/components/Button";
import { Paragraphe, Title } from "@/components/Typography";

export const UploadDocument = () => {
  return (
    <div className="flex flex-col gap-0">
      <div className="flex justify-between items-center p-5 border-b border-gray">
        <Title className="font-bold text-base text-black" level={3}>
          Upload Document
        </Title>
      </div>
      <div className="flex flex-col py-5 items-center">
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100" height="100" rx="50" fill="#62E7EB" />
          <path
            d="M53.975 27.0365C51.543 25.5165 48.457 25.5165 46.025 27.0365L31.025 36.4115C28.8321 37.782 27.5 40.1856 27.5 42.7715V57.229C27.5 59.8149 28.8321 62.2185 31.025 63.589L46.025 72.964C48.457 74.484 51.543 74.484 53.975 72.964L68.975 63.589C71.1679 62.2185 72.5 59.8149 72.5 57.229V42.7715C72.5 40.1856 71.1679 37.782 68.975 36.4115L53.975 27.0365Z"
            fill="white"
            stroke="white"
            strokeWidth="3.75"
            strokeLinecap="round"
          />
        </svg>
        <Title
          level={1}
          className="font-semibold mt-4 text-black text-sm text-center"
        >
          Importer un document
        </Title>
        <Paragraphe className="text-center text-xs text-[#828282] font-medium mt-11 max-w-4xl">
          Legaleo fournit des informations à caractère général. Il ne s’agit pas
          d’un conseil juridique personnalisé. Pour toute situation
          particulière, nous vous invitons à contacter un avocat partenaire
          Legaleo.
        </Paragraphe>
        <form className="w-full px-5 mt-5">
          <label
            className="flex flex-row px-5 gap-3.5 justify-center items-center w-full border-2 border-dashed border-[#3300FF] rounded-lg h-52 cursor-pointer bg-accent"
            htmlFor="document"
          >
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
            <div className="flex flex-col text-center">
              <p className="font-semibold text-sm text-black">
                Faites glisser les fichiers ou{" "}
                <span className="text-[#3300FF]">cliquez</span> pour les
                parcourir
              </p>
              <span className="font-semibold text-xs text-[#828282]">
                Fichiers autorisés: .docx, .pdf
              </span>
            </div>
          </label>
          <input
            type="file"
            id="document"
            className="hidden"
            accept=".docx, .pdf"
          />
          <Button classname="mt-5 !rounded-sm w-full">Importer</Button>
        </form>
      </div>
    </div>
  );
};
