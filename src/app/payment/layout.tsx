"use client";

import React from "react";
import Image from "next/image";
import { logoRc } from "@/public";

function MatchLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen flex flex-col bg-white">
      <header className="text-center px-9 py-8 ">
        {/* <Navbar variant="sign-up" /> */}
        <nav className="">
          <Image
            src={logoRc}
            alt="racket network logo"
            priority
            width={144}
            height={144}
            className="w-36 h-37  object-cover rounded"
          />
        </nav>
      </header>
      {/* flex-grow  */}
      <main>{children}</main>
    </section>
  );
}

export default MatchLayout;
