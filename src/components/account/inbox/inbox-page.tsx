"use client";

import { useWindowDimension } from "@/hooks/useWindowdimension";
import { InboxDesktopView } from "./inbox-desktop";
import { InboxMobileView } from "./inbox-mobile";
export default function InboxPage() {
  const { isMobile } = useWindowDimension();

  return (
    isMobile !== undefined &&
    (isMobile ? <InboxMobileView /> : <InboxDesktopView />)
  );
}
