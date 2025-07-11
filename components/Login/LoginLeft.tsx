"use client";
import LogoGoogle from "@/assets/images/logo_google.png";
import LogoMicrosoft from "@/assets/images/logo_microsoft.png";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../Button";
import { FullLoader } from "../Loader";
import { Logo } from "../Logo/Logo";
import { Separator } from "../Separator";
import { LoginRegister } from "./LoginRegister";

export const LoginLeft = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicrosoftSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("microsoft-entra-id");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-1/2 px-32 py-20">
      <Logo className="w-52 h-fit mb-10" />
      <LoginRegister setIsLoading={setIsLoading} />
      <Separator />
      <div className="flex flex-col gap-5 w-full mt-7">
        <Button
          primary={false}
          classname="rounded-sm flex flex-row items-center justify-center border-gray gap-3"
          onclick={handleGoogleSignIn}
        >
          <Image src={LogoGoogle} alt="Logo google" /> Continuer avec Google
        </Button>
        <Button
          primary={false}
          classname="rounded-sm flex flex-row items-center justify-center border-gray gap-3"
          onclick={handleMicrosoftSignIn}
        >
          <Image src={LogoMicrosoft} alt="Logo google" /> Continuer avec
          Microsoft
        </Button>
      </div>
      {isLoading && <FullLoader />}
    </div>
  );
};
