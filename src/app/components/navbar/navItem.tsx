"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface NavItemProps {
  label: string;
  href?: string;
  icon?: StaticImageData;
  button?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  href = "#",
  icon,
  button,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === href || pathname.startsWith(href);

  const handleNavigation = () => {
    // Pastikan hanya navigasi untuk non-button item
    if (!button) {
      router.push(href);
    }
  };
  console.log("Current Pathname:", pathname);
  console.log("Navigating to:", href);

  return (
    <div
      className={`
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
      `}
      onClick={handleNavigation}

      // onClick={() => !button && router.push(href)}
    >
      {icon && (
        <div
          className={`
            flex 
            justify-center 
            items-center 
            mb-1 
            sm:hidden
            w-full
            ${isActive ? "opacity-100" : "opacity-30"}
          `}
        >
          {/* <div className="flex justify-center items-center mb-1 sm:hidden w-full"> */}
          <Image
            src={icon}
            alt={label}
            width={23}
            height={23}
            className="object-contain"
          />
        </div>
      )}
      {/* {button ? (
        <button className="py-2 px-8 bg-background-button-rc text-white rounded transition-all">
          {label}
        </button>
      ) : (
        <div className="text-center w-full flex flex-col  absolute md:relative items-center justify-center">
          <span
            className={`
              text-xs 
              mt-10
              md:mt-0
              sm:text-base 
              text-center 
              ${isActive ? "text-green-rc" : "text-gray-500"}
            `}
          >
            {label}
          </span>
        </div>
      )} */}
      {!button && (
        <div className="text-center">
          <span
            className={`
              text-xs 
              mt-10
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

      {button && (
        <button className="py-2 px-8 bg-background-button-rc text-white rounded transition-all">
          {label}
        </button>
      )}
    </div>
    // </div>
  );
};

export default NavItem;
