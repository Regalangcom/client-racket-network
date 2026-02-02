"use client";

import React from "react";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import { MobileAccountView } from "./mobile-account";
import { DesktopAccountView } from "./desktop-account-view";
import { settings, signout, inbox, pay, star } from "@/public";
import { User } from "@/app/(application)/account/page";
import { signOut } from "next-auth/react";

interface AccountPageProps {
  user: User;
}
export default function AccountPage({ user }: AccountPageProps) {
  const { isMobile } = useWindowDimension();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Please login to view your account</p>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/sign-in" });
  };

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
      path: "/sign-in",
      hasNotification: false,
      onClick: handleLogout,
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
