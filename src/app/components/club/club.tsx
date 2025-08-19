// components/ClubCard.tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Clock, MapPin } from "lucide-react";
import { useWindowDimension } from "@/hooks/useWindowdimension";

const ClubCard: React.FC = () => {
  const { isMobile } = useWindowDimension();

  return (
    <Card className="w-full bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-200 flex flex-col p-0">
      {/* Header */}
      <div className="flex items-center px-6 py-3">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden" />
        <span className="font-semibold text-gray-800 px-4">Green Club</span>
      </div>
      {/* Content */}
      <CardContent
        className={`flex flex-col flex-grow space-y-3 ${
          isMobile ? "px-5" : "px-5"
        }`}
      >
        {/* <CardContent className="flex flex-col flex-grow px-6 space-y-3"> */}
        {/* Members */}
        {/* <div className="flex items-center text-sm text-gray-700 gap-2"> */}
        <div
          className={`${
            isMobile
              ? "flex mx-16 items-center text-sm text-gray-700 gap-2"
              : "flex items-center text-sm text-gray-700 gap-2"
          }`}
        >
          <Users size={16} className="shrink-0" />
          <span>28 Members</span>
        </div>

        {/* Gender */}
        <div
          className={`${
            isMobile
              ? "flex mx-16 items-center text-sm text-gray-700 gap-2"
              : "flex items-center text-sm text-gray-700 gap-2"
          }`}
        >
          <Clock size={16} className="shrink-0" />
          <span>All Gender</span>
        </div>

        {/* Location */}
        <div
          className={`${
            isMobile
              ? "flex mx-16 items-center text-sm text-gray-700 gap-2"
              : "flex items-center text-sm text-gray-700 gap-2"
          }`}
        >
          <MapPin size={16} className="shrink-0" />
          <span>Jakarta</span>
        </div>

        {/* Arena */}
        <div
          className={`${
            isMobile
              ? "flex mx-16 items-center text-sm text-gray-700 gap-2"
              : "flex items-center text-sm text-gray-700 gap-2"
          }`}
        >
          <Clock size={16} className="shrink-0" />
          <span>Smes Sport Arena</span>
        </div>

        {/* Join Button */}
        <Button className="w-full mt-4 border border-gray-400 text-gray-800 bg-transparent hover:bg-gray-100 rounded-lg">
          Join
        </Button>
      </CardContent>
    </Card>
  );
};

export default ClubCard;
