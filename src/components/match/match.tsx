"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MatchViewDisplay } from "./match-tags";
import { MatchCardProps } from "@/constant/types";

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  return (
    <Card className="sm:w-[290px] w-full md:w-[290px] h-[466px] rounded-2xl overflow-hidden shadow-sm border border-gray-200 flex flex-col p-0 mb-5">
      {/* Header */}
      <div className="bg-gray-200 flex items-center px-6 py-3">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
          {/* Gambar */}
          {/* Logo jika ada */}
          {/* {match.logo && (
            <Image 
              src={match.logo} 
              alt={match.clubName || "Club"} 
              width={48}
              height={48}
              className="object-cover" 
            />
          )} */}
        </div>
        <span className="font-medium text-gray-800 px-7">
          {match.clubName || "Club"}
        </span>
      </div>

      {/* Event image */}
      <div className="w-full h-[180px] relative">
        <Image
          src={match.logo || "/default-image.jpg"}
          alt={match.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <CardContent className="flex flex-col justify-between flex-1 p-4">
        <MatchViewDisplay match={match} />
        <Link href="/match/1">
          <Button className="mt-4 w-full py-5 bg-background-button-rc text-[#E1FFA0] rounded-lg">
            View
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
