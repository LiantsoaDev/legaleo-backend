import { Paragraphe, Title } from "@/components/Typography";

export const EditeurIA = () => {
  return (
    <div className="flex flex-col gap-0">
      <div className="flex justify-between items-center p-5 border-b border-gray">
        <Title className="font-bold text-base text-black" level={3}>
          Assistant IA
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
          Assistant Legaleo
        </Title>
        <Title
          level={2}
          className="font-semibold text-black text-lg text-center mt-11"
        >
          Quel est le programme aujourd’hui ?
        </Title>
        <div className="flex flex-col gap-2.5 mt-10 justify-center items-center">
          <span className="font-semibold text-xs text-center text-[#087F83] px-3.5 py-1.5 bg-[#F2F8F8] w-fit rounded-full cursor-pointer hover:opacity-85 transition-all duration-300">
            Lorem ipsum dolor sit amet ?
          </span>
          <span className="font-semibold text-xs text-center text-[#087F83] px-3.5 py-1.5 bg-[#F2F8F8] w-fit rounded-full cursor-pointer hover:opacity-85 transition-all duration-300">
            Lorem ipsum dolor sit , consectetur adipiscing ?
          </span>
          <span className="font-semibold text-xs text-center text-[#087F83] px-3.5 py-1.5 bg-[#F2F8F8] w-fit rounded-full cursor-pointer hover:opacity-85 transition-all duration-300">
            Lorem ipsum dolor sit , consectetur ?
          </span>
        </div>
        <Paragraphe className="text-center text-xs text-[#828282] font-medium mt-11 max-w-4xl">
          Legaleo fournit des informations à caractère général. Il ne s’agit pas
          d’un conseil juridique personnalisé. Pour toute situation
          particulière, nous vous invitons à contacter un avocat partenaire
          Legaleo.
        </Paragraphe>
        <form className="w-full border-[#E3E3E3] border rounded-full flex flex-row gap-2 justify-between items-center mt-20 shadow-md py-3.5 px-6">
          <input
            type="text"
            placeholder="Poser une question"
            className="w-[90%] px-1 py-1 rounded-full outline-none placeholder:text-[#828282] text-sm font-medium"
          />
          <button className="appearance-none">
            <svg
              width="30"
              height="30"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer hover:opacity-85 transition-all duration-300"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 25.5C19.9037 25.5 25.5 19.9037 25.5 13C25.5 6.09625 19.9037 0.5 13 0.5C6.09625 0.5 0.5 6.09625 0.5 13C0.5 19.9037 6.09625 25.5 13 25.5ZM7.6975 12.9937C7.93191 13.2281 8.2498 13.3597 8.58125 13.3597C8.9127 13.3597 9.23059 13.2281 9.465 12.9937L11.75 10.71L11.75 18.3038C11.75 18.6353 11.8817 18.9532 12.1161 19.1876C12.3505 19.4221 12.6685 19.5538 13 19.5538C13.3315 19.5538 13.6495 19.4221 13.8839 19.1876C14.1183 18.9532 14.25 18.6353 14.25 18.3038L14.25 10.7087L16.5363 12.995C16.7708 13.2294 17.0889 13.361 17.4204 13.3609C17.752 13.3608 18.07 13.2289 18.3044 12.9944C18.5388 12.7598 18.6704 12.4418 18.6703 12.1102C18.6701 11.7786 18.5383 11.4606 18.3038 11.2263L13.8837 6.8075C13.6493 6.57316 13.3315 6.44152 13 6.44152C12.6685 6.44152 12.3507 6.57316 12.1163 6.8075L7.6975 11.2263C7.58128 11.3423 7.48908 11.4802 7.42617 11.6319C7.36327 11.7837 7.33089 11.9464 7.33089 12.1106C7.33089 12.2749 7.36327 12.4376 7.42617 12.5893C7.48908 12.741 7.58128 12.8789 7.6975 12.995V12.9937Z"
                fill="#C5C5C5"
              />
            </svg>
          </button>
          <svg
            className="cursor-pointer hover:opacity-85 transition-all duration-300"
            width="30"
            height="30"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 11C4.73478 11 4.48043 10.8946 4.29289 10.7071C4.10536 10.5196 4 10.2652 4 10C4 9.73478 4.10536 9.48043 4.29289 9.29289C4.48043 9.10536 4.73478 9 5 9H15C15.2652 9 15.5196 9.10536 15.7071 9.29289C15.8946 9.48043 16 9.73478 16 10C16 10.2652 15.8946 10.5196 15.7071 10.7071C15.5196 10.8946 15.2652 11 15 11H5Z"
              fill="#C5C5C5"
            />
            <path
              d="M9 5C9 4.73478 9.10536 4.48043 9.29289 4.29289C9.48043 4.10536 9.73478 4 10 4C10.2652 4 10.5196 4.10536 10.7071 4.29289C10.8946 4.48043 11 4.73478 11 5V15C11 15.2652 10.8946 15.5196 10.7071 15.7071C10.5196 15.8946 10.2652 16 10 16C9.73478 16 9.48043 15.8946 9.29289 15.7071C9.10536 15.5196 9 15.2652 9 15V5Z"
              fill="#C5C5C5"
            />
          </svg>
        </form>
      </div>
    </div>
  );
};
