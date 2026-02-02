"use client";

import { useWindowDimension } from "@/hooks/useWindowdimension";
import { InboxDesktopView } from "./inbox-desktop";
import { InboxMobileView } from "./inbox-mobile";
import { Notification } from "@/constant/types/notification";

interface InboxPageProps {
  notifications: Notification[];
}

export default function InboxPage({ notifications }: InboxPageProps) {
  const { isMobile } = useWindowDimension();

  return (
    isMobile !== undefined &&
    (isMobile ? (
      <InboxMobileView notifications={notifications} />
    ) : (
      <InboxDesktopView notifications={notifications} />
    ))
  );
}
