"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

interface FotograferTopNavbarProps {
  userName?: string;
  userImage?: string;
}

function Breadcrumb() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard/event/")) {
    return (
      <div className="flex items-center gap-1.5 text-sm">
        <Link
          href="/dashboard"
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          Event List
        </Link>
        <ChevronRight size={14} className="text-gray-400" />
        <span className="font-medium text-gray-700">Event Detail</span>
      </div>
    );
  }

  return <span className="text-sm font-medium text-gray-700">Home</span>;
}

export default function FotograferTopNavbar({
  userName = "Jon Doe",
  userImage,
}: FotograferTopNavbarProps) {
  return (
    <header className="h-14 border-b border-gray-100 flex items-center justify-between px-6 bg-white">
      <Breadcrumb />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 outline-none">
            <Avatar className="h-8 w-8">
              {userImage && <AvatarImage src={userImage} alt={userName} />}
              <AvatarFallback className="bg-gray-200 text-xs font-semibold">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-gray-700">{userName}</span>
            <ChevronDown size={14} className="text-gray-500" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>
            Keluar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
