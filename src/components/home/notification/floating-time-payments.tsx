// components/home/floating-countdown.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FloatingCountdownProps {
  targetTime: string | number;
  message: string;
  paymentUrl: string;
  onComplete?: () => void;
  onClose?: () => void;
  id: string;
  className?: string;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  style?: React.CSSProperties;
}

interface TimeRemaining {
  minutes: string;
  seconds: string;
  isExpired: boolean;
  percentage: number;
}

const FloatingCountdown: React.FC<FloatingCountdownProps> = ({
  targetTime,
  message,
  paymentUrl,
  onComplete,
  onClose,
  id,
  className = "",
  position = "bottom-right",
  style,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    minutes: "00",
    seconds: "00",
    isExpired: false,
    percentage: 100,
  });
  const [isVisible, setIsVisible] = useState(true);
  const totalDurationRef = useRef<number>(0);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    // Calculate initial total duration
    const target =
      typeof targetTime === "string"
        ? new Date(targetTime).getTime()
        : targetTime;
    const now = Date.now();
    const initialDuration = target - now;
    totalDurationRef.current = initialDuration;

    const calculateTimeRemaining = (): TimeRemaining => {
      const target =
        typeof targetTime === "string"
          ? new Date(targetTime).getTime()
          : targetTime;

      const now = Date.now();
      const difference = target - now;

      if (difference <= 0) {
        return {
          minutes: "00",
          seconds: "00",
          isExpired: true,
          percentage: 0,
        };
      }

      const totalMinutes = Math.floor(difference / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      const percentage =
        totalDurationRef.current > 0
          ? (difference / totalDurationRef.current) * 100
          : 0;

      return {
        minutes: totalMinutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
        isExpired: false,
        percentage: Math.max(0, Math.min(100, percentage)),
      };
    };

    setTimeRemaining(calculateTimeRemaining());

    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      if (remaining.isExpired && !hasCompletedRef.current) {
        hasCompletedRef.current = true;
        if (onComplete) {
          onComplete();
        }
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime, onComplete]);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const positionClasses = {
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
  };

  if (!isVisible || timeRemaining.isExpired) {
    return null;
  }

  const getProgressClassName = () => {
    if (timeRemaining.percentage > 50) return "[&>div]:bg-green-500";
    if (timeRemaining.percentage > 25) return "[&>div]:bg-orange-500";
    return "[&>div]:bg-red-500";
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} z-[9999] ${className}`}
      data-countdown-id={id}
      style={{ ...style, animation: "slideUp 0.3s ease-out" }}
    >
      <Link href={paymentUrl} className="relative block">
        {/* Close Button - Positioned keluar dari card di atas kanan */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="absolute -top-3 -right-1 h-7 w-7 rounded-full bg-white hover:bg-gray-100 border border-gray-300 shadow-md flex-shrink-0 p-0 z-20"
        >
          <X size={18} strokeWidth={2.5} className="text-gray-800" />
        </Button>

        <Card className="w-[340px] bg-gradient-to-r from-lime-200 via-yellow-200 to-lime-200 h-14 border border-lime-300 hover:shadow-2xl hover:scale-[1.02] min-w-[429px] transition-all cursor-pointer overflow-hidden p-0 relative">
          {/* Content */}
          <div className="px-4 pt-3 pb-2 flex items-center justify-between gap-3">
            {/* Message */}
            <p className="text-sm font-semibold text-gray-900">{message}</p>

            {/* Countdown Timer */}
            <span className="text-base font-bold text-gray-900 font-mono tracking-wide">
              {timeRemaining.minutes}:{timeRemaining.seconds}
            </span>
          </div>

          <div className="  mx-4  ">
            {/* Message */}
            <Progress
              value={timeRemaining.percentage}
              className={`h-1 rounded-none ${getProgressClassName()}`}
            />
          </div>
          {/* Progress Bar di Bottom - Full Width */}
        </Card>
      </Link>
    </div>
  );
};

export default FloatingCountdown;
