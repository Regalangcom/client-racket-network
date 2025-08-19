"use client";

import React from "react";
import Navbar from "../components/navbar/navbar";

function CompetitionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen flex flex-col bg-white">
      <header className="text-center px-6 ">
        <Navbar variant="competitions" />
        {/* <nav>
          <Image
            src={logoRc}
            alt="racket network logo"
            priority
            width={144}
            height={144}
            className="w-36 h-37 object-cover rounded"
          />
        </nav> */}
      </header>
      {/* flex-grow  */}
      <main>{children}</main>
    </section>
  );
}

export default CompetitionsLayout;
