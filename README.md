```
   <div className="text-center w-full flex flex-col absolute md:relative items-center justify-center">
          <span className="text-xs sm:text-base mt-7  md:mt-0 tracking-tight">
            {label}
          </span>
        </div>
```

```
// components/navbar/Navbar.tsx "use client"; import React from "react"; import { useWindowDimension } from "@/hooks/useWindowdimension"; import { navItems } from "@/constant/navItem"; import NavItem from "./navItem"; import { Logo } from "./logo"; interface NavbarProps { variant: "home" | "match" | "club" | "competitions" | "account"; } const Navbar: React.FC<NavbarProps> = ({ variant }) => { const { isMobile } = useWindowDimension(); return ( <section className={${ isMobile ? // px-3 "fixed bottom-0 right-0 left-0 justify-between bg-gray-100 z-10 w-full" : "flex justify-between items-center bg-white py-8 px-5 mx-auto max-w-screen-2xl" }} > {/* Logo */} <header className="pl-2 flex items-center"> {(variant === "match" || variant === "club" || variant === "competitions" || variant === "account") && !isMobile && <Logo />} </header> {/* Nav Items */} {(variant === "home" || variant === "match" || variant === "club" || variant === "competitions" || variant === "account") && ( <nav className={${ isMobile ? "flex justify-center items-center" : "pr-4 flex items-center space-x-9" }} > <div className={${ isMobile ? "grid grid-cols-5 gap-[20px]" : "flex items-center space-x-9" }} > {navItems .filter((item) => { if (isMobile) { return !item.button; // mobile: tampilkan item mobile + non-button bro } else { return !item.showOnMobile; // desktop: sembunyikan item yg khusus mobile } }) .map((item) => ( <NavItem key={item.label} {...item} /> ))} </div> </nav> )} </section> ); }; export default Navbar;

```
