export interface ButtonPropos {
  primary?: boolean;
  children: React.ReactNode;
  onclick?: () => void;
  type?: "submit" | "button";
  href?: string;
  isdisabled?: boolean;
  classname?: string;
}

export interface InputProps {
  type: "textarea" | "text" | "email" | "password" | "number";
  placeholder: string;
  label: string;
  isrequired?: boolean;
  name: string;
}
