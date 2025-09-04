"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  label: string;
  href?: string;
  icon?: LucideIcon;
  button?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  href = "#",
  icon: Icon,
  button,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === href || pathname.startsWith(href);

  // In your NavItem.tsx component, modify the return statement:

  // In NavItem.tsx - modify to properly center both icon and text:
  return (
    <div
      className={`${
        isActive ? "text-green-rc" : "text-red-800"
      } py-4 cursor-pointer transition-all duration-300 ease-in-out flex flex-col items-center`} // Changed to flex column with centered items
      onClick={() => !button && router.push(href)}
    >
      {Icon && (
        <div className="flex justify-center items-center mb-1 sm:hidden w-full">
          <Icon size={23} />
        </div>
      )}
      {button ? (
        <button className="py-2 px-8 bg-background-button-rc text-white rounded-md transition-all">
          {label}
        </button>
      ) : (
        <div className="text-center">
          <span className="text-xs sm:text-base">{label}</span>
        </div>
      )}
    </div>
  );
};

export default NavItem;
