"use client";
import { useEffect, useState } from "react";

export default function ExpireTimer({ expiresAt }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiresAt) {
      console.log("expiresAt kosong bro");
      return;
    }

    const target = new Date(expiresAt).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
        return;
      }

      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <>
      <div className="w-full flex justify-end mt-3">
        <p className="bg-background-button-rc text-white text-sm font-semibold px-3 py-1 rounded-full">
          Expired in: {timeLeft}
        </p>
      </div>
    </>
  );
}
