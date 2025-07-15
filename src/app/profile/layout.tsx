"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LockIcon, LogOutIcon, UserIcon } from "lucide-react";
import profileImage from "@/app/images/profile.jpeg";
import { useSession } from "next-auth/react";
function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  console.log("session from layout page", session);

  return (
    <section>
      {session?.user && (
        <header className="py-3 w-full bg-zinc-50 rounded mb-3 flex justify-end px-4 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={profileImage.src}
                    alt="image"
                    className=""
                  />
                  <AvatarFallback>muhammad galang</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>my account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LockIcon className="mr-2 h-4 w-4" />
                Change Password
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <LogOutIcon className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
      )}
      {children}
    </section>
  );
}

export default ProfileLayout;
