// components/navbar/NavItem.tsx
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
  const isActive = pathname === href;

  return (
    <div
      className={`${
        isActive ? "text-green-rc" : "text-red-800"
      } py-4 cursor-pointer transition-all duration-300 ease-in-out text-center`}
      onClick={() => !button && router.push(href)}
    >
      {Icon && (
        <div className="flex justify-center items-center mb-1 sm:hidden">
          <Icon size={23} />
        </div>
      )}
      {button ? (
        <button className="py-2 px-8 bg-background-button-rc text-white rounded-md transition-all">
          {label}
        </button>
      ) : (
        <span className="text-xs sm:text-base">{label}</span>
      )}
    </div>
  );
};

export default NavItem;
