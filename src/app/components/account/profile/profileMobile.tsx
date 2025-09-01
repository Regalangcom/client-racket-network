"use client";

import { useState } from "react";
import { UserProfile } from "./profilePage";
import { AccountMenu } from "../accountMenu/accountMenu";
import { ProfileEditForm } from "./profileForm";

interface ProfileMobileViewProps {
  user: UserProfile;
  onUpdateProfile: (data: Partial<UserProfile>) => void;
}

export const ProfileMobileView: React.FC<ProfileMobileViewProps> = ({
  user,
  onUpdateProfile,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="w-full min-h-screen">
      {!isEditing ? (
        <div>
          <AccountMenu
            title="Profile"
            rightAction={
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500"
              >
                Edit
              </button>
            }
          />
          {/* Profile detail view bisa ditambahkan di sini */}
        </div>
      ) : (
        <ProfileEditForm
          initialData={user}
          onSave={(updatedData) => {
            onUpdateProfile(updatedData);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};
