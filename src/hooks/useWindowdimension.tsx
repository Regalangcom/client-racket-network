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

// import * as React from "react";

// const TABLET_BREAKPOINT = 768;
// const LAPTOP_BREAKPOINT = 1024;

// export type DeviceType = "mobile" | "tablet" | "laptop";

// export function useWindowDimension() {
//   const [deviceType, setDeviceType] = React.useState<DeviceType | undefined>(
//     undefined
//   );
//   const [dimensions, setDimensions] = React.useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   React.useEffect(() => {
//     const getDeviceType = (): DeviceType => {
//       const width = window.innerWidth;
//       if (width < TABLET_BREAKPOINT) {
//         return "mobile";
//       } else if (width < LAPTOP_BREAKPOINT) {
//         return "tablet";
//       } else {
//         return "laptop";
//       }
//     };

//     const handleResize = () => {
//       setDeviceType(getDeviceType());
//       setDimensions({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     // Set initial device type and dimensions
//     setDeviceType(getDeviceType());
//     setDimensions({
//       width: window.innerWidth,
//       height: window.innerHeight,
//     });

//     // Add resize listener
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return {
//     isMobile: deviceType === "mobile",
//     isTablet: deviceType === "tablet",
//     isLaptop: deviceType === "laptop",
//     deviceType,
//     width: dimensions.width,
//     height: dimensions.height,
//   };
// }
