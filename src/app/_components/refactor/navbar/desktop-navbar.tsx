// components/navbar/Navbar.tsx
"use client";

import React from "react";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import { navItems } from "@/constant/navItem";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import NavItem from "./nav-item";

type Variant = "home" | "match" | "club" | "competitions" | "account";

function getNavbarVariant(pathname: string) {
  if (pathname.startsWith("/match")) return "match";
  if (pathname.startsWith("/club")) return "club";
  if (pathname.startsWith("/competitions")) return "competitions";
  if (pathname.startsWith("/account")) return "account";
  return "home";
}

const DesktopNavbar: React.FC = () => {
  const { isMobile } = useWindowDimension();
  const pathname = usePathname();
  const variant: Variant = getNavbarVariant(pathname);

  if (isMobile) {
    return null;
  }

  return (
    <section className={`flex justify-between items-center bg-white py-8 px-5 mx-auto max-w-screen-2xl`}>
      {/* Logo */}
      <header className="pl-2 flex items-center">{<Logo />}</header>

      {/* Nav Items */}
      {(variant === "home" ||
        variant === "match" ||
        variant === "club" ||
        variant === "competitions" ||
        variant === "account") && (
        <nav className={`pr-4 flex items-center space-x-9`}>
          <div className={`flex items-center space-x-9`}>
            {navItems
              .filter((item) => {
                return !item.showOnMobile; // desktop: hide mobile-only items
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

export default DesktopNavbar;
