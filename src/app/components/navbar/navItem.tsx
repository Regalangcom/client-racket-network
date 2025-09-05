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

  return (
    <div
      className={`${
        isActive ? "text-green-rc" : "text-red-800"
      } py-7 md:relative  cursor-pointer transition-all duration-300 ease-in-out flex flex-col items-center`}
      onClick={() => !button && router.push(href)}
    >
      {icon && (
        <div className="flex justify-center items-center mb-1 sm:hidden w-full">
          <Image
            src={icon}
            alt={label}
            width={23}
            height={23}
            className="object-contain"
          />
        </div>
      )}
      {button ? (
        <button className="py-2 px-8 bg-background-button-rc text-white rounded transition-all">
          {label}
        </button>
      ) : (
        <div className="text-center w-full flex flex-col  absolute md:relative items-center justify-center">
          <span className="text-xs sm:text-base mt-6  md:mt-0 tracking-tight">
            {label}
          </span>
        </div>
      )}
    </div>
  );
};

export default NavItem;

//  <div
//       className={`${
//         isActive ? "text-green-rc" : "text-red-800"
//       } relative w-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-in-out`}
//       onClick={() => !button && router.push(href)}
//     ></div>
