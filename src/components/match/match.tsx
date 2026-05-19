"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MatchViewDisplay } from "./match-tags";
import { MatchData } from "@/constant/types";

export interface MatchCardProps {
  match: MatchData;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  return (
    <Card className="sm:w-[290px] w-full md:w-[290px] h-[466px] rounded-2xl overflow-hidden shadow-sm border border-gray-200 flex flex-col p-0 mb-5">
      {/* Header */}
   <div className="bg-gray-200 flex items-center justify-between px-6 py-3">
  <div className="flex items-center">
    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
      {match.club && (
        <Image
          src={match.club.logoUrl || ""}
          alt={match.club.name_club || "Club"}
          width={88}
          height={88}
          className="object-cover w-12 h-12"
        />
      )}
    </div>

    <span className="font-medium text-gray-800 ml-4">
      {match.club?.name_club || "Club"}
    </span>
  </div>

  <span className="font-bold text-sm text-green-950">{match.status}</span>
</div>

      {/* Event image */}
      <div className="w-full h-[180px] relative">
        <Image
          src={match.bannerUrl || "/default-image.jpg"}
          alt={match.name_match}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}

      <CardContent className="flex flex-col justify-between flex-1 p-4">
        <MatchViewDisplay match={match} />
        <div className="flex items-center text-sm text-gray-600 gap-2 mb-3 mt-5">
          {/* <Image src={maps} alt="maps" priority /> */}
          {match.is_full ? (
            <span className="flex items-center justify-center py-1 w-28 mb-5 text-sm bg-red-200 rounded-full text-red-700">
              Fully Booked
            </span>
          ) : (
            <span className="flex items-center justify-center py-1 w-28 mb-5 text-sm bg-[#B5D9D2] rounded-full text-gray-700">
              {match.available_spots} spot left
            </span>
          )}
        </div>
        {match.is_full || match.status === "FINISHED" ? (
          <Button
            disabled
            className="mt-4 w-full py-5 bg-background-button-rc text-[#E1FFA0] rounded-lg"
          >
            Views
          </Button>
        ) : (
          <Link href={`/match/${match.id}`}>
            <Button className="mt-4 w-full py-5 bg-background-button-rc text-[#E1FFA0] rounded-lg">
              Views
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchCard;
