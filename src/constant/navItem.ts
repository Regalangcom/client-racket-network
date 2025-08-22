// components/navbar/navConfig.ts
import { Home, Gamepad, Users } from "lucide-react";
import { LucideIcon } from "lucide-react";

export type NavItemType = {
  label: string;
  href?: string;
  icon?: LucideIcon;
  button?: boolean;
  showOnMobile?: boolean;
};

export const navItems: NavItemType[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Match", href: "/match", icon: Users },
  { label: "Club", href: "/club", icon: Home },
  { label: "Competitions", href: "/competitions", icon: Gamepad },
  { label: "Account", href: "/account", icon: Home, showOnMobile: true },
  { label: "Log in", button: true },
];
