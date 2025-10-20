"use client";

import { useState } from "react";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import { ProfileMobileView } from "./profile-mobile";
import { ProfileDesktopView } from "./profile-dekstop";

// Definisikan tipe profil
export type UserProfile = {
  username: string;
  phone_number: string;
  email: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  picture: string;
};

interface ProfilePageClientProps {
  initialUser: UserProfile;
  access_token: string;
}

export default function ProfilePage({
  initialUser,
  access_token,
}: ProfilePageClientProps) {
  const { isMobile } = useWindowDimension();
  const [user, setUser] = useState<UserProfile>(initialUser);

  const handleUpdateProfile = (updatedData: Partial<UserProfile>) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));
  };

  return (
    isMobile !== undefined &&
    (isMobile ? (
      <ProfileMobileView
        user={user}
        access_token={access_token}
        onUpdateProfile={handleUpdateProfile}
      />
    ) : (
      <ProfileDesktopView user={user} onUpdateProfile={handleUpdateProfile} />
    ))
  );
}
