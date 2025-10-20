// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

// Augment the Session interface
declare module "next-auth" {
  interface Session {
    access_token?: string;
    user: {
      id?: string | number;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      picture?: string | null;
    };
  }
  interface User {
    access_token?: string; // Explicitly add access_token here
    profile?: {
      picture?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string; // Add access_token to JWT
  }
}
