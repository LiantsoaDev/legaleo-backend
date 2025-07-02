interface ParaProps {
  children: React.ReactNode;
  className?: string;
}

export const Paragraphe = ({ children, className }: ParaProps) => {
  return (
    <p className={`text-base font-manrope font-medium leading-6 ${className}`}>
      {children}
    </p>
  );
};
