// components/navbar/Logo.tsx
"use client";
import Image from "next/image";
import { logoRc } from "@/public";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => (
  <Image
    src={logoRc}
    alt="Racket Network Logo"
    priority
    width={144}
    height={144}
    className={cn("w-36 h-37 object-cover rounded", className)}
  />
);
