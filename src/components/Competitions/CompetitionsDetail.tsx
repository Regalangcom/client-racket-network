"use client";

import React from "react";
import { Calendar, MapPin, Users, Tag, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWindowDimension } from "@/hooks/useWindowdimension";

interface CompetitonsDetailCardProps {
  title: string;
  logo: string;
  date: string;
  location: string;
  price: string;
  club: string;
  description: string;
  name_contact: string;
  organized: string;
  contact_avatar: string;
}

const CompetitionsDetails: React.FC<CompetitonsDetailCardProps> = ({
  title,
  logo,
  date,
  location,
  price,
  club,
  description,
  name_contact,
  organized,
  contact_avatar,
}) => {
  const router = useRouter();
  const isMobile = useWindowDimension();

  return (
    <div className="flex flex-col max-w-full  sm:flex-row overflow-y-auto">
      {/* Left side image */}
      <div className="w-full sm:w-[40%] flex md:h-72 sm:h-0 justify-center items-center">
        <Image
          src={logo}
          alt={`${title} logo`}
          width={600}
          height={200}
          className="object-cover w-full h-[190px] md:h-auto"
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
      <div className="w-full sm:w-[60%] p-4 bg-white rounded-3xl shadow-md min-h-[820px] overflow-scroll ">
        <h2 className="text-2xl font-bold ">{title}</h2>
        <h2 className="text-sm font-bold mb-4">{organized}</h2>

        <div className="space-y-1 mb-4">
          <div className="flex items-center mb-6 gap-2 text-gray-600">
            <Calendar className="w-5 h-5 text-green-600" />
            <span className="text-xl">{date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5 text-green-600" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Tag className="w-5 h-5 text-green-600" />
            <span>{price}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-5 h-5 text-green-600" />
            <span>{club}</span>
          </div>
        </div>

        <div className="py-6">
          <div className=" relative bg-gray-200 py-[4px] px-6"></div>
        </div>

        <p className="text-[#292524] text-2xl mt-4 mb-2">Description</p>
        <p className="text-gray-700 mb-6">{description}</p>
        {/* What's Up Section */}
        <div className="space-y-2 mb-20 pt-4">
          <p className="text-xl font-semibold text-gray-800">Contact</p>
          <div className="flex items-center py-6 px-5 rounded-lg gap-3  bg-[#F5F5F4]">
            {/* Avatar from Shadcn UI */}
            {/* <div className=""> */}
            <Avatar>
              <AvatarImage src={contact_avatar} alt="Contact Avatar" />
              <AvatarFallback>DC</AvatarFallback>{" "}
              {/* Default initials if avatar is not available */}
            </Avatar>
            <div className="w-full">
              <span className="font-medium text-gray-700">{name_contact}</span>
            </div>
            {/* </div> */}
            {/* WhatsApp Button */}
            <div className="justify-end items-end flex">
              <Button
                className=" text-white bg-[#F5F5F4] text-sm px-4 py-2 rounded-lg"
                onClick={() => window.open(`https://wa.me/IDCONTACT`, "_blank")}
              >
                <span>
                  <FaWhatsapp className="text-black" />
                </span>
              </Button>
            </div>
          </div>
        </div>
        {/* Join button */}
        <Link href={`/competitions/1/comp-payment`}>
          <Button className="w-full py-3 bg-background-button-rc text-white font-semibold rounded-lg hover:bg-white hover:text-black hover:border-2">
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CompetitionsDetails;
