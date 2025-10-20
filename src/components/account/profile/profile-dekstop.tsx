"use client";

import { useState } from "react";
import { UserProfile } from "./profile-page";
import { AccountMenu } from "../accountMenu/title-menu";
import { ProfileEditForm } from "./profile-form";
interface ProfileDesktopViewProps {
  user: UserProfile;
  onUpdateProfile: (data: Partial<UserProfile>) => void;
}

export const ProfileDesktopView: React.FC<ProfileDesktopViewProps> = ({
  user,
  onUpdateProfile,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/4 bg-white p-6 border-r">
        {/* Sidebar atau informasi tambahan */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
          <h2 className="text-xl font-semibold">{user.username}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      <div className="w-3/4 bg-gray-100">
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
            {/* Konten detail profil */}
          </div>
        ) : (
          <ProfileEditForm
            access_token=""
            initialData={user}
            onSave={(updatedData) => {
              onUpdateProfile(updatedData);
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
          />
        )}
      </div>
    </div>
  );
};
