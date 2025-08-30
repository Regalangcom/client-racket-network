import React from "react";
import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";

interface SettingsHeaderProps {
  title: string;
  rightAction?: React.ReactNode;
  showBackButton: boolean;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  title,
  showBackButton = false,
  //   rightAction,
}) => {
  const router = useRouter();

  const handleBackMoveLeft = () => {
    router.back();
  };

  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-4 flex items-center">
      {showBackButton && (
        <MoveLeft
          className="h-6 w-6 cursor-pointer text-gray-700 mr-4"
          onClick={handleBackMoveLeft}
        />
      )}
      <span className="text-2xl font-bold flex-grow">{title}</span>
      {/* {rightAction} */}
    </div>
  );
};
