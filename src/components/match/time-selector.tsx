// components/time-selector.tsx
"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { TimeSlot } from "@/constant/types";

interface TimeSelectorProps {
  TimeSlot: TimeSlot[];
  selectedTimeSlotId?: number | null;
  onTimeSelect: (slotId: number) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  TimeSlot,
  selectedTimeSlotId,
  onTimeSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {TimeSlot.map((slot) => {
        const slotId = slot.id || TimeSlot.indexOf(slot);
        const isSelected = selectedTimeSlotId === slotId;

        return (
          <button
            key={slotId}
            type="button"
            onClick={() => onTimeSelect(slotId)}
            className={cn(
              "px-4  rounded-full text-sm font-medium transition-all border-2",
              isSelected
                ? "bg-[#B5D9D2] border-[#4A918E] text-black"
                : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
            )}
          >
            {slot.start_time} - {slot.end_time}
          </button>
        );
      })}
    </div>
  );
};

export default TimeSelector;
