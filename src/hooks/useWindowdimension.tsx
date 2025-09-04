import { useState, useEffect } from "react";

const TABLET_BREAKPOINT = 768;
const LAPTOP_BREAKPOINT = 1028;

export type DeviceType = "mobile" | "tablet" | "laptop";

export function useWindowDimension() {
  const [deviceType, setDeviceType] = useState<DeviceType | undefined>(
    undefined
  );
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });

        const width = window.innerWidth;
        if (width < TABLET_BREAKPOINT) {
          setDeviceType("mobile");
        } else if (width < LAPTOP_BREAKPOINT) {
          setDeviceType("tablet");
        } else {
          setDeviceType("laptop");
        }
      };

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return {
    isMobile: deviceType === "mobile",
    isTablet: deviceType === "tablet",
    isLaptop: deviceType === "laptop",
    deviceType,
    width: dimensions.width,
    height: dimensions.height,
  };
}
