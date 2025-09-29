"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import React from "react";
import { MatchDetailCardProps } from "@/constant/types";
import { MatchTag } from "./match-tags";
import { matchDetailCard } from "@/constant/match";

const MatchDetailCard: React.FC<MatchDetailCardProps> = ({
  title,
  logo,
  location,
  price,
  club,
  description,
  times,
}) => {
  const router = useRouter();
  const isMobile = useWindowDimension();
  const details = matchDetailCard(location, price, club);

  return (
    <div className="flex flex-col sm:flex-row md:gap-6 sm:gap-10">
      {/* Left side image */}
      <div className="w-full sm:w-[40%] flex justify-center items-center">
        <Image
          src={logo}
          alt={`${title} logo`}
          width={600}
          height={400}
          className=" object-cover w-full h-[190px] md:h-auto"
          priority
        />
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
        <h2 className="text-3xl font-bold mb-2">{title}</h2>

        <div className="space-y-2 mb-4">
          {details.map((detail, index) => (
            <MatchTag
              key={index}
              icon={detail.icon}
              label={detail.label}
              hasTimeSelector={detail.hasTimeSelector}
              times={times}
            />
          ))}
        </div>

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
          <Link href={`/match/1/join-match`}>
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
