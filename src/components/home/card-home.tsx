// components/home/cardHome.tsx
"use client"
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import InProgressBadge from "./in-badge-Prosess";
import { Match } from "@/constant/types/match";
// import { AccountMenu } from "../account/accountMenu/title-menu";

interface HomeCardProps extends Match {}

const HomeCard: React.FC<HomeCardProps> = ({
  id,
  clubName,
  title,
  date,
  location,
  status,
  imageUrl,
  clubLogo,
}) => {
  return (
    <Card className="sm:w-[290px] w-full md:w-[350px] h-[466px] overflow-hidden shadow-sm border border-gray-200 flex flex-col p-0">
      {/* <AccountMenu title="match detail" showBackButton /> */}
      {/* Header */}
      <div className="bg-gray-200 flex items-center px-6  py-3">
        <div className="w-14 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
          {clubLogo && (
            <Image
              src={clubLogo}
              alt={clubName}
              width={56}
              height={48}
              className="object-cover w-full h-full"
            />
          )}
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="font-medium text-xs text-gray-800 px-4">
            <span className="text-black md:text-sm text-xs font-bold">
              {clubName}
            </span>{" "}
            <span className="md:text-sm text-xs ml-1">
              {status === "ongoing" ? "Ongoing match" : "Created match"}
            </span>
          </span>
          {status === "ongoing" && <InProgressBadge />}
        </div>
      </div>

      {/* Event image */}
      <div className="w-full h-[180px] relative">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>

      {/* Content */}
      <CardContent className="flex flex-col justify-between flex-1 p-4">
        <div className="space-y-3">
          <p className="font-bold text-base text-black">{title}</p>
          <div className="flex items-center text-sm text-gray-600 gap-2">
            <Calendar size={16} />
            <span className="font-semibold">{date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 gap-2">
            <MapPin size={16} />
            <span className="font-semibold">{location}</span>
          </div>
        </div>
        <Link href={`/match/${id}`}>
          <Button className="mt-4 w-full bg-background-button-rc text-[#E1FFA0] rounded-lg">
            View
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default HomeCard;
