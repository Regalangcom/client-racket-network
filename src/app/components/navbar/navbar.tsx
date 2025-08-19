// components/navbar/Navbar.tsx
"use client";

import React from "react";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import { navItems } from "@/constant/navItem";
import NavItem from "./navItem";
import { Logo } from "./logo";

interface NavbarProps {
  variant: "default" | "match" | "club" | "competition";
}

const Navbar: React.FC<NavbarProps> = ({ variant }) => {
  const { isMobile } = useWindowDimension();

  return (
    <section
      className={`${
        isMobile
          ? "fixed bottom-0 right-0 left-0 justify-evenly bg-gray-100 px-3 z-10"
          : "flex justify-between items-center bg-white py-8 px-5"
      }`}
    >
      {/* Logo */}
      <header className="pl-2 flex items-center">
        {variant === "match" && !isMobile && <Logo />}
      </header>

      {/* Nav Items */}
      {(variant === "default" || variant === "match") && (
        <nav
          className={`${
            isMobile
              ? "flex justify-center px-4"
              : "pr-4 flex items-center space-x-9"
          }`}
        >
          <div
            className={`${
              isMobile ? "flex flex-row gap-14" : "flex items-center space-x-9"
            }`}
          >
            {navItems
              .filter((item) => {
                if (isMobile) {
                  return item.showOnMobile || !item.button; // mobile: tampilkan item mobile + non-button bro
                } else {
                  return !item.showOnMobile; // desktop: sembunyikan item yg khusus mobile
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
