import React from "react";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserProfileCardProps {
  username: string;
  picture: string;
  phone: string;
  onPress?: () => void;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({
  username,
  picture,
  phone,
  onPress,
}) => {
  console.log("UserProfileCard received picture:", picture);

  return (
    <div
      className="bg-white rounded-lg mb-4 flex items-center p-4 cursor-pointer"
      onClick={onPress}
    >
      {/* <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex-shrink-0"></div> */}
      <Avatar className="mr-4">
        {/* <AvatarImage src={picture} alt={username} /> */}
        <AvatarImage
          src={
            picture && picture.startsWith("http")
              ? picture
              : picture
              ? `/${picture}`
              : "/default-avatar.png"
          }
          alt={username}
        />
        <AvatarFallback>{username.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-grow overflow-hidden">
        <h2 className="text-lg font-semibold truncate">{username}</h2>
        <p className="text-gray-500 truncate">{phone}</p>
      </div>
      <ChevronRight className="text-2xl text-gray-600 ml-2" />
    </div>
  );
};
