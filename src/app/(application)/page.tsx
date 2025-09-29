// page.tsx
"use client";
import { useState } from "react";
import HomeCard from "../../components/home/card-home";
import Notification from "../../components/home/notification/notification";
import { Match } from "@/constant/types/match";
import { sampeImage } from "@/public";

export default function Home() {
  // Contoh data match (bisa diambil dari API)
  const [matches, setMatches] = useState<Match[]>([
    {
      id: "1",
      clubName: "Supreme TC",
      title: "Tennis Thursday Night",
      date: "30 April, 19:15",
      location: "Smes Sport Bintaro",
      status: "ongoing",
      imageUrl: sampeImage,
    },
    {
      id: "2",
      clubName: "Green Club",
      title: "Weekend Tennis Tournament",
      date: "05 May, 14:00",
      location: "Green Sports Center",
      status: "created",
      imageUrl: sampeImage,
    },
  ]);

  return (
    <section className="container-lg min-h-screen mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar */}
        <div className="w-full md:w-[27%] text-white">
          <Notification
            type="join"
            username="Padel Cihuy"
            message="just joined Racket Network"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 md:p-4 max-w-full">
          <div className="mb-4">
            <p className="font-semibold mt-1">
              {/* <Notification
                type="match-created"
                clubName="Green Club"
                message="created a new match"
              /> */}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {matches.map((match) => (
              <HomeCard key={match.id} {...match} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
