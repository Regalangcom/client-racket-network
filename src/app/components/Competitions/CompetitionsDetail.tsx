"use client";

import React from "react";
import { Calendar, MapPin, Users, Tag } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaWhatsapp } from "react-icons/fa";

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
  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
      {/* Left side image */}
      <div className="w-full sm:w-[40%] flex justify-center items-center">
        <Image
          src={logo}
          alt={`${title} logo`}
          width={600}
          height={400}
          className="rounded-2xl object-cover w-full h-full"
          priority
        />
      </div>

      {/* Right side content */}
      <div className="w-full sm:w-[60%] bg-white p-6 rounded-3xl shadow-md">
        <h2 className="text-3xl font-bold ">{title}</h2>
        <h2 className="text-2xl font-bold mb-4">{organized}</h2>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5 text-green-600" />
            <span>{date}</span>
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

        <p className="text-black font-bold text-2xl mb-4">Description</p>
        <p className="text-gray-700 mb-4">{description}</p>
        {/* What's Up Section */}
        <div className="space-y-2 mb-6 border-t-2 pt-4 b">
          <p className="text-xl font-semibold text-gray-800">Contact</p>
          <div className="flex items-center  py-3  px-5 rounded-lg gap-3  bg-[#F5F5F4]">
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
            <div className=" justify-end items-end flex ">
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
        <Button className="w-full py-3 bg-background-button-rc text-white font-semibold rounded-lg hover:bg-white hover:text-black hover:border-2">
          Register
        </Button>
      </div>
    </div>
  );
};

export default CompetitionsDetails;

// <Card className="w-full bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-200 flex flex-col p-0">
//   {/* Header */}
//   <div className="flex items-center px-6 py-3">
//     {/* <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden" /> */}
//     <span className="font-bold text-base text-black">
//       Jakarta - Women Single
//       <span className="font-semibold text-sm flex text-gray-800">
//         Organized by GRC
//       </span>
//     </span>
//   </div>
//   {/* Content */}
//   <CardContent
//     className={`flex flex-col flex-grow space-y-2 ${
//       isMobile ? "px-5" : "px-5"
//     }`}
//   >
//     <div
//       className={`${
//         isMobile
//           ? "flex items-center text-sm text-gray-700 gap-2"
//           : "flex items-center text-sm text-gray-700 gap-2"
//       }`}
//     >
//       <Users size={16} className="shrink-0" />
//       <span>28 Members</span>
//     </div>

//     <div
//       className={`${
//         isMobile
//           ? "flex items-center text-sm text-gray-700 gap-2"
//           : "flex items-center text-sm text-gray-700 gap-2"
//       }`}
//     >
//       <MapPin size={16} className="shrink-0" />
//       <span>Jakarta</span>
//     </div>

//     {/* Arena */}
//     <div
//       className={`${
//         isMobile
//           ? "flex  items-center mb-5 text-sm text-gray-700 gap-2"
//           : "flex items-center mb-5 text-sm text-gray-700 gap-2"
//       }`}
//     >
//       <span></span>
//     </div>

//     <div
//       className={`${
//         isMobile
//           ? "flex items-center py-2 w-28 mb-5 text-sm bg-[#B5D9D2] rounded-full  text-gray-700 gap-2"
//           : "flex items-center mb-5  py-2 w-28 bg-[#B5D9D2] rounded-full  text-sm text-gray-700 gap-2"
//       }`}
//     >
//       <span className="mx-3">5 Sport Leave</span>
//     </div>

//     {/* Join Button */}
//     <div className="max-w-full">
//       <span className="w-full  mt-4 flex justify-end items-end  border-gray-400 text-gray-800 bg-transparent hover:bg-gray-100 rounded-lg">
//         <a href="" className="text-right font-bold text-base text-green-rc">
//           See detail
//         </a>
//       </span>
//     </div>
//   </CardContent>
// </Card>
