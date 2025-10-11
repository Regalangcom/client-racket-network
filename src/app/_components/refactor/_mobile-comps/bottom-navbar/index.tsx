"use client";

import React, { memo } from "react";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import { navItems } from "@/constant/navItem";
import { usePathname } from "next/navigation";
import NavItem from "./nav-item";

type Variant = "home" | "match" | "club" | "competitions" | "account";

function getNavbarVariant(pathname: string) {
  if (pathname.startsWith("/match")) return "match";
  if (pathname.startsWith("/club")) return "club";
  if (pathname.startsWith("/competitions")) return "competitions";
  if (pathname.startsWith("/account")) return "account";
  return "home";
}

const BottomNavbar = () => {
  const { isMobile } = useWindowDimension();
  const pathname = usePathname();
  const variant: Variant = getNavbarVariant(pathname);

  if (!isMobile) {
    return null;
  }

  return (
    <section className={`fixed bottom-0 right-0 left-0 justify-between bg-gray-100 z-10 w-full`}>
      {/* Nav Items */}
      {(variant === "home" ||
        variant === "match" ||
        variant === "club" ||
        variant === "competitions" ||
        variant === "account") && (
        <nav className={`flex justify-center items-center`}>
          <div className={`grid grid-cols-5 gap-[20px]`}>
            {navItems
              .filter((item) => {
                return !item.button; // mobile: hide button
              })
              .map((item) => (
                <NavItem key={item.label} {...item} />
              ))}
          </div>
        </nav>
      )}
    </section>
  );
};

export default memo(BottomNavbar);
