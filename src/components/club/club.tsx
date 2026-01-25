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
import { Crown } from "lucide-react";

type IconCardClub = {
  icon: StaticImageData;
  label: string;
};

interface ClubCardProps {
  // userId?: string | number | null;
  club?: ClubData;
}

const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  const { isMobile } = useWindowDimension();
  const router = useRouter();

  if (!club) {
    return <ClubCardSkeleton />;
  }
  // const isOwner = userId && club.owner_id === userId;

  const clubIconData: IconCardClub[] = [
    {
      icon: members,
      label: `${club._count.members} Member${
        club._count.members !== 1 ? "s" : ""
      }`,
    },
    { icon: accounts, label: club.gender_rule },
    { icon: city, label: club.location },
    { icon: maps, label: club.home_court },
  ];

  // Handler untuk tombol join
  const handleJoinClick = () => {
    router.push(`/club/${club.id}`);
  };

  const getButtonText = () => {
    if (club.isOwner) return "Manage Club";
    if (club.privacy === "PRIVATE") return "Request to Join";
    return "Join";
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
        <div className="flex flex-row justify-between items-center px-4 w-full">
          <span className="font-semibold text-gray-800">{club.name_club}</span>
          {/* {club.privacy === "PRIVATE" && (
            <span className="text-xs font-bold text-green-900">
              Private Club
            </span>
          )} */}

          <div className="flex gap-2 items-center">
            {/* ✅ Owner Badge */}
            {club.isOwner && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-amber-900 bg-amber-100 rounded-full border border-amber-300">
                <Crown className="w-3 h-3" />
                Your Club
              </span>
            )}

            {/* Privacy Badge */}
            {club.privacy === "PRIVATE" && !club.isOwner && (
              <span className="text-xs font-bold text-green-900">
                Private Club
              </span>
            )}
          </div>
        </div>
      </div>
      <CardContent className="flex flex-col flex-grow space-y-1 px-5">
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
            <span className="font-semibold">{item.label}</span>
          </div>
        ))}
        <div className="py-2"></div>
        {/* Join Button */}
        {/* <Button
          className="w-full mt-4 border-[#174038] border text-gray-800 bg-transparent hover:bg-gray-100 rounded-lg"
          onClick={handleJoinClick}
        >
          {club.privacy === "PRIVATE" ? "Request to Join" : "Join"}
        </Button> */}
        <Button
          className={`w-full mt-4 rounded-lg ${
            club.isOwner
              ? "bg-[#174038] text-[#E1FFA0] hover:bg-[#083d30]"
              : "border-[#174038] border text-gray-800 bg-transparent hover:bg-gray-100"
          }`}
          onClick={handleJoinClick}
        >
          {getButtonText()}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ClubCard;
