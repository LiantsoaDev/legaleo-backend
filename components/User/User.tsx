"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export const User = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className="w-12 h-12 rounded-full bg-white relative cursor-pointer"
      onClick={() => setShowMenu(!showMenu)}
    >
      {showMenu && (
        <div className="py-3.5 px-3.5 flex flex-col gap-0 bg-white shadow-lg rounded-2xl absolute top-15 right-[-20px] w-[10rem] z-5">
          <Link href="/mon-compte" className="font-semibold text-sm mb-5">
            Mon Compte
          </Link>
          <span
            className="cursor-pointer font-semibold text-sm"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Se déconnecter
          </span>
        </div>
      )}
    </div>
  );
};
