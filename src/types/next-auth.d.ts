// types/next-auth.d.ts

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DefaultSession } from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";

// Augment the Session interface
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      name: string;
      email: string;
      image?: string;
    } & Record<string>;
  }
}

// Augment the JWT type
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }
}
