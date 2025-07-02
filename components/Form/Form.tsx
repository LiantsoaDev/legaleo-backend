"use client";

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export const Form = ({ onSubmit, children }: FormProps) => {
  return (
    <form className="flex flex-col gap-6 w-full" onSubmit={(e) => onSubmit(e)}>
      {children}
    </form>
  );
};
