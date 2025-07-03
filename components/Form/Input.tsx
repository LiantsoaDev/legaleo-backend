"use client";

import { getErrorMessage, getInputValue } from "@/utils/functions";
import {
  CheckBoxProps,
  InputFilesProps,
  InputProps,
  MultiSelectGroupProps,
  RadioProps,
} from "@/utils/types";
import { useEffect, useState } from "react";

export const Input = ({
  type,
  placeholder,
  label,
  isrequired,
  name,
}: InputProps) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {}, [value, error]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        className="form-label font-manrope text-sm font-semibold"
        htmlFor={name}
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          className={`w-full border border-gray rounded-md px-2 py-3 md:px-4 md:py-4 lg:px-2 lg:py-3 md:text-lg lg:text-base focus:outline-none focus:bg-white focus:text-black outline-none text-black ${
            error ? "border-red" : "border-gray"
          } bg-transparent placeholder:capitalize`}
          placeholder={placeholder}
          name={name}
          required={isrequired}
          id={name}
          value={value}
          onChange={(e) => getInputValue(e, setValue, setError)}
        />
      ) : (
        <input
          className={`w-full border border-opacity-60 border-gray rounded-sm px-2 py-3 md:px-4 md:py-4 lg:px-2 lg:py-3 md:text-lg lg:text-base focus:outline-none focus:bg-white focus:text-black outline-none text-black ${
            error ? "border-red" : "border-gray"
          } bg-transparent`}
          type={type}
          placeholder={placeholder}
          name={name}
          required={isrequired}
          id={name}
          value={value}
          onChange={(e) => getInputValue(e, setValue, setError)}
        />
      )}
      {error && (
        <span className="text-danger text-sm md:text-lg lg:text-sm mt-1">
          {getErrorMessage(type, value)}
        </span>
      )}
    </div>
  );
};

export const CheckBox = ({
  value,
  id,
  isSelected,
  onSelect,
  name,
  type,
}: CheckBoxProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={`py-3 px-5 font-manrope border border-gray select-none ${
          isSelected ? "bg-primary text-white border-none" : "bg-transparent"
        } text-2xl cursor-pointer text-gray rounded-md uppercase`}
      >
        {value}
      </label>
      <input
        type={type}
        checked={isSelected}
        onChange={onSelect}
        className="hidden"
        name={name}
        id={id}
        value={value}
      />
    </div>
  );
};

export const RadioGroup = ({ name, options }: RadioProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  return (
    <div className="flex gap-4">
      {options.map((option, index) => (
        <CheckBox
          key={index}
          id={`radio-${index}`}
          value={option}
          isSelected={selectedValue === option}
          onSelect={() => setSelectedValue(option)}
          name={name}
          type="radio"
        />
      ))}
    </div>
  );
};

export const MultiSelectGroup = ({ options }: MultiSelectGroupProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelect = (option: string) => {
    if (selectedOptions.includes(option)) {
      // On retire l'option si elle est déjà sélectionnée
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      // On l'ajoute sinon
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  return (
    <div className="flex gap-4">
      {options.map((option, index) => (
        <CheckBox
          key={index}
          id={`checkbox-${index}`}
          value={option}
          isSelected={selectedOptions.includes(option)}
          onSelect={() => handleSelect(option)}
          type="checkbox"
        />
      ))}
    </div>
  );
};

export const InputFiles = ({
  label,
  name,
  accept,
  isrequired,
  id,
}: InputFilesProps) => {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="py-8 px-8 border-4 border-[#A7B0FF] border-dashed font-semibold text-xl cursor-pointer rounded-2xl w-full"
      >
        {label}
      </label>
      <input
        type="file"
        className="hidden"
        name={name}
        id={id}
        required={isrequired}
        accept={accept}
      />
    </div>
  );
};
