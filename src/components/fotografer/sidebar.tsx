"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoRc, home, homeActive, settings } from "@/public";

const navItems = [
  {
    label: "Home",
    href: "/dashboard",
    icon: home,
    activeIcon: homeActive,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: settings,
    activeIcon: settings,
  },
];

export default function FotograferSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[88px] min-h-screen bg-white border-r border-gray-100 flex flex-col items-center py-4 gap-6">
      {/* Logo */}
      <div className="w-10 h-10  rounded-lg flex items-center justify-center mb-2">
        <Image src={logoRc} alt="RN Logo" width={48} height={48} />
      </div>

      {/* Nav items */}
      <nav className="flex flex-col items-center gap-2 w-full">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 w-full py-3 px-1 rounded-lg transition-colors ${
                isActive
                  ? "bg-green-rc/10 text-green-rc"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Image
                src={item.activeIcon}
                alt={item.label}
                width={20}
                height={20}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
