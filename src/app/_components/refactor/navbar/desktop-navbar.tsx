"use client";

import React from "react";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import { desktopNavItems } from "@/constant/navItem";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import NavItem from "./nav-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

type Variant = "home" | "match" | "club" | "competitions" | "account";

function getNavbarVariant(pathname: string) {
  if (pathname.startsWith("/match")) return "match";
  if (pathname.startsWith("/club")) return "club";
  if (pathname.startsWith("/competitions")) return "competitions";
  if (pathname.startsWith("/account")) return "account";
  return "home";
}

interface DesktopNavbarProps {
  access_token?: string;
}
const DesktopNavbar = ({ access_token }: DesktopNavbarProps) => {
  // HOOKS
  const { isMobile } = useWindowDimension();
  const pathname = usePathname();
  const variant: Variant = getNavbarVariant(pathname);

  // HELPER
  const navItems = access_token
    ? desktopNavItems.filter((item) => !item.button)
    : desktopNavItems;

  // RENDER
  if (isMobile) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50">
      <section
        className={`flex justify-between items-center bg-white py-8 px-5 mx-auto max-w-screen-2xl`}
      >
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
              {navItems.map((item) => (
                <NavItem key={item.label} {...item} />
              ))}

              {access_token && (
                <Avatar>
                  <AvatarImage src={""} />
                  <AvatarFallback>{"A"}</AvatarFallback>
                </Avatar>
              )}

              {!access_token && (
                <Link href="/sign-in">
                  <Button
                    variant="outline"
                    className="py-2 px-8 bg-background-button-rc text-white rounded transition-all"
                  >
                    <LogInIcon className="w-4 h-4" />
                    Log in
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        )}
      </section>
    </header>
  );
};

export default DesktopNavbar;
