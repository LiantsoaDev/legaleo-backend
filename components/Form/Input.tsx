"use client";

import { getErrorMessage, getInputValue } from "@/utils/functions";
import { InputProps } from "@/utils/types";
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
