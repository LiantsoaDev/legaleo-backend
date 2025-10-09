interface ParaProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Paragraphe = ({ children, className, onClick }: ParaProps) => {
  return (
    <p
      className={`font-manrope font-medium leading-6 ${className}`}
      onClick={onClick}
    >
      {children}
    </p>
  );
};
