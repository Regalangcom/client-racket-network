"use client";

import React, { useState } from "react";
import { MapPin, Users, ArrowLeft, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaWhatsapp } from "react-icons/fa";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import Link from "next/link";
import InfoTag from "./info-tag";
import { clubTags } from "@/constant/club-tags";
import { times, maps, DEFAULT } from "@/public";
import ClubActions from "./joined/club-action";
import { ClubDetailCardProps } from "@/constant/types";
import { ClubFormValues } from "@/constant/types/zodSchema";
import { useRouter } from "next/navigation";
import EditContactModal from "./joined/menu-joined/edit-menu-contact";

/**
 * ClubProfileDetail Component
 * Main wrapper for club detail page
 * Handles display logic, delegates actions to ClubActions
 */
const ClubProfileDetail: React.FC<ClubDetailCardProps> = ({
  id,
  title,
  logoUrl,
  club,
  genre,
  member,
  privacy,
  name_contact,
  contact_avatar,
  stars_label,
  phone_number,
  location,
  home_court,
  owner_id,
  userJoinStatus,
  accessToken,
  isOwner,
  userId,
  joinRequests,
}) => {
  const { isMobile } = useWindowDimension();
  const [imageError, setImageError] = useState(false);
  const [isEditContactOpen, setIsEditContactOpen] = useState(false);

  const router = useRouter();

  const handleContactUpdateSuccess = () => {
    router.refresh();
  };

  const clubData: ClubFormValues & { logoUrl?: string } = {
    sport_category: genre,
    clubName: club,
    description: title || "",
    privacy: privacy as "PUBLIC" | "PRIVATE", // ✅ Type assertion
    location: location,
    home_court: home_court,
    gender: "all",
    logoUrl: logoUrl,
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header gray section - ONLY FOR MOBILE */}
      {isMobile && (
        <div className="bg-gray-100 h-36 relative">
          <div className="p-4">
            <Link href="/club" className="flex items-center text-black">
              <ArrowLeft size={24} />
            </Link>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
            <Avatar className="w-24 h-24 border-4 border-white bg-gray-200">
              {!imageError && logoUrl ? (
                <AvatarImage
                  src={logoUrl}
                  alt={title || club || "Club"}
                  onError={() => setImageError(true)}
                />
              ) : (
                <AvatarFallback className="text-2xl">
                  {club?.charAt(0) || "C"}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
        </div>
      )}

      {/* Desktop back button */}
      {!isMobile && (
        <div className="p-4">
          <Link href="/club" className="flex items-center text-black">
            <ArrowLeft size={24} />
          </Link>
        </div>
      )}

      <div
        className={`container-lg p-4 mx-auto md:px-4 ${
          isMobile ? "pt-16 pb-8" : "py-4"
        }`}
      >
        {isMobile ? (
          /* ========== MOBILE LAYOUT ========== */
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold text-center mb-4">{club}</h1>

            <div className="flex gap-4 text-sm text-gray-700 w-full justify-center mb-12">
              {clubTags(genre, member, stars_label).map((tag, idx) => (
                <InfoTag key={idx} {...tag} />
              ))}
              <span className="text-red-700">{privacy}</span>
            </div>

            <div className="mb-8 w-full flex justify-center">
              <div className="w-[96%]">
                <ClubActions
                  clubId={id}
                  accessToken={accessToken}
                  privacy={privacy}
                  isOwner={isOwner}
                  joinRequests={joinRequests}
                  userJoinStatus={userJoinStatus}
                  clubData={clubData}
                />
              </div>
            </div>

            {/* Contact section */}
            <div className="flex flex-row items-center mt-4 space-x-4 justify-between">
              <h2 className="text-lg font-bold mb-4">Contact</h2>
              {/* ✅ Show Edit button only for owner */}
              {isOwner && accessToken && (
                <button
                  onClick={() => setIsEditContactOpen(true)}
                  className="text-lg text-blue-600 font-bold mb-4 hover:text-blue-700"
                >
                  Edit
                </button>
              )}
            </div>

            <div className="bg-gray-100 rounded-lg p-4 flex items-center mb-6">
              <Avatar className="mr-3">
                <AvatarImage src={contact_avatar || ""} alt={name_contact} />
                <AvatarFallback>{name_contact?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <p className="font-medium">
                  {name_contact}
                  <span className="text-gray-600 font-normal"> (Host)</span>
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white"
                >
                  <span className="h-4 w-4 text-gray-700">📞</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white"
                >
                  <FaWhatsapp className="text-green-600" size={18} />
                </Button>
              </div>
            </div>

            {/* Activities section */}
            <div className="mb-2">
              <h2 className="text-xl font-bold mb-4">Activities</h2>
              <p className="mb-2">Match</p>

              {/* Activity card */}
              <div className="bg-gray-100 rounded-xl py-5 px-5">
                <div className="relative">
                  <h3 className="font-bold text-base">Tennis Thursday Night</h3>
                </div>
                <div className="flex items-center gap-2 mb-2 mt-4 text-sm">
                  <Image src={times || DEFAULT} alt="" className="" />
                  <span>30 April, 18:00 - 21:00</span>
                </div>
                <div className="flex items-center gap-2 mb-2 text-sm">
                  <Image src={maps || DEFAULT} alt="" className="" />
                  <span>Smes Sport Bintaro</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4" />
                  <span>Beginner - Intermediate</span>
                </div>
              </div>
            </div>
            {/* Competitions */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4"></h2>
              <p className="mb-2">Competition</p>
              <div className="bg-gray-100 rounded-lg py-6 px-5">
                <h3 className="font-semibold text-base mb-2">
                  Tennis Thursday Night
                </h3>
                <div className="flex items-center gap-2 mb-2 mt-4 text-sm">
                  <Image src={times} alt="" className="" />
                  <span>30 April, 18:00 - 21:00</span>
                </div>
                <div className="flex items-center gap-2 mb-2 text-sm">
                  <Image src={maps} alt="" className="" />
                  <span>Smes Sport Bintaro</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4" />
                  <span>Beginner - Intermediate</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========== DESKTOP LAYOUT ========== */
          <div className="flex flex-row gap-8">
            {/* LEFT SIDE - Club Image */}
            <div className="w-1/2">
              <div className="h-96 relative overflow-hidden rounded-lg">
                <Image
                  src={logoUrl || DEFAULT}
                  alt={title || ""}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* RIGHT SIDE - Club info */}
            <div className="w-1/2">
              <h1 className="text-3xl font-bold mb-1">{club}</h1>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-green-rc" />
                  <span>{genre}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="w-5 h-5 text-green-rc" />
                  <span>{member}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Star className="w-5 h-5 text-green-rc" />
                  <span>{stars_label}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-red-700 font-medium">{privacy}</span>
                </div>
              </div>

              {/* Contact section */}
              <h2 className="text-xl font-bold mb-4">Contact</h2>
              <div className="bg-gray-100 rounded-lg p-4 flex items-center mb-6">
                <Avatar className="mr-3">
                  <AvatarImage src={contact_avatar || ""} alt={name_contact} />
                  <AvatarFallback>{name_contact?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p className="font-medium">{name_contact}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white"
                  >
                    <span className="h-4 w-4 text-gray-700">📞</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white"
                  >
                    <FaWhatsapp className="text-green-rc" size={18} />
                  </Button>
                </div>
              </div>

              {/* ✅ UPDATED: Pass userJoinStatus to ClubActions */}
              <ClubActions
                clubId={id}
                accessToken={accessToken}
                privacy={privacy}
                isOwner={isOwner}
                joinRequests={joinRequests}
                userJoinStatus={userJoinStatus}
              />
            </div>
          </div>
        )}

        {/* using dialog edit contact owner */}
        {isOwner && accessToken && (
          <EditContactModal
            isOpen={isEditContactOpen}
            onClose={() => setIsEditContactOpen(false)}
            currentUsername={name_contact || ""}
            currentPhone={phone_number || ""}
            accessToken={accessToken}
            onSuccess={handleContactUpdateSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default ClubProfileDetail;
