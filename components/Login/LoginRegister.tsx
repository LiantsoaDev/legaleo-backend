"use client";
import { createUser, handleSubmit } from "@/utils/functions";
import { useState } from "react";
import { Button } from "../Button";
import { Form, Input } from "../Form";
import { Paragraphe, Title } from "../Typography";

export const LoginRegister = () => {
  const [showCreateUser, setShowCreateUser] = useState<boolean>(false);

  const handleShowRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowCreateUser(!showCreateUser);
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
          <Form onSubmit={(e) => handleSubmit(e, () => console.log("mandona"))}>
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
        href="/register"
        primary
        classname="font-semibold hover:underline mb-7 mt-3"
      >
        Mot de passe oublié ?
      </Button>
    </>
  );
};
