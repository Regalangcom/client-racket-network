"use client";

import React from "react";
import Navbar from "../components/navbar/navbar";

function MatchLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen flex flex-col bg-white">
      <header className="text-center px-6 ">
        <Navbar variant="match" />
      </header>
      {/* flex-grow  */}
      <main>{children}</main>
    </section>
  );
}

export default MatchLayout;
