"use client";

import { useState } from "react";
import { UserProfile } from "./profile-page";
import { ProfileEditForm } from "./profile-form";

interface ProfileMobileViewProps {
  user: UserProfile;
  access_token: string;
  onUpdateProfile: (data: Partial<UserProfile>) => void;
}

export const ProfileMobileView: React.FC<ProfileMobileViewProps> = ({
  user,
  access_token,
  onUpdateProfile,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="w-full min-h-screen">
      <ProfileEditForm
        access_token={access_token}
        initialData={user}
        onSave={(updatedData) => {
          onUpdateProfile(updatedData);
          setIsEditing(false);
        }}
        onCancel={() => {}}
      />
    </div>
  );
};
