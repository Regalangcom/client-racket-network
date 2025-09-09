"use client";

import { useState } from "react";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import { SettingMobileView } from "./settingsMobile";
import { DesktopSettingsView } from "./settingsDekstop";
import { security, notification, language } from "@/public";

export default function SettingsPage() {
  const { isMobile } = useWindowDimension();
  const [user] = useState({
    name: "Titin Suratin",
    phone: "081234567890",
  });

  const settingsMenuItems = [
    {
      icon: security,
      title: "Security",
      path: "/settings/security",
    },
    {
      icon: notification,
      title: "Notifications",
      path: "/settings/notifications",
    },
    {
      icon: language,
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
