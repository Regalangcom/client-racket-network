// components/navbar/navConfig.ts
import { home, competition, match, account, club } from "@/public";
import { StaticImageData } from "next/image";
// import { home } from "@/public";

export type NavItemType = {
  label: string;
  href?: string;
  icon?: StaticImageData;
  button?: boolean;
  showOnMobile?: boolean;
};

export const navItems: NavItemType[] = [
  { label: "Home", href: "/", icon: home },
  { label: "Match", href: "/match", icon: match },
  { label: "Club", href: "/club", icon: club },
  { label: "Competitions", href: "/competitions", icon: competition },
  { label: "Account", href: "/account", icon: account, showOnMobile: true },
  { label: "Log in", button: true },
];
