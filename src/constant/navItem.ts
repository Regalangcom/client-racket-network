// components/navbar/navConfig.ts
import {
  home,
  competition,
  match,
  account,
  club,
  matchActive,
  compeActive,
  clubActive,
  accountActive,
  homeActive,
} from "@/public";
import { StaticImageData } from "next/image";

export type NavItemType = {
  label: string;
  href?: string;
  icon?: StaticImageData;
  activeIcon?: StaticImageData;
  button?: boolean;
  showOnMobile?: boolean;
};

export const navItems: NavItemType[] = [
  { label: "Home", href: "/", icon: home, activeIcon: homeActive },
  { label: "Match", href: "/match", icon: match, activeIcon: matchActive },
  { label: "Club", href: "/club", icon: club, activeIcon: clubActive },
  {
    label: "Competitions",
    href: "/competitions",
    icon: competition,
    activeIcon: compeActive,
  },
  {
    label: "Account",
    href: "/account",
    icon: account,
    showOnMobile: true,
    activeIcon: accountActive,
  },
  { label: "Log in", button: true },
];

export const desktopNavItems: NavItemType[] = [
  { label: "Home", href: "/", icon: home, activeIcon: homeActive },
  { label: "Match", href: "/match", icon: match, activeIcon: matchActive },
  { label: "Club", href: "/club", icon: club, activeIcon: clubActive },
  {
    label: "Competitions",
    href: "/competitions",
    icon: competition,
    activeIcon: compeActive,
  },
];

export const notLoggedInMobileNavItems: NavItemType[] = [
  { label: "Home", href: "/", icon: home, activeIcon: homeActive },
  { label: "Match", href: "/match", icon: match, activeIcon: matchActive },
  { label: "Club", href: "/club", icon: club, activeIcon: clubActive },
  { label: "Competitions", href: "/competitions", icon: competition, activeIcon: compeActive },
];
