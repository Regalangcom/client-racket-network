// components/CompetitionsCard.tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin } from "lucide-react";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import Link from "next/link";

const CompetitionsCard: React.FC = () => {
  const { isMobile } = useWindowDimension();

  return (
    <Card className="w-full bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-200 flex flex-col p-0">
      {/* Header */}
      <div className="flex items-center px-6 py-3">
        {/* <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden" /> */}
        <span className="font-bold text-base text-black">
          Jakarta - Women Single
          <span className="font-semibold text-sm flex text-gray-800">
            Organized by GRC
          </span>
        </span>
      </div>
      {/* Content */}
      <CardContent
        className={`flex flex-col flex-grow space-y-2 ${
          isMobile ? "px-5" : "px-5"
        }`}
      >
        <div
          className={`${
            isMobile
              ? "flex items-center text-sm text-gray-700 gap-2"
              : "flex items-center text-sm text-gray-700 gap-2"
          }`}
        >
          <Users size={16} className="shrink-0" />
          <span>28 Members</span>
        </div>

        <div
          className={`${
            isMobile
              ? "flex items-center text-sm text-gray-700 gap-2"
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
              ? "flex  items-center mb-5 text-sm text-gray-700 gap-2"
              : "flex items-center mb-5 text-sm text-gray-700 gap-2"
          }`}
        >
          <span></span>
        </div>

        <div
          className={`${
            isMobile
              ? "flex items-center py-2 w-28 mb-5 text-sm bg-[#B5D9D2] rounded-full  text-gray-700 gap-2"
              : "flex items-center mb-5  py-2 w-28 bg-[#B5D9D2] rounded-full  text-sm text-gray-700 gap-2"
          }`}
        >
          <span className="mx-3">5 Sport Leave</span>
        </div>

        {/* see details Button */}
        <div className="max-w-full">
          <span className="w-full  mt-4 flex justify-end items-end  border-gray-400 text-gray-800 bg-transparent hover:bg-gray-100 rounded-lg">
            <Link
              href="/competitions/1"
              className="text-right font-bold text-base text-green-rc"
            >
              See detail
            </Link>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitionsCard;
