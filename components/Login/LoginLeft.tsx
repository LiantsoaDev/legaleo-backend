"use client";
import LogoGoogle from "@/assets/images/logo_google.png";
import LogoMicrosoft from "@/assets/images/logo_microsoft.png";
import {
  setError,
  startLoading,
  stopLoading,
} from "@/lib/features/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "../Button";
import { FullLoader } from "../Loader";
import { Logo } from "../Logo/Logo";
import { Separator } from "../Separator";
import { LoginRegister } from "./LoginRegister";

export const LoginLeft = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const handleSignIn = async (provider: "google" | "microsoft-entra-id") => {
    dispatch(startLoading());
    try {
      await signIn(provider);
    } catch (error: any) {
      console.error(error);
      dispatch(setError(error.message || "Erreur lors de la connexion"));
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-1/2 px-32 py-20">
      <Logo className="w-52 h-fit mb-10" />
      <LoginRegister />
      <Separator />
      <div className="flex flex-col gap-5 w-full mt-7">
        <Button
          primary={false}
          classname="rounded-sm flex flex-row items-center justify-center border-gray gap-3"
          onclick={() => handleSignIn("google")}
        >
          <Image src={LogoGoogle} alt="Logo google" /> Continuer avec Google
        </Button>
        <Button
          primary={false}
          classname="rounded-sm flex flex-row items-center justify-center border-gray gap-3"
          onclick={() => handleSignIn("microsoft-entra-id")}
        >
          <Image src={LogoMicrosoft} alt="Logo google" /> Continuer avec
          Microsoft
        </Button>
      </div>
      {isLoading && <FullLoader />}
    </div>
  );
};
