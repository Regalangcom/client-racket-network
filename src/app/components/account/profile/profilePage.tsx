"use client";

import { useState } from "react";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import { ProfileMobileView } from "./profileMobile";
import { ProfileDesktopView } from "./profileDekstop";

// Definisikan tipe profil
export type UserProfile = {
  name: string;
  phone: string;
  email: string;
  level: "Beginner" | "Intermediate" | "Advanced";
};

export default function ProfilePage() {
  const { isMobile } = useWindowDimension();
  const [user, setUser] = useState<UserProfile>({
    name: "Titin Suratin",
    phone: "08123456789",
    email: "titinsr@gmail.com",
    level: "Beginner",
  });

  const handleUpdateProfile = (updatedData: Partial<UserProfile>) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));
  };

  return (
    isMobile !== undefined &&
    (isMobile ? (
      <ProfileMobileView user={user} onUpdateProfile={handleUpdateProfile} />
    ) : (
      <ProfileDesktopView user={user} onUpdateProfile={handleUpdateProfile} />
    ))
  );
}
