// components/ClubCard.tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { accounts, members, city, maps } from "@/public";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

type IconCardClub = {
  icon: StaticImageData;
  label: string;
};

const ClubCard: React.FC = () => {
  const { isMobile } = useWindowDimension();

  const MappingDataIcon: IconCardClub[] = [
    { icon: members, label: "28 Members" },
    { icon: accounts, label: "All Gender" },
    { icon: city, label: "Jakarta" },
    { icon: maps, label: "Smes Sport Arena" },
  ];

  return (
    <Card className="w-full bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-200 flex flex-col p-0">
      {/* Header */}
      <div className="flex items-center px-6 py-3">
        <Link href="/club/1">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden" />
        </Link>
        <span className="font-semibold text-gray-800 px-4">Green Club</span>
      </div>
      <CardContent className="flex flex-col flex-grow space-y-3 px-5">
        {MappingDataIcon.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center text-sm text-gray-700 gap-2 ${
              isMobile ? "mx-16" : "mx-5"
            }`}
          >
            <Image
              src={item.icon}
              alt={item.label}
              width={16}
              height={16}
              className="shrink-0"
            />
            <span>{item.label}</span>
          </div>
        ))}
        <div className="py-2"></div>
        {/* Join Button */}
        <Button className="w-full mt-4 border-[#174038] border text-gray-800 bg-transparent hover:bg-gray-100 rounded-lg">
          Join
        </Button>
      </CardContent>
      {/* Content */}
    </Card>
  );
};

export default ClubCard;
