import React from "react";
import Image from "next/image";
import { logoRc, fotografer } from "@/public";
import FotograferLoginForm from "@/components/fotografer/login-form";

export default function FotograferLoginPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center">
      {/* Background image */}
      <Image
        src={fotografer}
        alt="Padel court background"
        fill
        className="object-cover"
        priority
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Logo top-left */}
      <div className="absolute top-4 left-4 z-10">
        <Image src={logoRc} alt="Racket Network" width={40} height={40} />
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-[360px] mx-4 bg-white/20 backdrop-blur-sm rounded-lg p-6 flex flex-col gap-4">
        <FotograferLoginForm />
      </div>
    </main>
  );
}
