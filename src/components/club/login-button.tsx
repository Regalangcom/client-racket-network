"use client";
// components/club/login-button.tsx
import { Button } from "@/components/ui/button";

export default function LoginButton() {
  return (
    <Button
      className="border-[#174038] border w-full text-black hover:bg-background-button-rc hover:text-white bg-background-card pr-10"
      onClick={() => (window.location.href = "/sign-in")}
    >
      Login to Create a Club
    </Button>
  );
}
