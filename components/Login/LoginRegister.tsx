"use client";
import { createUser, handleSubmit } from "@/utils/functions";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../Button";
import { Form, Input } from "../Form";
import { Paragraphe, Title } from "../Typography";

interface LoginRegisterProps {
  isLoading?: boolean;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}

export const LoginRegister = ({ setIsLoading }: LoginRegisterProps) => {
  const [showCreateUser, setShowCreateUser] = useState<boolean>(false);
  const router = useRouter();

  const handleShowRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowCreateUser(!showCreateUser);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      // Solution temporaire : vérifiez les valeurs avant l'appel
      if (!email || !password) {
        throw new Error("Email et mot de passe requis");
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Identifiants invalides. Veuillez réessayer.", {
          position: "top-right",
          theme: "colored",
        });
      } else {
        router.push("/onboarding");
      }
    } catch (error) {
      console.error("Erreur d'authentification:", error);
      toast.error("Une erreur technique est survenue", {
        position: "top-right",
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showCreateUser ? (
        <>
          <div className="flex flex-col justify-center items-center gap-4 mb-10">
            <Title level={1} className="font-bold text-3xl font-fraunces">
              Nouveau sur Legaleo ?
            </Title>
            <Paragraphe className="text-[#555351]">
              Créer votre compte maintenant
            </Paragraphe>
          </div>
          <Form onSubmit={(e) => handleSubmit(e, createUser)}>
            <div className="flex flex-row gap-2.5">
              <Input
                type="text"
                placeholder="Votre nom"
                label="Nom"
                name="name"
              />
              <Input
                type="text"
                placeholder="Votre prenom"
                label="Prénom"
                name="last_name"
              />
            </div>
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
            <Button classname="cursor-pointer" type="submit">
              Créer un compte
            </Button>
          </Form>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center gap-4 mb-10">
            <Title level={1} className="font-bold text-3xl font-fraunces">
              Content de vous revoir
            </Title>
            <Paragraphe className="text-[#555351]">
              Connecter vous à votre compte Legaleo
            </Paragraphe>
          </div>
          <Form onSubmit={handleLogin}>
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
            <Button classname="cursor-pointer" type="submit">
              Se connecter
            </Button>
          </Form>
        </>
      )}
      <div className="flex flex-row gap-2 mt-6">
        <Paragraphe className="text-[#555351] font-base font-medium">
          {showCreateUser
            ? "Vous avez déjà un compte ?"
            : "Vous n'avez pas de compte ?"}
        </Paragraphe>
        <Button
          primary
          classname="font-semibold hover:underline !p-0 !bg-white !text-secondary cursor-pointer !border-0 !appearance-none !hover:border-0 "
          onclick={(e) => handleShowRegister(e)}
        >
          {showCreateUser ? "Se connecter" : "S’inscrire"}
        </Button>
      </div>
      <Button
        primary
        classname="font-semibold hover:underline !p-0 !bg-white !text-secondary cursor-pointer !border-0 !appearance-none !hover:border-0 mt-5 mb-10"
      >
        Mot de passe oublié ?
      </Button>
    </>
  );
};
