import React from "react";
import { ChevronRight } from "lucide-react";

interface UserProfileCardProps {
  name: string;
  phone: string;
  onPress?: () => void;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({
  name,
  phone,
  onPress,
}) => (
  <div
    className="bg-white rounded-lg mb-4 flex items-center p-4 cursor-pointer"
    onClick={onPress}
  >
    <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex-shrink-0"></div>
    <div className="flex-grow overflow-hidden">
      <h2 className="text-lg font-semibold truncate">{name}</h2>
      <p className="text-gray-500 truncate">{phone}</p>
    </div>
    <ChevronRight className="text-2xl text-gray-600 ml-2" />
  </div>
);
