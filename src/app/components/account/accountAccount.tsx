"use client";

import { useState } from "react";
import React from "react";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import { MobileAccountView } from "./mobileAccount";
import { DesktopAccountView } from "./desktopAccountView";

export default function AccountPage() {
  const { isMobile } = useWindowDimension();
  const [user] = useState({
    name: "Titin Suratin",
    phone: "081234567890",
  });

  const accountMenuItems = [
    {
      icon: "⚙️",
      title: "Settings",
      path: "/account/setting",
      hasNotification: false,
    },
    {
      icon: "📨",
      title: "Inbox",
      path: "/account/inbox",
      hasNotification: true,
    },
    {
      icon: "💰",
      title: "Payment",
      path: "/account/payment",
      hasNotification: false,
    },
    {
      icon: "⭐",
      title: "Review",
      path: "/account/review",
      hasNotification: false,
    },
    {
      icon: "🚪",
      title: "Log out",
      path: "/logout",
      hasNotification: false,
    },
  ];

  return (
    isMobile !== undefined &&
    (isMobile ? (
      <MobileAccountView user={user} menuItems={accountMenuItems} />
    ) : (
      <DesktopAccountView user={user} menuItems={accountMenuItems} />
    ))
  );
}
