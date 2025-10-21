// components/club/club-card-skeleton.tsx
"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const ClubCardSkeleton: React.FC = () => {
  return (
    <Card className="w-full bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-200 flex flex-col p-0">
      <div className="flex items-center px-6 py-3">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden" />
        <span className="font-semibold text-gray-800 px-4">Loading...</span>
      </div>
      <CardContent className="flex flex-col flex-grow space-y-3 px-5">
        {Array(4)
          .fill(0)
          .map((_, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded-full shrink-0" />
              <div className="h-4 bg-gray-300 w-24 rounded"></div>
            </div>
          ))}
        <div className="py-2"></div>
        <div className="w-full mt-4 h-10 bg-gray-300 rounded-lg"></div>
      </CardContent>
    </Card>
  );
};

export default ClubCardSkeleton;
