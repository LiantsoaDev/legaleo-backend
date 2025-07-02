"use client";

import { LoginLeft } from "./LoginLeft";
import { LoginRight } from "./LoginRight";

export const Login = () => {
  return (
    <div className="flex flex-row gap-0 min-h-screen">
      <LoginLeft />
      <LoginRight />
    </div>
  );
};
