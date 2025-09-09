// components/navbar/Logo.tsx
"use client";
import Image from "next/image";
import { logoRc } from "@/public";

export const Logo = () => (
  <Image
    src={logoRc}
    alt="Racket Network Logo"
    priority
    width={144}
    height={144}
    className="w-36 h-37 object-cover rounded"
  />
);
