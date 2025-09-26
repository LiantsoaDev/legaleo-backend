import { SearchBar } from "@/components/Form";
import { Title } from "@/components/Typography";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col gap-5 py-32 px-72 mx-auto w-7xl">
      <Title
        className="text-left font-semibold text-4xl  font-manrope text-black"
        level={2}
      >
        Rechercher un projet à signer
      </Title>
      <div className="flex flex-col gap-7 items-stretch">
        <SearchBar classname="w-full shadow border border-[#E3E3E3]" />
        <div className="flex flex-col gap-5">
          <Title className="font-semibold text-sm text-[#087F83]" level={3}>
            Projets récents
          </Title>
          <div className="flex flex-col gap-2.5">
            <Link
              href="/projets/signer-projet/destinataire"
              className="flex flex-row justify-between rounded-sm shadow px-5 py-3.5 items-center"
            >
              <div className="flex flex-col gap-2">
                <span className="font-medium text-sm text-black">
                  Nom projet
                </span>
                <span className="flex flex-row gap-2 text-[10px] text-[#828282] font-medium">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.33301 0.75V3.08333M3.66634 0.75V3.08333M1.33301 5.41667H10.6663M1.33301 3.08333C1.33301 2.77391 1.45592 2.47717 1.67472 2.25838C1.89351 2.03958 2.19026 1.91667 2.49967 1.91667H9.49967C9.80909 1.91667 10.1058 2.03958 10.3246 2.25838C10.5434 2.47717 10.6663 2.77391 10.6663 3.08333V10.0833C10.6663 10.3928 10.5434 10.6895 10.3246 10.9083C10.1058 11.1271 9.80909 11.25 9.49967 11.25H2.49967C2.19026 11.25 1.89351 11.1271 1.67472 10.9083C1.45592 10.6895 1.33301 10.3928 1.33301 10.0833V3.08333ZM3.66634 7.75H4.83301V8.91667H3.66634V7.75Z"
                      stroke="#828282"
                      strokeWidth="0.875"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Crée le DD/MM/YY
                </span>
              </div>
              <span className="text-[#545FFF] font-semibold text-xs px-2 py-1 bg-[#545FFF1A] rounded-sm">
                Validé avocat
              </span>
            </Link>
            <Link
              href="/projets/signer-projet/destinataire"
              className="flex flex-row justify-between rounded-sm shadow px-5 py-3.5 items-center"
            >
              <div className="flex flex-col gap-2">
                <span className="font-medium text-sm text-black">
                  Nom projet
                </span>
                <span className="flex flex-row gap-2 text-[10px] text-[#828282] font-medium">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.33301 0.75V3.08333M3.66634 0.75V3.08333M1.33301 5.41667H10.6663M1.33301 3.08333C1.33301 2.77391 1.45592 2.47717 1.67472 2.25838C1.89351 2.03958 2.19026 1.91667 2.49967 1.91667H9.49967C9.80909 1.91667 10.1058 2.03958 10.3246 2.25838C10.5434 2.47717 10.6663 2.77391 10.6663 3.08333V10.0833C10.6663 10.3928 10.5434 10.6895 10.3246 10.9083C10.1058 11.1271 9.80909 11.25 9.49967 11.25H2.49967C2.19026 11.25 1.89351 11.1271 1.67472 10.9083C1.45592 10.6895 1.33301 10.3928 1.33301 10.0833V3.08333ZM3.66634 7.75H4.83301V8.91667H3.66634V7.75Z"
                      stroke="#828282"
                      strokeWidth="0.875"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Crée le DD/MM/YY
                </span>
              </div>
              <span className="text-[#545FFF] font-semibold text-xs px-2 py-1 bg-[#545FFF1A] rounded-sm">
                Validé avocat
              </span>
            </Link>
            <Link
              href="/projets/signer-projet/destinataire"
              className="flex flex-row justify-between rounded-sm shadow px-5 py-3.5 items-center"
            >
              <div className="flex flex-col gap-2">
                <span className="font-medium text-sm text-black">
                  Nom projet
                </span>
                <span className="flex flex-row gap-2 text-[10px] text-[#828282] font-medium">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.33301 0.75V3.08333M3.66634 0.75V3.08333M1.33301 5.41667H10.6663M1.33301 3.08333C1.33301 2.77391 1.45592 2.47717 1.67472 2.25838C1.89351 2.03958 2.19026 1.91667 2.49967 1.91667H9.49967C9.80909 1.91667 10.1058 2.03958 10.3246 2.25838C10.5434 2.47717 10.6663 2.77391 10.6663 3.08333V10.0833C10.6663 10.3928 10.5434 10.6895 10.3246 10.9083C10.1058 11.1271 9.80909 11.25 9.49967 11.25H2.49967C2.19026 11.25 1.89351 11.1271 1.67472 10.9083C1.45592 10.6895 1.33301 10.3928 1.33301 10.0833V3.08333ZM3.66634 7.75H4.83301V8.91667H3.66634V7.75Z"
                      stroke="#828282"
                      strokeWidth="0.875"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Crée le DD/MM/YY
                </span>
              </div>
              <span className="text-[#545FFF] font-semibold text-xs px-2 py-1 bg-[#545FFF1A] rounded-sm">
                Validé avocat
              </span>
            </Link>
          </div>
          <Link
            href="/projets/signer-projet/importer"
            className="font-manrope text-base font-semibold text-center text-black self-center relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-black after:left-0 after:-bottom-1 after:scale-x-100 after:origin-left after:transition-transform"
          >
            Importer un document
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
