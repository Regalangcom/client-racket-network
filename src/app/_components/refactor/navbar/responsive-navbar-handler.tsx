"use client";

import { useWindowDimension } from "@/hooks/useWindowdimension";
import DesktopNavbar from "./desktop-navbar";
import MobileNavbar from "./mobile-navbar";

interface ResponsiveNavbarHandlerProps {
  access_token?: string;
}
const ResponsiveNavbarHandler = ({
  access_token,
}: ResponsiveNavbarHandlerProps) => {
  const { isMobile } = useWindowDimension();

  if (isMobile) {
    return <MobileNavbar access_token={access_token} />;
  } else {
    return <DesktopNavbar access_token={access_token} />;
  }
};

export default ResponsiveNavbarHandler;
