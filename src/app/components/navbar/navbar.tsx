// ========================
// yang baru di gunakan
// ========================
"use client"; // Menandakan bahwa ini adalah Client Component

import React, { useState } from "react";
import Image from "next/image";
import { logoRc } from "@/public"; // Import logo
import { useWindowDimension } from "@/hooks/useWindowdimension"; // Import hook untuk dimensi layar
import { Home, Gamepad, Users } from "lucide-react"; // Ikon untuk navbar

interface NavbarProps {
  variant: "default" | "match";
}

const Navbar: React.FC<NavbarProps> = ({ variant }) => {
  const [active, setActive] = useState<string>("");
  const { isMobile } = useWindowDimension();

  const handleMouseEnter = (item: string) => {
    setActive(item);
  };

  const handleMouseLeave = () => {
    setActive("");
  };

  return (
    <>
      <section
        className={`${
          isMobile
            ? "fixed bottom-0 right-0 left-0  justify-evenly  bg-gray-100 px-3 z-10"
            : "flex justify-between relative items-center bg-white py-8 px-5"
        }`}
      >
        <header className="pl-2 flex items-center">
          {variant === "match" && (
            <div className={`${isMobile ? "hidden" : ""}`}>
              <Image
                src={logoRc}
                alt="Racket Network Logo"
                priority
                width={144}
                height={144}
                className="w-36 h-37 object-cover rounded"
              />
            </div>
          )}
        </header>

        {(variant === "default" || variant === "match") && (
          <nav
            className={`${
              isMobile
                ? "flex  justify-center px-4  relative max-w-full"
                : "pr-4 flex space-x-9"
            }`}
          >
            <div
              className={`${
                isMobile ? "flex flex-row gap-16 " : "flex py-2 space-x-9"
              }`}
            >
              <NavItem
                label="Home"
                active={active === "home"}
                onMouseEnter={() => handleMouseEnter("home")}
                onMouseLeave={handleMouseLeave}
                icon={<Home size={23} />}
              />
              <NavItem
                label="Match"
                active={active === "match"}
                onMouseEnter={() => handleMouseEnter("match")}
                onMouseLeave={handleMouseLeave}
                icon={<Users size={23} />}
              />
              <NavItem
                label="Club"
                active={active === "club"}
                onMouseEnter={() => handleMouseEnter("club")}
                onMouseLeave={handleMouseLeave}
                icon={<Home size={23} />}
              />
              <NavItem
                label="Competition"
                active={active === "competition"}
                onMouseEnter={() => handleMouseEnter("competition")}
                onMouseLeave={handleMouseLeave}
                icon={<Gamepad size={23} />}
              />
              <NavItem
                label="Account"
                active={active === "account"}
                onMouseEnter={() => handleMouseEnter("account")}
                onMouseLeave={handleMouseLeave}
                icon={<Home size={23} />}
              />
            </div>
            <div className={`${isMobile ? "hidden" : ""}`}>
              <NavItem
                label="Log in"
                active={active === "login"}
                onMouseEnter={() => handleMouseEnter("login")}
                onMouseLeave={handleMouseLeave}
                button
              />
            </div>
          </nav>
        )}
      </section>
    </>
  );
};

// Reusable NavItem Component
interface NavItemProps {
  label: string;
  active: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  button?: boolean;
  icon?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  active,
  onMouseEnter,
  onMouseLeave,
  button = false,
  icon,
}) => {
  return (
    <div
      className={`${
        active ? "text-green-rc" : "text-gray-800"
      } py-4   rounded-md cursor-pointer transition-all duration-300 ease-in-out w-full text-center`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Menambahkan wrapper div untuk memastikan ikon berada di tengah */}
      {icon && (
        <div className="flex  justify-center items-center mb-2 sm:hidden">
          {icon}
        </div>
      )}
      {button ? (
        <button className="py-2 px-8 bg-background-button-rc text-white rounded-md transition-all">
          {label}
        </button>
      ) : (
        <span className="text-xs sm:text-base mt-1">{label}</span>
      )}
    </div>
  );
};

export default Navbar;
