import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
// import { Session } from "next-auth";
// import { JWT } from "next-auth/jwt";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 40000,
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  // callbacks: {
  //   // Callback untuk JWT
  //   async jwt({ token, account, user }) {
  //     if (account?.provider === "google") {
  //       const res = await axios.get(
  //         `${process.env.NEXT_PUBLIC_URL_API}/auth/google/callback`,
  //         {
  //           params: {
  //             code: account.code,
  //           },
  //         }
  //       );

  //       token.accessToken = res.data.access_token;
  //       token.refreshToken = res.data.refresh_token;
  //       if (user) token.user = user;

  //       console.log("token", token);
  //     }
  //     return token;
  //   },

  //   // Callback untuk Session
  //   async session({ session, token }: { session: Session; token: JWT }) {
  //     // Menambahkan accessToken dan refreshToken ke dalam session
  //     session.accessToken = token.accessToken;
  //     session.refreshToken = token.refreshToken;
  //     session.user = token.user; // Menyimpan data pengguna
  //     console.log("session", session.user);
  //     return session;
  //   },
  // },
  callbacks: {
    // Callback untuk JWT - tidak perlu request ke API eksternal
    async jwt({ token, account, user }) {
      if (account?.provider === "google") {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        if (user) token.user = user;
      }
      return token;
    },

    // Callback untuk session
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = token.user;
      return session;
    },
  },
});

export default handler;
