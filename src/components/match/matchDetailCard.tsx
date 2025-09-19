"use client";

import Image from "next/image";
import { Calendar, MapPin, Users, Tag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import TimeSelector from "./timeSelector";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWindowDimension } from "@/hooks/useWindowdimension";

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

const MatchDetailCard: React.FC<MatchDetailCardProps> = ({
  title,
  logo,
  date,
  location,
  price,
  club,
  description,
  times,
}) => {
  const router = useRouter();
  const isMobile = useWindowDimension();

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
          <div className="flex items-center gap-3 mb-5 text-gray-600">
            <Calendar className="w-5 h-5 text-green-600" />
            <span>Women only</span>
          </div>
          {/* timer */}
          <p className="text-xl font-semibold">Select your time</p>
          <div className="flex items-center gap-3 text-gray-600">
            {/* Times */}
            <TimeSelector times={times} />
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin className="w-5 h-5 text-green-600" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Tag className="w-5 h-5 text-green-600" />
            <span>{price}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Users className="w-5 h-5 text-green-600" />
            <span>{club}</span>
          </div>
        </div>
        <div className="py-3 w-full relative justify-center">
          <div className="relative bg-gray-300 py-[4px] px-6"></div>
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
