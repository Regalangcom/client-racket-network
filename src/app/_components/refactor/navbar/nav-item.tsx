"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

interface NavItemProps {
  label: string;
  href?: string;
  icon?: StaticImageData;
  activeIcon?: StaticImageData;
  button?: boolean;
  active?: boolean;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  href = "#",
  icon,
  activeIcon,
  button,
  className,
  iconClassName,
  textClassName,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  // Perbaiki logika active state
  const isActive = href !== "#" ? pathname === href || (href !== "/" && pathname.startsWith(href)) : false;

  const handleNavigation = () => {
    if (!button && href && href !== "#") {
      router.push(href);
    }
  };

  const displayIcons = isActive && activeIcon ? activeIcon : icon;

  return (
    <div
      className={cn(
        `,
        md:relative 
        flex 
        flex-col 
        items-center 
        justify-center 
        cursor-pointer 
        transition-all 
        duration-300 
        ease-in-out 
        ${isActive ? "" : "bg-transparent"}
        py-5
      `,
        className
      )}
      onClick={handleNavigation}

      // onClick={() => !button && router.push(href)}
    >
      {displayIcons && (
        <div
          className={cn(
            `
              flex 
              justify-center 
              items-center 
              mb-1 
              sm:hidden
              w-full
              ${isActive ? "opacity-100" : "opacity-30"}
          `,
            iconClassName
          )}
        >
          <Image src={displayIcons} alt={label} width={23} height={23} className="object-contain" />
        </div>
      )}
      {!button && (
        <div className={cn("text-center", textClassName)}>
          <span
            className={`
              text-xs 
              md:mt-0
              sm:text-base 
              text-center 
              ${isActive ? "text-green-rc" : "text-gray-500"}
            `}
          >
            {label}
          </span>
        </div>
      )}

      {button && <button className="py-2 px-8 bg-background-button-rc text-white rounded transition-all">{label}</button>}
    </div>
    // </div>
  );
};

export default NavItem;
