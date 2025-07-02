"use client";
import { ButtonPropos } from "@/utils/types";
import Link from "next/link";

export const Button = ({
  primary = true,
  children,
  href,
  type,
  isdisabled = false,
  classname,
}: ButtonPropos) => {
  return href ? (
    <Link
      href={href}
      className={
        primary
          ? `font-semibold font-manrope text-base ${classname}`
          : "btn-secondary"
      }
    >
      {children}
    </Link>
  ) : (
    <button
      type={type ? type : "button"}
      className={
        primary
          ? `bg-secondary text-white px-5 py-3 font-manrope font-bold border-secondary rounded-full hover:bg-white hover:text-black text-base md:text-xl lg:text-base transition ease-in-out duration-500 hover:border-secondary hover:border disabled:opacity-90 disabled:cursor-not-allowed ${classname}`
          : `bg-white text-black px-5 py-3 text-center border-secondary border font-manrope font-bold rounded-full cursor-pointer hover:bg-secondary hover:text-white hover:border-white ${classname}`
      }
      disabled={isdisabled}
    >
      {children}
    </button>
  );
};
