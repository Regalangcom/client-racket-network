import { getAuthServerSession } from "@/lib/auth-options";
import AccountPage from "../../../components/account/account-account";
// import { signOut } from "next-auth/react";

export type User = {
  id: number;
  email: string;
  username: string;
  profile: {
    id: number;
    pictureUrl: string;
    location: string;
    picture: string;
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
      `${process.env.NEXT_PUBLIC_URL_API}/auth/api/v1/users/me`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        cache: "no-store",
      }
    );
    const userData = await user.json();
    console.log("API Response:", userData);
    console.log("Picture URL:", userData.data?.profile?.picture);
    console.log("Picture URL S3:", userData.data?.profile?.pictureUrl);
    // console.log("data", userData);

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
