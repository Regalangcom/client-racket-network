"use client";

import React, { useState } from "react";
import { Logo } from "./logo";
import { navItems, notLoggedInMobileNavItems } from "@/constant/navItem";
import NavItem from "./nav-item";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

interface MobileNavbarProps {
  accessToken?: string;
}
const MobileNavbar = ({ accessToken }: MobileNavbarProps) => {
  // HOOKS
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // HANDLERS
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // RENDER
  // Dont show mobile navbar if user is logged in
  if (accessToken) {
    return null;
  }

  return (
    <>
      {/* Mobile Navbar Header */}
      <section className="flex justify-between items-center bg-white py-4 px-4 md:hidden sticky top-0 z-50">
        {/* Logo */}
        <header className="flex items-center">
          <Logo className="w-[70px] h-[40px] object-contain rounded" />
        </header>

        {/* Hamburger Menu Button */}
        <Button variant="ghost" size="icon" onClick={toggleMenu} className="p-2" aria-label="Toggle menu">
          <Menu className="w-[60px] h-[60px] flex-shrink-0" />
        </Button>
      </section>

      {/* Expanded Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeMenu} />

          {/* Menu Panel */}
          <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            {/* Menu Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
              <Button variant="ghost" size="icon" onClick={closeMenu} className="p-2" aria-label="Close menu">
                {/* <HamburgerIcon isOpen={true} /> */}
                <X className="w-[60px] h-[60px] flex-shrink-0" />
              </Button>
            </div>

            {/* Navigation Items */}
            <nav className="p-4">
              <div className="space-y-2">
                {notLoggedInMobileNavItems.map((item) => (
                  <div key={item.label} onClick={closeMenu} className="block">
                    <NavItem
                      {...item}
                      className="flex-row  py-2 justify-start gap-3 items-center "
                      iconClassName="w-[20px] h-[20px] flex-shrink-0 justify-start items-start "
                      textClassName="text-[16px]  text-center h-max"
                    />
                  </div>
                ))}
              </div>

              {/* Login Button */}
              <div className="mt-6 pt-4 border-t">
                <Link href="/sign-in">
                  <Button className="w-full">{navItems.find((item) => item.button)?.label || "Log in"}</Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavbar;
