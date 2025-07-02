import LogoGoogle from "@/assets/images/logo_google.png";
import LogoMicrosoft from "@/assets/images/logo_microsoft.png";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "../Button";
import { Form, Input } from "../Form";
import { Logo } from "../Logo/Logo";
import { Separator } from "../Separator";
import { Paragraphe, Title } from "../Typography";

export const LoginLeft = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="flex flex-col items-center justify-center w-1/2 px-32 py-20">
      <Logo className="w-52 h-fit mb-10" />
      <div className="flex flex-col justify-center items-center gap-4 mb-10">
        <Title level={1} className="font-bold text-3xl font-fraunces">
          Content de vous revoir
        </Title>
        <Paragraphe className="text-[#555351]">
          Connecter vous à votre compte Legaleo
        </Paragraphe>
      </div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type="email"
          placeholder="email@email.com"
          label="Adresse email"
          name="email"
        />
        <Input
          type="password"
          placeholder="*********"
          label="Mot de passe"
          name="password"
        />
        <Button classname="cursor-pointer">Se connecter</Button>
      </Form>
      <div className="flex flex-row gap-2 mt-6">
        <Paragraphe className="text-[#555351] font-base font-medium">
          Vous n&apos;avez pas de compte&nbsp;?
        </Paragraphe>
        <Button
          href="/register"
          primary
          classname="font-semibold hover:underline"
        >
          S’inscrire
        </Button>
      </div>
      <Button
        href="/register"
        primary
        classname="font-semibold hover:underline mb-7 mt-3"
      >
        Mot de passe oublié ?
      </Button>
      <Separator />
      <div className="flex flex-col gap-5 w-full mt-7">
        <Button
          primary={false}
          classname="rounded-sm flex flex-row items-center justify-center border-gray gap-3"
          onclick={() => signIn("google")}
        >
          <Image src={LogoGoogle} alt="Logo google" /> Continuer avec Google
        </Button>
        <Button
          primary={false}
          classname="rounded-sm flex flex-row items-center justify-center border-gray gap-3"
        >
          <Image src={LogoMicrosoft} alt="Logo google" /> Continuer avec
          Microsoft
        </Button>
      </div>
    </div>
  );
};
