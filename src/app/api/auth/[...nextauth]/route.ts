import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Username",
          type: "text",
          placeholder: "muhammadgalang@gmail.com",
        },
        password: { label: "Password", type: "password" },
        access_token: { label: "access_token", type: "hidden" },
      },
      async authorize(credentials) {
        if (credentials?.access_token) {
          return {
            access_token: credentials?.access_token,
          };
        }

        // Traditional login logic (email/password)
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_URL_API}/api/v1/users/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            {
              headers: {
                accept: "*/*",
                "Content-Type": "application/json",
              },
            }
          );
          return res.data.data; // Return the user data on successful login
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Login failed");
          } else {
            throw new Error("An unknown error occurred");
          }
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt", // JWT strategy to handle the session
  },
  // callbacks: {
  //   async jwt({ token, user, account, profile }) {
  //     if (user) {
  //       token.user = user;
  //       token.profile = {
  //         picture: profile?.picture,
  //       };
  //     }
  //     if (account?.provider === "google") {
  //       token.picture = profile?.picture; // simpan picture
  //       token.access_token = account.access_token;
  //     }
  //     console.log("data user", user);
  //     console.log("data user", user?.profile?.picture);
  //     return token;
  //   },

  //   // async session({ session, token }) {
  //   //   // Spread google data ke session
  //   //   session.user = {
  //   //     ...session.user,
  //   //     google: token.google,
  //   //   };
  //   //   return session;
  //   // },
  //   async session({ session, token }) {
  //     // Pastikan data user ada di session
  //     if (token?.user) {
  //       session.user = token.user; // Simpan data user ke dalam session
  //       session.user = {
  //         ...session.user,
  //         google: token.google,
  //       };
  //     }
  //     if (token?.picture) {
  //       session.user.picture = token.picture; // Simpan picture dari Google (jika ada)
  //     }

  //     return session;
  //   },
  // },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  // callbacks: {
  //   async signIn({ account, profile }) {
  //     if (account?.provider === "google") {
  //       // Di sini, NextAuth sudah menangani Google OAuth,
  //       // tidak perlu verifikasi ulang di backend jika sudah terverifikasi di sisi NextAuth
  //       // Kamu bisa langsung mengakses profile untuk mengambil data pengguna
  //       const user = {
  //         email: profile?.email,
  //         name: profile?.name,
  //         picture: profile?.picture,
  //       };

  //       const data = { ...user };

  //       console.log("data", data);
  //       // return data;
  //     }
  //     return true;
  //   },
  //   async jwt({ user, token, account, profile }) {
  //     if (account?.provider === "google") {
  //       // Tambahkan data Google ke token
  //       token.google = {
  //         access_token: account.access_token,
  //         id_token: account.id_token,
  //         provider: account.provider,
  //       };
  //     }

  //     if (user) {
  //       token.user = user;

  //       token.profile = {
  //         picture: profile?.picture,
  //       };
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     // Spread google data ke session
  //     session.user = {
  //       ...session.user,
  //       google: token.google,
  //     };
  //     return session;
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/sign-in", // Custom sign-in page
  },
});

export { handler as GET, handler as POST };
