interface ProjectCardProps {
  icon?: React.ReactNode;
  title?: string;
  onclick?: () => void;
}

export const ProjectCard = ({ icon, title, onclick }: ProjectCardProps) => {
  return (
    <div
      className="border border-gray py-5 flex flex-col justify-center items-center gap-2.5 w-full text-base font-semibold rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={onclick}
    >
      {icon}
      {title}
    </div>
  );
};
