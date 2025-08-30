"use client";

import { useState } from "react";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import { SettingMobileView } from "./settingsMobile";
import { DesktopSettingsView } from "./settingsDekstop";

export default function SettingsPage() {
  const { isMobile } = useWindowDimension();
  const [user] = useState({
    name: "Titin Suratin",
    phone: "081234567890",
  });

  const settingsMenuItems = [
    {
      icon: "🔒",
      title: "Security",
      path: "/settings/security",
    },
    {
      icon: "🔔",
      title: "Notifications",
      path: "/settings/notifications",
    },
    {
      icon: "🌐",
      title: "Language",
      path: "/settings/language",
    },
  ];

  return (
    isMobile !== undefined &&
    (isMobile ? (
      <SettingMobileView menuItems={settingsMenuItems} />
    ) : (
      <DesktopSettingsView user={user} menuItems={settingsMenuItems} />
    ))
  );
}
