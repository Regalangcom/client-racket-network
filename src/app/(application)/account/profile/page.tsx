import ProfilePage from "@/components/account/profile/profile-page";
import { getAuthServerSession } from "@/lib/auth-options";
import { redirect } from "next/navigation";

type UserData = {
  username: string;
  phone_number: string;
  email: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  picture: string;
};

async function getUserData(accessToken: string): Promise<UserData> {
  const apiUrl = process.env.URL_API || process.env.NEXT_PUBLIC_URL_API;

  const response = await fetch(`${apiUrl}/auth/api/v1/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const result = await response.json();
  const userData = result.data;

  return {
    username: userData.username || "",
    phone_number: userData.phone_number || "",
    email: userData.email || "",
    level: (userData.level_skills || "Beginner") as
      | "Beginner"
      | "Intermediate"
      | "Advanced",
    picture: userData.profile?.pictureUrl
      ? `${process.env.NEXT_PUBLIC_URL_API}/${userData.profile.picture}`
      : "",
  };
}

export default async function ProfilePages() {
  const { access_token } = await getAuthServerSession();

  if (!access_token) {
    redirect("/login");
  }

  const user = await getUserData(access_token ?? "");
  return (
    <>
      <ProfilePage initialUser={user} access_token={access_token} />
    </>
  );
}
