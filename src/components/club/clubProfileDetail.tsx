"use client";

import React from "react";
import { MapPin, Users, ArrowLeft, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaWhatsapp } from "react-icons/fa";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import Link from "next/link";

interface clubDetailCardProps {
  title: string;
  logo: string;
  club: string;
  genre: string;
  name_contact: string;
  member: string;
  contact_avatar: string;
  stars: string;
}

const ClubProfileDetails: React.FC<clubDetailCardProps> = ({
  title,
  logo,
  club,
  genre,
  member,
  name_contact,
  contact_avatar,
  stars,
}) => {
  const { isMobile } = useWindowDimension();
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header gray section - ONLY FOR MOBILE */}
      {isMobile && (
        <div className="bg-gray-100 h-36 relative">
          {/* Back button */}
          <div className="p-4">
            <Link href="/club" className="flex items-center text-black">
              <ArrowLeft size={24} />
            </Link>
          </div>

          {/* Avatar that overlaps gray and white sections - only mobile */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
            <Avatar className="w-24 h-24 border-4 border-white bg-gray-200">
              {logo && <AvatarImage src={logo} alt={title} />}
              <AvatarFallback>{club.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      )}

      {/* Desktop back button - only for desktop */}
      {!isMobile && (
        <div className="p-4">
          <Link href="/club" className="flex items-center text-black">
            <ArrowLeft size={24} />
          </Link>
        </div>
      )}

      <div
        className={`container mx-auto md:px-4 ${
          isMobile ? "pt-16 pb-8" : "py-4"
        }`}
      >
        {isMobile ? (
          /* Mobile Layout */
          <div className="flex flex-col">
            {/* Club name */}
            <h1 className="text-2xl font-semibold text-center mb-4">{club}</h1>

            {/* Info tags */}
            <div className="flex gap-4 text-sm text-gray-700 w-full justify-center mb-6">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-green-800" />
                <span>{club}</span>
              </div>

              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-green-800" />
                <span>{member}</span>
              </div>

              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-green-800" />
                <span>{stars}</span>
              </div>
            </div>

            {/* Join button */}
            <div className="mb-8 w-full flex justify-center ">
              <Button className="py-3 w-1/3 bg-green-900 border-[#174038]  border  text-[#E1FFA0] font-semibold rounded-md hover:bg-green-800">
                Join
              </Button>
            </div>

            {/* Contact section */}
            <h2 className="text-xl font-bold mb-4">Contact</h2>
            <div className="bg-gray-100 rounded-lg p-4 flex items-center mb-6">
              <Avatar className="mr-3">
                <AvatarImage src={contact_avatar} alt={name_contact} />
                <AvatarFallback>{name_contact.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <p className="font-medium">
                  {name_contact}
                  <span className="text-gray-600 font-normal">(Host)</span>
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
              <div className="bg-gray-100 rounded-xl py-8 p-4">
                <h3 className="font-semibold text-lg ">
                  Tennis Thursday Night
                </h3>
                <div className="flex items-center gap-2 mb-2 text-sm">
                  <span>30 April, 18:00 - 21:00</span>
                </div>
                <div className="flex items-center gap-2 mb-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>Smes Sport Bintaro</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4" />
                  <span>Beginner - Intermediate</span>
                </div>
              </div>
            </div>

            <div className="mb-2">
              <h2 className="text-xl font-bold mb-4"></h2>
              {/* <p className="mb-2">Match</p> */}

              {/* Activity card */}
              <div className="bg-gray-100 rounded-lg py-8 p-4">
                <h3 className="font-semibold text-lg mb-2">
                  Tennis Thursday Night
                </h3>
                <div className="flex items-center gap-2 mb-2 text-sm">
                  <span>30 April, 18:00 - 21:00</span>
                </div>
                <div className="flex items-center gap-2 mb-2 text-sm">
                  <MapPin className="w-4 h-4" />
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

              {/* Activity card */}
              <div className="bg-gray-100 rounded-lg py-8 p-4">
                <h3 className="font-semibold text-lg mb-2">
                  Tennis Thursday Night
                </h3>
                <div className="flex items-center gap-2 mb-2 text-sm">
                  <span>30 April, 18:00 - 21:00</span>
                </div>
                <div className="flex items-center gap-2 mb-2 text-sm">
                  <MapPin className="w-4 h-4" />
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
          /* Desktop Layout - match the image */
          <div className="flex flex-row gap-8">
            {/* LEFT SIDE - Club Image */}
            <div className="w-1/2">
              <div className="h-96 relative overflow-hidden rounded-lg">
                <Image
                  src={logo}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* RIGHT SIDE - Club info */}
            <div className="w-1/2">
              <h1 className="text-3xl font-bold mb-1">{club}</h1>
              {/* <p className="text-xl mb-4">{club}</p> */}

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
                  <span>{stars}</span>
                </div>
              </div>

              {/* Contact section */}
              <h2 className="text-xl font-bold mb-4">Contact</h2>
              <div className="bg-gray-100 rounded-lg p-4 flex items-center mb-6">
                <Avatar className="mr-3">
                  <AvatarImage src={contact_avatar} alt={name_contact} />
                  <AvatarFallback>{name_contact.charAt(0)}</AvatarFallback>
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

              {/* Join button */}
              <Button className="w-full py-6 bg-background-button-rc text-white font-semibold rounded-md hover:bg-green-800">
                Join
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubProfileDetails;
