"use client";
import { useEffect, useState } from "react";

interface ExpireTimerProps {
  expiresAt: string;
  onExpire: () => void;
}

export default function ExpireTimer({ expiresAt, onExpire }: ExpireTimerProps) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiresAt) return;

    const target = new Date(expiresAt).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        clearInterval(interval);
        onExpire();
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const format = [
        hours.toString().padStart(2, "0"),
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0"),
      ].join(":");

      setTimeLeft(format);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  return (
    <div className="w-full flex justify-start gap-3">
      <span className="text-sm">Selesaikan dalam:</span>
      <p
        className="text-red-700 font-bold text-sm text-center"
        style={{ width: "80px" }}
      >
        {timeLeft}
      </p>
    </div>
  );
}
