import { getAuthServerSession } from "@/lib/auth-options";
import AccountPage from "../../../components/account/account-account";
import { signOut } from "next-auth/react";

export type User = {
  id: number;
  email: string;
  username: string;
  profile: {
    id: number;
    picture: string;
    location: string;
    bio: string;
    userId: number;
  };
  level_skills: string;
};

const getUserLoggedIn = async (access_token: string) => {
  if (!access_token) {
    return null;
  }

  try {
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/auth/api/v1/users/me
`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const userData = await user.json();
    return userData.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export default async function AccountPages() {
  const { access_token } = await getAuthServerSession();

  const user: User = await getUserLoggedIn(access_token ?? "");

  return <AccountPage user={user} />;
}
