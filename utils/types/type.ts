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

export interface CheckBoxProps {
  id: string;
  value: string;
  isSelected?: boolean;
  onSelect?: () => void;
  name?: string;
  type: "checkbox" | "radio";
}

export interface RadioProps {
  options: string[];
  name: string;
}

export interface MultiSelectGroupProps {
  options: string[];
}

export interface InputFilesProps {
  name: string;
  label: string;
  isrequired?: boolean;
  accept?: string;
  id: string;
}
