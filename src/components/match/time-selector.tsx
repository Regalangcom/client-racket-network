// components/match/time-selector.tsx

"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TimeSelectorProps {
  match_time: string;
  selectedTime?: string;
  onTimeSelect: (time: string) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  match_time,
  selectedTime,
  onTimeSelect,
}) => {
  // ✅ Parse time from API
  // Example: "19:00 - 20:00 am" or "18:00 - 19:00, 20:00 - 21:00"
  const timeSlots = match_time.includes(",")
    ? match_time.split(",").map((t) => t.trim())
    : [match_time];

  return (
    <div className="flex flex-wrap gap-2">
      {timeSlots.map((timeSlot, index) => (
        <button
          key={index}
          onClick={() => onTimeSelect(timeSlot)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all border-2",
            selectedTime === timeSlot
              ? "bg-green-600 text-white border-green-600"
              : "bg-gray-100 text-gray-700 border-transparent hover:border-green-600"
          )}
        >
          {timeSlot}
        </button>
      ))}
    </div>
  );
};

export default TimeSelector;
