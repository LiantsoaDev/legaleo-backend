import Link from "next/link";

interface ProjectCardProps {
  icon?: React.ReactNode;
  title?: string;
  href: string;
  description?: string;
  classTitle?: string;
  className?: string;
  isRecommanded?: boolean;
}

export const ProjectCard = ({
  icon,
  title,
  href,
  description,
  classTitle,
  className,
  isRecommanded,
}: ProjectCardProps) => {
  return (
    <Link
      className={`border border-gray py-5 flex flex-col justify-center items-center gap-2.5 w-full text-xs font-semibold rounded-md cursor-pointer hover:bg-gray-100 transition-colors ${className}`}
      href={href}
    >
      <span>{icon}</span>
      <span className={`${classTitle}`}>{title}</span>
      {description && (
        <span className="text-center font-medium text-xl text-[#828282]">
          {description}
        </span>
      )}
      {isRecommanded && (
        <span className="bg-[#E0F7F7] text-[#00B3B3] text-xl font-semibold px-2.5 py-1 rounded-sm mt-2">
          Recommandé
        </span>
      )}
    </Link>
  );
};
