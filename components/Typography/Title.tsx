type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TitleProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

const sizeClasses = {
  1: "text-4xl",
  2: "text-3xl",
  3: "text-2xl",
  4: "text-xl",
  5: "text-lg",
  6: "text-base",
};

export const Title = ({ level = 1, children, className = "" }: TitleProps) => {
  const Tag = `h${level}` as HeadingTag;

  return <Tag className={`${sizeClasses} ${className}`}>{children}</Tag>;
};
