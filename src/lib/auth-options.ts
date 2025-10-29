import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { AuthOptions, getServerSession } from "next-auth";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

const authOptions: AuthOptions = {
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
            `${process.env.NEXT_PUBLIC_URL_API}/auth/api/v1/users/login`,
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
            throw new Error(error.response?.data.errors || "Login failed");
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
        token.access_token = user.access_token ?? undefined;
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/sign-in", // Custom sign-in page
  },
};

async function getAuthServerSession(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  const session = await getServerSession(...args, authOptions);
  return {
    access_token: session?.user?.access_token ?? null,
    userId: session?.user?.id ?? null,
  };
}

export { authOptions, getAuthServerSession };
