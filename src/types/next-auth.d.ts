// types/next-auth.d.ts

import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

// Augment the Session interface
declare module "next-auth" {
  interface User {
    access_token?: string;
    profile?: {
      picture?: string;
    };
  }
}

declare module "next-auth" {
  interface Profile {
    picture?: string; // tambahkan field picture
    emails?: string;
  }
}

declare module "next-auth" {
  interface Session {
    access_token?: string;
    google?: {
      id_token?: string;
      provider?: string;
    };
    user: {
      id?: string | number;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      picture?: string | null;
      profile?: string | null;
      google?: {
        access_token?: string;
        id_token?: string;
        provider?: string;
      };
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    google?: {
      access_token?: string;
      id_token?: string;
      provider?: string;
    };
  }
}
