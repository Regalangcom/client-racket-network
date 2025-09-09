"use client";

import { useWindowDimension } from "@/hooks/useWindowdimension";
import { InboxDesktopView } from "./inboxDesktop";
import { InboxMobileView } from "./inboxMobile";
export default function InboxPage() {
  const { isMobile } = useWindowDimension();

  return (
    isMobile !== undefined &&
    (isMobile ? <InboxMobileView /> : <InboxDesktopView />)
  );
}
