"use client";

import { getErrorMessage, getInputValue } from "@/utils/functions";
import {
  CheckBoxProps,
  InputFilesProps,
  InputProps,
  MultiSelectGroupProps,
  RadioProps,
  SelectProps,
} from "@/utils/types";
import {
  faChevronDown,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export const Input = ({
  type,
  placeholder,
  label,
  isrequired,
  name,
  classname,
}: InputProps) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const computedType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  useEffect(() => {}, [value, error, showPassword]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        className="form-label font-manrope text-sm font-semibold"
        htmlFor={name}
      >
        {label ? label : ""}
      </label>
      {type === "textarea" ? (
        <textarea
          className={`w-full border rounded-md px-2 py-3 md:px-4 md:py-4 lg:px-2 lg:py-3 md:text-lg lg:text-base focus:outline-none focus:bg-white focus:text-black outline-none text-black ${
            error ? "border-danger" : "border-gray"
          } bg-transparent placeholder:capitalize`}
          placeholder={placeholder}
          name={name}
          required={isrequired}
          id={name}
          value={value}
          onChange={(e) => getInputValue(e, setValue, setError)}
        />
      ) : (
        <div className="relative">
          <input
            className={`w-full border border-opacity-60 rounded-sm px-2 py-3 md:px-4 md:py-4 lg:px-2 lg:py-3 md:text-lg lg:text-base focus:outline-none focus:bg-white focus:text-black outline-none text-black ${
              error ? "border-danger" : "border-gray"
            } bg-transparent ${classname}`}
            type={computedType}
            placeholder={placeholder}
            name={name}
            required={isrequired}
            id={name}
            formNoValidate
            value={value}
            onChange={(e) => getInputValue(e, setValue, setError)}
          />
          {type === "password" && (
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[50%] translate-y-[-50%] transform cursor-pointer"
            />
          )}
        </div>
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
  showLogo,
  classLabel = "",
  classSelected,
}: CheckBoxProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={`py-3 px-5 font-manrope border border-[#8C8783] select-none text-xl flex items-center gap-2.5 cursor-pointer text-[#8C8783] rounded-md ${classLabel} ${
          isSelected
            ? `bg-primary text-white border-none ${classSelected}`
            : "bg-transparent"
        }`}
      >
        {showLogo &&
          (isSelected ? (
            <div className="w-5 h-5 bg-white border border-gray rounded-full" />
          ) : (
            <div className="w-5 h-5 bg-transparent border border-[#8C8783] rounded-full" />
          ))}
        {/* {showLogo && <FontAwesomeIcon icon={faCircle} className="text-base" />} */}
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

export const RadioGroup = ({
  name,
  options,
  showLogo = false,
  classContainer,
  classLabel,
  classSelected,
}: RadioProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  return (
    <div className={`flex gap-4 flex-wrap ${classContainer}`}>
      {options.map((option, index) => (
        <CheckBox
          showLogo={showLogo}
          key={index}
          id={`radio-${index}`}
          value={option}
          isSelected={selectedValue === option}
          onSelect={() => setSelectedValue(option)}
          name={name}
          type="radio"
          classLabel={classLabel}
          classSelected={classSelected}
        />
      ))}
    </div>
  );
};

export const MultiSelectGroup = ({
  options,
  showLogo,
}: MultiSelectGroupProps) => {
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
    <div className="flex gap-4 flex-wrap">
      {options.map((option, index) => (
        <CheckBox
          showLogo={showLogo}
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
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="flex flex-row gap-2.5 py-4 px-8 border-[3px] border-[#A7B0FF] border-dashed font-semibold text-md cursor-pointer rounded-2xl w-full text-xl"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 21.25V3.75"
            stroke="#3300FF"
            strokeWidth="1.875"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25 26.25H5"
            stroke="#3300FF"
            strokeWidth="1.875"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21.2503 15L14.999 21.2512L8.74902 15"
            stroke="#3300FF"
            strokeWidth="1.875"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {label}{" "}
        {fileName && <span className="text-gray-600 text-xl">{fileName}</span>}
      </label>
      <input
        type="file"
        className="hidden"
        name={name}
        id={id}
        required={isrequired}
        accept={accept}
        onChange={handleFileChange}
      />
    </div>
  );
};

export const Select = ({
  id,
  name,
  options,
  isMultiple = false,
  classname = "",
  isFilter = false,
}: SelectProps) => {
  const [selects, setSelects] = useState([0]);

  const addSelect = () => {
    setSelects((prev) => [...prev, prev.length]);
  };

  return (
    <div className="w-full flex flex-col gap-5 items-center justify-between">
      {selects.map((index) => (
        <div className="flex flex-row w-full" key={index}>
          <div className="relative w-full">
            <select
              defaultValue={""}
              name={name}
              id={id}
              className={`w-[80%] border border-gray relative rounded-md px-8 py-5 bg-white text-black focus:outline-none appearance-none after:content-[''] ${classname}`}
              style={{
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
              }}
            >
              {!isFilter && (
                <option value="" disabled>
                  Sélectionnez une option
                </option>
              )}

              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute top-[50%] translate-y-[-50%] z-10 right-[10px] text-xs text-[#86A2A3]"
            />
          </div>
          {isMultiple && index === selects.length - 1 && (
            <button
              className="appearance-none text-lg ml-3 text-accent cursor-pointer"
              onClick={addSelect}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
