import React from "react";

interface AccountHeaderProps {
  title: string;
  rightAction?: React.ReactNode;
}

export const AccountHeader: React.FC<AccountHeaderProps> = ({
  title,
  rightAction,
}) => (
  <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-4 flex items-center">
    <span className="text-2xl font-bold flex-grow">{title}</span>
    {rightAction}
  </div>
);
