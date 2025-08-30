import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface AccountMenuItemType {
  icon: string;
  title: string;
  path: string;
  hasNotification?: boolean;
}

export const AccountMenuItem: React.FC<
  AccountMenuItemType & {
    isLastItem?: boolean;
  }
> = ({ icon, title, path, hasNotification = false, isLastItem = false }) => (
  <Link
    href={path}
    className={`block ${!isLastItem ? "border-b border-gray-200" : ""}`}
  >
    <div className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center relative">
        <span className="mr-4 text-xl">{icon}</span>
        <span className="text-base">{title}</span>
        {hasNotification && (
          <span className="absolute -top-1 -right-3 w-3 h-3 bg-red-500 rounded-full"></span>
        )}
      </div>
      <ChevronRight className="text-xl text-gray-600" />
    </div>
  </Link>
);
