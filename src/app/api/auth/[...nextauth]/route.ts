// import CredentialsProvider from "next-auth/providers/credentials";
// import axios from "axios";
// import NextAuth from "next-auth";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "email",
//           type: "text",
//           placeholder: "muhammadgalang@gmail.com",
//         },
//         password: { label: "Password", type: "password" },
//         access_token: { label: "access_token", type: "hidden" },
//         // username: { label: "username", type: "text" },
//       },
//       async authorize(credentials) {
//         if (credentials?.access_token) {
//           return {
//             access_token: credentials?.access_token,
//             // username: credentials?.username,
//           };
//         }

//         // Traditional login logic (email/password)
//         try {
//           const res = await axios.post(
//             `${process.env.NEXT_PUBLIC_URL_API}/api/v1/users/login`,
//             {
//               email: credentials?.email,
//               password: credentials?.password,
//             },
//             {
//               headers: {
//                 accept: "*/*",
//                 "Content-Type": "application/json",
//               },
//               withCredentials: true,
//             }
//           );
//           if (res.data && res.data.data) {
//             return res.data.data; // Kembalikan data pengguna dan access_token
//           }

//           throw new Error("Login failed: No data returned");
//           // return res.data.data; // Return the user data on successful login
//         } catch (error) {
//           if (axios.isAxiosError(error)) {
//             throw new Error(error.response?.data.message || "Login failed");
//           } else {
//             throw new Error("An unknown error occurred");
//           }
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt", // JWT strategy to handle the session
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       return { ...token, ...user };
//     },
//     async session({ session, token }) {
//       session.user = token;
//       return session;
//     },
//   },
//   // callbacks: {
//   //   // Callback untuk menangani JWT: Menyimpan data pengguna dan access_token ke dalam token JWT
//   //   async jwt({ token, user }) {
//   //     if (user) {
//   //       token.id = user.id;
//   //       token.email = user.email;
//   //       token.name = user.name;
//   //       token.picture = user.picture || user.profile?.picture; // Simpan gambar profil jika ada
//   //       token.access_token = user.access_token; // Simpan access_token ke dalam token JWT
//   //     }
//   //     return token; // Return token dengan data yang sudah ditambahkan
//   //   },

//   //   // Callback untuk menangani session: Menyimpan data ke dalam session
//   //   async session({ session, token }) {
//   //     session.user = token; // Menyimpan data pengguna ke dalam session
//   //     return session; // Return session dengan data pengguna
//   //   },
//   // },
//   // callbacks: {
//   //   async signIn({ account, profile }) {
//   //     if (account?.provider === "google") {
//   //       // Di sini, NextAuth sudah menangani Google OAuth,
//   //       // tidak perlu verifikasi ulang di backend jika sudah terverifikasi di sisi NextAuth
//   //       // Kamu bisa langsung mengakses profile untuk mengambil data pengguna
//   //       const user = {
//   //         email: profile?.email,
//   //         name: profile?.name,
//   //         picture: profile?.picture,
//   //       };

//   //       const data = { ...user };

//   //       console.log("data", data);
//   //       // return data;
//   //     }
//   //     return true;
//   //   },
//   //   async jwt({ user, token, account, profile }) {
//   //     if (account?.provider === "google") {
//   //       // Tambahkan data Google ke token
//   //       token.google = {
//   //         access_token: account.access_token,
//   //         id_token: account.id_token,
//   //         provider: account.provider,
//   //       };
//   //     }

//   //     if (user) {
//   //       token.user = user;

//   //       token.profile = {
//   //         picture: profile?.picture,
//   //       };
//   //     }
//   //     return token;
//   //   },
//   //   async session({ session, token }) {
//   //     // Spread google data ke session
//   //     session.user = {
//   //       ...session.user,
//   //       google: token.google,
//   //     };
//   //     return session;
//   //   },
//   // },
//   secret: process.env.NEXTAUTH_SECRET,
//   debug: process.env.NODE_ENV === "development",
//   pages: {
//     signIn: "/sign-in", // Custom sign-in page
//   },
// });

// export { handler as GET, handler as POST };

import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
        access_token: { label: "Access Token", type: "hidden" },
      },
      async authorize(credentials) {
        if (credentials?.access_token) {
          return { access_token: credentials?.access_token }; // Return only access_token if provided
        }

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
              withCredentials: true,
            }
          );

          return res.data.data; // Return data including access_token
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Login failed");
          } else {
            throw new Error("An unknown error occurred");
          }
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT strategy for session management
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token ?? undefined; // Use undefined if access_token is null
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        // token.picture = user.picture;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token; // Add the user data from token to session
      return session;
    },
  },

  // callbacks: {
  //   async jwt({ token, user }) {
  //     return { ...token, ...user };
  //   },
  //   async session({ session, token }) {
  //     session.user = token;
  //     return session;
  //   },
  // },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development", // Enable debugging in development
  pages: {
    signIn: "/sign-in", // Custom sign-in page
  },
});

export { handler as GET, handler as POST };
