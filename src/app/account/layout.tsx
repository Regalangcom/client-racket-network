"use client";

import React from "react";
import Navbar from "../components/navbar/navbar";

function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen flex flex-col bg-white">
      <header className="text-center px-6 ">
        <Navbar variant="account" />
      </header>
      {/* flex-grow  */}
      <main>{children}</main>
    </section>
  );
}

export default AccountLayout;
