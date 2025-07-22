import { PrismaAdapter } from "@auth/prisma-adapter";
import { SHA256 } from "crypto-js";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import { prisma } from "./lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  basePath: "/api/auth",
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    }),
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
      authorization: {
        params: {
          scope: "openid email profile User.Read",
        },
      },
      profile(profile) {
        return {
          id: profile.oid || profile.sub, // Microsoft utilise souvent 'oid' ou 'sub' pour l'ID
          name: profile.name,
          email: profile.email,
          // image: profile.picture,
        };
      },
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Vérifier l'existence de l'utilisateur
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) return null;

        const hashedPassword = SHA256(
          credentials.password as string
        ).toString();

        // Comparez les mots de passe hachés
        if (hashedPassword === user.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirige vers onboarding seulement après une connexion réussie
      if (url.startsWith("/onboarding")) return url;
      if (url.startsWith(baseUrl)) return url;
      return baseUrl + "/onboarding";
    },
    async jwt({ token, user }) {
      // Ajoutez les données utilisateur au token JWT
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Ajoutez les données du token à la session

      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  debug: true, // 🔍 Active le log en dev
});
