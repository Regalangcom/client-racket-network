"use client";
import Image from "next/image";
import { logoRc } from "@/public";
import React from "react";

function SignInLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen flex flex-col bg-white">
      <header className="text-center px-6 py-8">
        <nav>
          <Image
            src={logoRc}
            alt="racket network logo"
            priority
            width={144}
            height={144}
            className="w-36 h-37 object-cover rounded"
          />
        </nav>
      </header>
      {/* flex-grow  */}
      <main className="flex-grow container-lg w-full mx-auto py-2 p-4">
        {children}
      </main>
    </section>
  );
}

export default SignInLayout;
