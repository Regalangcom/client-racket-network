// components/navbar/Navbar.tsx
"use client";

import React from "react";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import { navItems } from "@/constant/navItem";
import NavItem from "./nav-Item";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";

// interface NavbarProps {
//   variant: "home" | "match" | "club" | "competitions" | "account";
// }

type Variant = "home" | "match" | "club" | "competitions" | "account";

function getNavbarVariant(pathname: string) {
  if (pathname.startsWith("/match")) return "match";
  if (pathname.startsWith("/club")) return "club";
  if (pathname.startsWith("/competitions")) return "competitions";
  if (pathname.startsWith("/account")) return "account";
  return "home";
}

const Navbar: React.FC = () => {
  const { isMobile } = useWindowDimension();
  const pathname = usePathname();
  const variant: Variant = getNavbarVariant(pathname);

  return (
    <section
      className={`${
        isMobile
          ? "fixed bottom-0 right-0 left-0 justify-between bg-gray-100 z-10 w-full"
          : "flex justify-between items-center bg-white py-8 px-5 mx-auto max-w-screen-2xl"
      }`}
    >
      {/* Logo */}
      <header className="pl-2 flex items-center">
        {variant !== "home" && !isMobile && <Logo />}
      </header>

      {/* Nav Items */}
      {(variant === "home" ||
        variant === "match" ||
        variant === "club" ||
        variant === "competitions" ||
        variant === "account") && (
        <nav
          className={`${
            isMobile
              ? "flex justify-center items-center"
              : "pr-4 flex items-center space-x-9"
          }`}
        >
          <div
            className={`${
              isMobile
                ? "grid grid-cols-5 gap-[20px]"
                : "flex items-center space-x-9"
            }`}
          >
            {navItems
              .filter((item) => {
                if (isMobile) {
                  return !item.button; // mobile: hide button
                } else {
                  return !item.showOnMobile; // desktop: hide mobile-only items
                }
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

export default Navbar;
