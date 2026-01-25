// components/Notification.tsx
import React from "react";
import Image from "next/image";

interface NotificationProps {
  type: "join" | "match-created" | "match-progress";
  message: string;
  username?: string;
  clubName?: string;
  clubLogo?: string;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  username,
  clubName,
  clubLogo,
}) => {
  const renderNotificationContent = () => {
    switch (type) {
      case "join":
        return (
          <div className="flex py-4 px-4 relative items-center pl-3 space-x-2 mt-3 bg-[#F5F5F4]">
            <div className="w-12 h-12 bg-gray-300 gap-24 rounded-full flex items-center justify-center overflow-hidden">
              {clubLogo && (
                <Image
                  src={clubLogo}
                  alt={username || "User"}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div>
              <p className="text-sm font-medium ml-3 text-black">
                <span className="font-bold">{username}</span> {message}
              </p>
              <p className="text-xs ml-3 text-gray-500">Just now</p>
            </div>
          </div>
        );
      case "match-created":
        return (
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {clubLogo && (
                <Image
                  src={clubLogo}
                  alt={clubName || "Club"}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">
                <span className="font-bold">{clubName}</span> {message}
              </p>
              <p className="text-xs text-gray-500">Just now</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-3 border-b border-gray-200 ">
      {renderNotificationContent()}
    </div>
  );
};

export default Notification;
