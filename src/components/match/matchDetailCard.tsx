"use client";

import Image, { StaticImageData } from "next/image";
import { Calendar, MapPin, Users, Tag, ArrowLeft } from "lucide-react";
import { reviews, maps, accounts, prices } from "@/public";
import { Button } from "@/components/ui/button";
import TimeSelector from "./timeSelector";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import React from "react";

interface MatchDetailCardProps {
  title: string;
  logo: string;
  date: string;
  location: string;
  price: string;
  club: string;
  description: string;
  times: string[];
}

type DetailItem = {
  icon: StaticImageData;
  label: string;
  hasTimeSelector?: boolean;
};

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

  const details: DetailItem[] = [
    { icon: accounts, label: "Women only", hasTimeSelector: true },
    { icon: maps, label: location },
    { icon: prices, label: price },
    { icon: reviews, label: club },
  ];

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
            className=" text-white hover:text-gray-800"
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
            <React.Fragment key={index}>
              <div className="flex items-center gap-3 rounded-3xl mb-5 ">
                <Image
                  src={detail.icon}
                  alt={detail.label}
                  width={14}
                  height={15}
                  className="w-4 h-4"
                />
                <span className="text-black">{detail.label}</span>
              </div>

              {/* Tambahkan TimeSelector setelah "Women only" */}
              {detail.hasTimeSelector && (
                <>
                  <p className="text-xl font-semibold mt-2">Select your time</p>
                  <div className="flex items-center gap-3 text-gray-600 mb-2">
                    <TimeSelector times={times} />
                  </div>
                </>
              )}
            </React.Fragment>
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
