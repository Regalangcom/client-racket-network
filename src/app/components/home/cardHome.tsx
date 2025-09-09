"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { sampeImage } from "@/public";
import Link from "next/link";
import InProgressBadge from "@/app/components/home/inBadgeProsess";

// types/Match.ts
interface Match {
  id: string;
  clubName: string;
  title: string;
  date: string;
  location: string;
  status: "ongoing" | "created" | "completed";
  imageUrl: string;
}

const HomeCard: React.FC<{
  isInProgress?: boolean;
  title?: string;
  date?: string;
  location?: string;
}> = ({
  isInProgress = true,
  title = "Tennis Thursday Night",
  date = "30 April, 19:15",
  location = "Smes Sport Bintaro",
}) => {
  return (
    <Card className="sm:w-[290px] w-full md:w-[290px] h-[466px] overflow-hidden shadow-sm border border-gray-200 flex flex-col p-0">
      {/* Header */}
      <div className="bg-gray-200 flex items-center px-6 py-3">
        <div className="w-14 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
          {/* Gambar */}
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="font-medium text-xs text-gray-800 px-4">
            <span className="text-black text-sm font-bold">Supreme TC</span>{" "}
            <span className="text-sm ml-1">Ongoing match</span>
          </span>
          {isInProgress && <InProgressBadge />}
        </div>
      </div>

      {/* Event image */}
      <div className="w-full h-[180px] relative">
        <Image src={sampeImage} alt={title} fill className="object-cover" />
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
        <Link href="/match/1">
          <Button className="mt-4 w-full bg-background-button-rc text-white rounded-lg">
            View
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default HomeCard;
