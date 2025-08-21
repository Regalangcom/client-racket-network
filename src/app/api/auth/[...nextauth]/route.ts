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
