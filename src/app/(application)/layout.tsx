// "use client";

import React from "react";
// import Navbar from "../../components/navbar/navbar";
import DesktopNavbar from "../_components/refactor/navbar/desktop-navbar";
import BottomNavbar from "../_components/refactor/_mobile-comps/bottom-navbar";

function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen flex flex-col bg-white">
      <header className="text-center px-6 ">
        <DesktopNavbar />
      </header>

      {/* flex-grow  */}
      <main>{children}</main>
      <BottomNavbar />
    </section>
  );
}

export default AccountLayout;
