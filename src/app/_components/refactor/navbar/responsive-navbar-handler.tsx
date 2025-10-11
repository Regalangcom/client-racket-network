"use client";

import { useWindowDimension } from "@/hooks/useWindowdimension";
import DesktopNavbar from "./desktop-navbar";
import MobileNavbar from "./mobile-navbar";

interface ResponsiveNavbarHandlerProps {
  accessToken?: string;
}
const ResponsiveNavbarHandler = ({ accessToken }: ResponsiveNavbarHandlerProps) => {
  const { isMobile } = useWindowDimension();

  if (isMobile) {
    return <MobileNavbar accessToken={accessToken} />;
  } else {
    return <DesktopNavbar accessToken={accessToken} />;
  }
};

export default ResponsiveNavbarHandler;
