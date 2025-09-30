import { Button } from "../Button";
import { Input, SearchBar, Select } from "../Form";
import { Paragraphe, Title } from "../Typography";

interface ImportDocumentProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ImportDocument = ({ setShow }: ImportDocumentProps) => {
  return (
    <div className="flex flex-col justify-center items-center fixed w-full inset-0 bg-[#00000033] z-10">
      <form className="w-3xl bg-white rounded-lg p-7 flex flex-col gap-7 relative">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setShow(false)}
        >
          <path
            d="M20 20L4 4M20 4L4 20"
            stroke="#828282"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <Title level={3} className="font-semibold text-2xl text-black">
          Ranger un document{" "}
        </Title>
        <label
          htmlFor="documents"
          className="flex flex-col gap-4 py-8 bg-[#F8F9FA] justify-center items-center cursor-pointer"
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.879 17.121L21.879 32.121L24 34.242L26.121 32.121L41.121 17.121L36.879 12.879L27 22.758V0H42C43.5913 0 45.1174 0.632141 46.2426 1.75736C47.3679 2.88258 48 4.4087 48 6V42C48 43.5913 47.3679 45.1174 46.2426 46.2426C45.1174 47.3679 43.5913 48 42 48H6C4.4087 48 2.88258 47.3679 1.75736 46.2426C0.632141 45.1174 0 43.5913 0 42V6C0 4.4087 0.632141 2.88258 1.75736 1.75736C2.88258 0.632141 4.4087 0 6 0H21V22.758L11.121 12.879L6.879 17.121Z"
              fill="#62E7EB"
            />
          </svg>
          <div className="flex flex-col gap-2.5 text-center">
            <Paragraphe className="font-semibold text-sm text-black">
              Choose file ( PDF OU DOCX)
            </Paragraphe>
            <span className="font-semibold text-xs text-[#828282]">
              or drop your file here
            </span>
          </div>
        </label>
        <input
          type="file"
          accept=".pdf, .docx"
          id="documents"
          className="hidden"
        />
        <div className="flex flex-col gap-5">
          <Input
            type="text"
            placeholder="nom du fichier"
            name="file_name"
            label="Nom du fichier"
          />
          <div className="flex flex-col gap-3.5">
            <label htmlFor="" className="font-semibold text-sm text-black">
              Choisissez un dossier
            </label>
            <Select
              id=""
              name=""
              options={["Test 1", "Test 2", "Test 3"]}
              classname="w-full"
            />
          </div>
          <div className="flex flex-col gap-3.5">
            <label htmlFor="" className="font-semibold text-sm text-black">
              Cocontractant*
            </label>
            <SearchBar
              classname="w-full border rounded-lg"
              placeholder="Rechercher"
            />
          </div>
        </div>
        <Button
          type="submit"
          isLink
          href="/projets/1"
          classname="w-full text-center mx-auto rounded-sm !bg-[#087F83] !text-sm !font-semibold hover:!border-none hover:!text-white cursor-pointer hover:opacity-85"
        >
          Valider 🚀
        </Button>
      </form>
    </div>
  );
};
