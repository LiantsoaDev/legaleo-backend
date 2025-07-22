import Link from "next/link";

interface MenuTextProps {
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  href: string;
  isActive?: boolean;
}

export const MenuText = ({
  className,
  children,
  icon,
  href,
  isActive = false,
}: MenuTextProps) => {
  return (
    <div
      className={`flex items-center relative after:content-[""] after:absolute after:left-0 ${
        isActive && "after:w-2"
      }  after:rounded-2xl  after:h-20 after:bg-white ${
        isActive ? "after:w-2 border-l-2 rounded-4xl border-white" : ""
      }`}
    >
      <Link
        href={href}
        className={`flex flex-row items-center justify-start gap-5 text-lg py-5 rounded-xl hover:bg-[#D9FDFB33] px-5 w-full ${className}`}
      >
        {icon && <span>{icon}</span>}
        {children}
      </Link>
    </div>
  );
};
