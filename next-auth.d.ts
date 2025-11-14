import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      last_name?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    last_name?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    last_name?: string | null;
  }
}
