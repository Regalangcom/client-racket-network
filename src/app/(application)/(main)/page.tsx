// app/(application)/(main)/page.tsx
"use client";
import { useState, useEffect } from "react";
import { Match } from "@/constant/types/match";
import { sampeImage } from "@/public";
import Notification from "@/components/home/notification/notification";
import HomeCard from "@/components/home/card-home";
import FloatingCountdown from "@/components/home/notification/floating-time-payments";
import { useCountdowns } from "@/hooks/use-countdown";

export default function Home() {
  const { countdowns, addCountdown, removeCountdown } = useCountdowns();

  // Dummy data dengan pending payment
  const [matches] = useState<Match[]>([
    {
      id: "1",
      clubName: "Supreme TC",
      title: "Tennis Thursday Night",
      date: "30 April, 18:00 - 21:00",
      location: "Smes Sport Bintaro",
      status: "ongoing",
      imageUrl: sampeImage,
    },
    {
      id: "2",
      clubName: "Green Club",
      title: "Tennis Thursday Night",
      date: "30 April, 18:00 - 21:00",
      location: "Smes Sport Bintaro",
      status: "waiting_payment",
      imageUrl: sampeImage,
      paymentDeadline: Date.now() + 55 * 60 * 1000, // 55 menit dari sekarang
      paymentUrl: "/match/2/payment", // URL untuk lanjut pembayaran
    },
  ]);

  // Initialize countdowns untuk pending payments
  useEffect(() => {
    matches.forEach((match) => {
      if (
        match.status === "waiting_payment" &&
        match.paymentDeadline &&
        match.paymentUrl
      ) {
        addCountdown(
          match.id,
          match.paymentDeadline,
          "Waiting for payment",
          match.paymentUrl
        );
      }
    });
  }, [addCountdown, matches]);

  const handleCountdownComplete = (matchId: string) => {
    console.log(`Payment expired for match: ${matchId}`);
    removeCountdown(matchId);

    // Optional: Panggil API untuk update status payment expired
    // await fetch(`/api/matches/${matchId}/payment-expired`, { method: 'POST' });
  };

  const handleCountdownClose = (matchId: string) => {
    console.log(`User dismissed payment reminder for: ${matchId}`);
    removeCountdown(matchId);

    // Optional: Save ke localStorage bahwa user sudah dismiss
    // localStorage.setItem(`payment-reminder-dismissed-${matchId}`, 'true');
  };

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {matches.map((match) => (
              <HomeCard key={match.id} {...match} />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Payment Reminders - pojok kanan bawah */}
      {countdowns.map((countdown, index) => (
        <FloatingCountdown
          key={countdown.id}
          id={countdown.id}
          targetTime={countdown.targetTime}
          message={countdown.message}
          paymentUrl={countdown.paymentUrl}
          onComplete={() => handleCountdownComplete(countdown.id)}
          onClose={() => handleCountdownClose(countdown.id)}
          position="bottom-right"
          className={index > 0 ? "!bottom-24" : ""} // Stack multiple reminders
        />
      ))}
    </section>
  );
}
