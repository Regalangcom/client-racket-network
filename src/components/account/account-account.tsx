"use client";

import { useState } from "react";
import React from "react";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import { MobileAccountView } from "./mobile-account";
import { DesktopAccountView } from "./desktop-account-view";
import { settings, signout, inbox, pay, star } from "@/public";
import { User } from "@/app/(application)/account/page";

interface AccountPageProps {
  user: User;
}
export default function AccountPage({ user }: AccountPageProps) {
  const { isMobile } = useWindowDimension();
  // const [user] = useState({
  //   name: "Titin Suratin",
  //   phone: "081234567890",
  // });

  const accountMenuItems = [
    {
      icon: settings,
      title: "Settings",
      path: "/account/setting",
      hasNotification: false,
    },
    {
      icon: inbox,
      title: "Inbox",
      path: "/account/inbox",
      hasNotification: true,
    },
    {
      icon: pay,
      title: "Payment",
      path: "/account/payment",
      hasNotification: false,
    },
    {
      icon: star,
      title: "Review",
      path: "/account/review",
      hasNotification: false,
    },
    {
      icon: signout,
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
