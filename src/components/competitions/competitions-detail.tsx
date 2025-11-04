"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import CompetitionTag from "./competitons-tags";
import { Competitions } from "@/constant/competitions";
import Separator from "../ui/separator";
import { CompetitionDetailCore } from "@/constant/types";

const CompetitionsDetails: React.FC<CompetitionDetailCore> = ({
  name_comp,
  bannerUrl,
  id,
  organizer_name,
  competitions_date,
  location,
  description,
  club,

  // username,
  // phone_number,
  logo,
  host,
  price,
}) => {
  const router = useRouter();
  const isMobile = useWindowDimension();
  const details = Competitions(
    competitions_date,
    location,
    price,
    club.name_club
  );

  return (
    <div className="flex flex-col max-w-full  sm:flex-row overflow-y-auto">
      {/* Left side image */}
      <div className="w-full sm:w-[40%] flex md:h-72 sm:h-0 justify-center items-center">
        {bannerUrl ? (
          <Image
            src={bannerUrl}
            alt={`${name_comp} logo`}
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
            className=" text-white hover:text-gray-800"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-6 h-6" />
          </span>
        </div>
      )}

      {/* ================================ */}
      {/* REUSABLE COMPONENT */}
      {/* ================================ */}
      {/* Right side content */}
      <div className="w-full sm:w-[60%] p-4 bg-white rounded-3xl shadow-md min-h-[820px] overflow-scroll ">
        <h2 className="text-2xl font-bold ">{name_comp}</h2>
        <h2 className="text-sm font-bold mb-6">
          {" "}
          Organized by {organizer_name}
        </h2>

        {/* clean code */}
        <div className="space-y-1 mb-2">
          {details.map((tag, idx) => (
            <CompetitionTag key={idx} {...tag} containerClass="mb-6" />
          ))}
        </div>

        {/* SEPARATOR */}
        <Separator />

        <p className="text-[#292524] text-2xl mt-4 mb-2">Description</p>
        <p className="text-gray-700 mb-6">{description}</p>
        {/* What's Up Section */}
        <div className="space-y-2 mb-20 pt-4">
          <p className="text-xl font-semibold text-gray-800">Contact</p>
          <div className="flex items-center py-6 px-5 rounded-lg gap-3  bg-[#F5F5F4]">
            {/* Avatar from Shadcn UI */}
            <Avatar>
              <AvatarImage src={logo} alt="Contact Avatar" />
              <AvatarFallback>DC</AvatarFallback>{" "}
              {/* Default initials if avatar is not available */}
            </Avatar>
            <div className="w-full">
              <span className="font-medium text-gray-700">{host.username}</span>
            </div>
            {/* </div> */}
            {/* WhatsApp Button */}
            <div className="justify-end items-end flex">
              <Button
                className=" text-white bg-[#F5F5F4] text-sm px-4 py-2 rounded-lg"
                onClick={() =>
                  window.open(`https://wa.me/${host.phone_number}`, "_blank")
                }
              >
                <span>
                  <FaWhatsapp className="text-black" />
                </span>
              </Button>
            </div>
          </div>
        </div>
        {/* Join button */}
        <Link href={`/competitions/${id}/comp-payment`}>
          <Button className="w-full py-3 bg-background-button-rc text-[#E1FFA0] font-semibold rounded-lg hover:bg-white hover:text-black hover:border-2">
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CompetitionsDetails;
