"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import React, { useEffect, useState } from "react";
import { MatchDetailCardProps } from "@/constant/types";
import { MatchTag } from "./match-tags";
import { matchDetailCard } from "@/constant/match";

const MatchDetailCard: React.FC<MatchDetailCardProps> = ({
  id,
  name_match,
  bannerUrl,
  match_date,
  TimeSlot,
  location,
  price,
  name_club,
  gender_restriction,
  description,
}) => {
  const router = useRouter();
  const isMobile = useWindowDimension();
  // const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<number | null>(
  //   TimeSlot.length > 0 ? TimeSlot[0].id || 0 : null
  // );

  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (TimeSlot.length > 0) {
      setSelectedTimeSlotId(TimeSlot[0].id || 0);
    }
  }, [TimeSlot]);

  // const formattedDate = formatLongDate(match_date, "en");

  const details = matchDetailCard(
    location,
    price,
    name_club,
    gender_restriction
  );

  return (
    <div className="flex flex-col sm:flex-row md:gap-6 sm:gap-10">
      {/* Left side image */}
      <div className="w-full sm:w-[40%] flex justify-center items-center">
        {bannerUrl ? (
          <Image
            src={bannerUrl}
            alt={`${name_match} logo`}
            width={600}
            height={400}
            className=" object-cover w-full h-[190px] md:h-auto"
            priority
          />
        ) : (
          <p>not found</p>
        )}
      </div>

      {isMobile && (
        <div className="p-3 absolute mt-2">
          <span
            className="text-white hover:text-gray-800"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-6 h-6" />
          </span>
        </div>
      )}

      {/* Right side content */}
      <div className="w-full sm:w-[60%] bg-white p-4 md:p-6 rounded-3xl">
        <h2 className="text-3xl font-bold mb-2">{name_match}</h2>

        <div className="space-y-2">
          {details.map((detail, index) => (
            <MatchTag
              key={index}
              icon={detail.icon}
              label={detail.label}
              hasTimeSelector={detail.hasTimeSelector}
              TimeSlot={detail.hasTimeSelector ? TimeSlot : undefined}
              selectedTimeSlotId={selectedTimeSlotId}
              onTimeSelect={setSelectedTimeSlotId}
            />
          ))}
        </div>

        {/* Date Display */}
        {/* <div className="flex items-center gap-3 rounded-3xl mb-5 mt-2">
          <span className="text-gray-600">📅</span>
          <span className="text-gray-700">{formattedDate}</span>
        </div> */}

        {/* SEPARATOR */}
        <div className="py-3 relative w-[calc(100%+2rem)] -mx-4 md:-mx-6">
          <div className="bg-gray-300 absolute left-0 right-0 py-[4px]"></div>
        </div>

        <h2 className="text-gray-700 text-xl mb-1 mt-2 font-semibold">
          Description
        </h2>
        <p className="text-gray-700 mb-4">{description}</p>

        {/* Join buttons */}
        <div className="mt-[100px] grid min-h-[200px] items-start">
          <Link href={`/match/${id}/join-match`}>
            <Button className="w-full py-3 bg-background-button-rc text-[#E1FFA0] font-semibold rounded-lg hover:bg-white hover:text-black hover:border-2">
              Join
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailCard;
