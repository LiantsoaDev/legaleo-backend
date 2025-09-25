import Link from "next/link";

interface MenuTextProps {
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  href: string;
  isActive?: boolean;
}

interface MenuAccountTextProps {
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  href: string;
}

interface ProjectActionProps {
  className?: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  href: string;
  disabled?: boolean;
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
      className={`flex items-center relative after:content-[""] after:absolute after:left-[-20px] ${
        isActive && "after:w-[2px]"
      }  after:rounded-2xl  after:h-12 after:bg-white ${
        isActive ? "after:w-[1px]" : ""
      }`}
    >
      <Link
        href={href}
        className={`flex flex-row items-center justify-start font-semibold gap-5 text-sm py-5 rounded-xl ${
          isActive && "bg-[#D9FDFB33]"
        } hover:bg-[#D9FDFB33] px-5 w-full ${className}`}
      >
        {icon && <span>{icon}</span>}
        {children}
      </Link>
    </div>
  );
};

export const ProjectAction = ({
  className,
  children,
  icon,
  href,
  disabled = false,
}: ProjectActionProps) => {
  return (
    <Link
      href={href}
      className={`flex flex-row gap-2.5 items-center ${
        disabled ? "text-gray" : "text-[#087F83]"
      } font-medium text-xs hover:opacity-85 transition-all duration-300 hover:underline  ${className}`}
    >
      {icon && <span>{icon}</span>}
      <span className={className}>{children}</span>
    </Link>
  );
};

export const MenuAccountText = ({
  className,
  children,
  icon,
  href,
}: MenuAccountTextProps) => {
  return (
    <Link
      href={href}
      className={`flex flex-row items-center gap-3 text-white py-3.5 px-2 ${className}`}
    >
      {icon && icon}
      <span className="font-medium text-sm font-manrope">{children}</span>
    </Link>
  );
};
