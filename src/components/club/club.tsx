// components/club/club.tsx
"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { accounts, members, city, maps } from "@/public";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { ClubData } from "@/constant/types";
import ClubCardSkeleton from "./club-card-skeleton";

type IconCardClub = {
  icon: StaticImageData;
  label: string;
};

interface ClubCardProps {
  club?: ClubData;
}

const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  const { isMobile } = useWindowDimension();
  const router = useRouter();

  if (!club) {
    return <ClubCardSkeleton />;
  }

  const clubIconData: IconCardClub[] = [
    {
      icon: members,
      label: `${club._count.members} Member${
        club._count.members !== 1 ? "s" : ""
      }`,
    },
    { icon: accounts, label: club.gender_rule },
    { icon: city, label: club.location },
    { icon: maps, label: club.sport_category },
  ];

  // Handler untuk tombol join
  const handleJoinClick = () => {
    router.push(`/club/${club.id}`);
  };

  return (
    <Card className="w-full bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-200 flex flex-col p-0">
      {/* Header */}
      <div className="flex items-center px-6 py-3">
        <Link href={`/club/${club.id}`}>
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            {club.logoUrl && (
              <Image
                src={club.logoUrl}
                alt={club.name_club}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            )}
          </div>
        </Link>
        <div className="flex flex-col px-4">
          <span className="font-semibold text-gray-800">{club.name_club}</span>
          {club.privacy === "PRIVATE" && (
            <span className="text-xs font-bold w-full text-red-900 mt-1 ml-44">
              Private Club
            </span>
          )}
        </div>
      </div>
      <CardContent className="flex flex-col flex-grow space-y-3 px-5">
        {clubIconData.map((item, idx) => (
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
        <Button
          className="w-full mt-4 border-[#174038] border text-gray-800 bg-transparent hover:bg-gray-100 rounded-lg"
          onClick={handleJoinClick}
        >
          {club.privacy === "PRIVATE" ? "Request to Join" : "Join"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ClubCard;
