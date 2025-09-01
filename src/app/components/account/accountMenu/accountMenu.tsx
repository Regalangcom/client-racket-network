import React from "react";
import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightAction?: React.ReactNode;
  className?: string;
  onBackClick?: () => void;
}

export const AccountMenu: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  rightAction,
  className = "",
  onBackClick,
}) => {
  const router = useRouter();

  const handleBackMoveLeft = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <div
      className={`sticky top-0 z-10 bg-white shadow-sm px-4 py-4 flex items-center ${className}`}
    >
      {showBackButton && (
        <MoveLeft
          className="h-6 w-6 cursor-pointer text-gray-700 mr-4"
          onClick={handleBackMoveLeft}
        />
      )}
      <span className="text-2xl font-bold flex-grow">{title}</span>
      {rightAction}
    </div>
  );
};
