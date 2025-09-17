"use client";
import { ProjectCard } from "@/components/Card";
import { Title } from "@/components/Typography";
import Link from "next/link";

export const NewProject = () => {
  return (
    <div className="flex flex-col gap-16 py-32 px-72">
      <Title className="text-center font-semibold text-5xl  font-manrope text-black">
        Commencer un projet
      </Title>
      <div className="flex justify-content gap-7 items-stretch">
        <ProjectCard
          icon={
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="18" fill="#62E7EB" />
              <path
                d="M19.4314 9.73291C18.5559 9.18571 17.4449 9.18571 16.5694 9.73291L11.1694 13.1079C10.38 13.6013 9.90039 14.4666 9.90039 15.3975V20.6022C9.90039 21.5332 10.38 22.3984 11.1694 22.8918L16.5694 26.2668C17.4449 26.814 18.5559 26.814 19.4314 26.2668L24.8314 22.8918C25.6208 22.3984 26.1004 21.5332 26.1004 20.6022V15.3975C26.1004 14.4666 25.6208 13.6013 24.8314 13.1079L19.4314 9.73291Z"
                fill="white"
                stroke="white"
                strokeWidth="1.35"
                strokeLinecap="round"
              />
            </svg>
          }
          title="Génération assistée par IA"
          description="Créez un contrat en répondant à quelques questions."
          classTitle="font-semibold text-2xl text-black px-8 mt-5 text-center"
          className="py-10 px-7"
          href="/projets/nouveau/generer"
        />
        <ProjectCard
          icon={
            <svg
              width="28"
              height="30"
              viewBox="0 0 28 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 3.23585e-08H5C3.80653 3.23585e-08 2.66193 0.474106 1.81802 1.31802C0.974106 2.16193 0.5 3.30653 0.5 4.5V25.5C0.5 26.6935 0.974106 27.8381 1.81802 28.682C2.66193 29.5259 3.80653 30 5 30H23C24.1935 30 25.3381 29.5259 26.182 28.682C27.0259 27.8381 27.5 26.6935 27.5 25.5V13.5H18.5C17.3065 13.5 16.1619 13.0259 15.318 12.182C14.4741 11.3381 14 10.1935 14 9V3.23585e-08ZM27.5 10.5V10.242C27.4993 9.04914 27.0251 7.90535 26.1815 7.062L20.4395 1.317C19.5955 0.473578 18.4512 -0.000142952 17.258 3.23585e-08H17V9C17 9.39782 17.158 9.77936 17.4393 10.0607C17.7206 10.342 18.1022 10.5 18.5 10.5H27.5Z"
                fill="#62E7EB"
              />
            </svg>
          }
          title="Utiliser un contrat Legaleo"
          description="Commencez à partir d’un modèle juridique personnalisable."
          classTitle="font-semibold text-2xl text-black px-8 mt-5 text-center"
          className="py-10 px-7"
          isRecommanded
          href="/projets/nouveau/models"
        />
        <ProjectCard
          icon={
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.36944 10.1306L12.8069 18.5681L14 19.7611L15.1931 18.5681L23.6306 10.1306L21.2444 7.74444L15.6875 13.3014V0.5H24.125C25.0201 0.5 25.8785 0.855579 26.5115 1.48851C27.1444 2.12145 27.5 2.97989 27.5 3.875V24.125C27.5 25.0201 27.1444 25.8785 26.5115 26.5115C25.8785 27.1444 25.0201 27.5 24.125 27.5H3.875C2.97989 27.5 2.12145 27.1444 1.48851 26.5115C0.855579 25.8785 0.5 25.0201 0.5 24.125V3.875C0.5 2.97989 0.855579 2.12145 1.48851 1.48851C2.12145 0.855579 2.97989 0.5 3.875 0.5H12.3125V13.3014L6.75556 7.74444L4.36944 10.1306Z"
                fill="#62E7EB"
              />
            </svg>
          }
          title="Importer un document"
          description="Commencer à partir d'un contrat déjà rédigé"
          classTitle="font-semibold text-2xl text-black px-8 mt-5 text-center"
          className="py-10 px-7"
          href="/projets/nouveau/importer"
        />
      </div>
      <Link
        href="/projets/nouveau/vierge"
        className="font-manrope text-base font-semibold text-center text-black self-center relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-black after:left-0 after:-bottom-1 after:scale-x-100 after:origin-left after:transition-transform"
      >
        Je préfère commencer à partir d'un document vierge
      </Link>
    </div>
  );
};
