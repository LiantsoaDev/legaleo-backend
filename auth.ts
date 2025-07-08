import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import Google from "next-auth/providers/google";
import { prisma } from "./lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET, // 🔥 Obligatoire ici
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    }),
    AzureADProvider({
      clientId: process.env.AUTH_AZURE_AD_ID ?? "",
      clientSecret: process.env.AUTH_AZURE_AD_SECRET ?? "",
      issuer: `https://login.microsoftonline.com/${process.env.AUTH_AZURE_AD_TENANT_ID}/v2.0`, // 🌐 URL de l'issuer pour Azure AD
    }),
  ],
  callbacks: {
    async redirect() {
      return "/onboarding"; // 🔄 Redirige vers la page d'onboarding après la connexion
    },
  },
  debug: process.env.NODE_ENV === "development", // 🔍 Active le log en dev
});
