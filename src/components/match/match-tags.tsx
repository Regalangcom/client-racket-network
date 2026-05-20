import Image, { StaticImageData } from "next/image";
import React from "react";
import TimeSelector from "./time-selector";
import { DetailItem } from "@/constant/types";
import { TimeSlot } from "@/constant/types";
import { MatchCardProps } from "./match";
import { calender, maps } from "@/public";

interface MatchTagProps {
  icon: StaticImageData;
  label: string;
  hasTimeSelector?: boolean;
  TimeSlot?: TimeSlot[];
  selectedTimeSlotId?: number | null;
  onTimeSelect?: (slotId: number) => void;
}

export const MatchTag: React.FC<MatchTagProps> = ({
  icon,
  label,
  hasTimeSelector,
  TimeSlot,
  selectedTimeSlotId,
  onTimeSelect,
}) => (
  <React.Fragment>
    <div className="flex items-center gap-3 rounded-3xl mb-5">
      <Image src={icon} alt="icon" width={14} height={15} className="w-4 h-5" />
      <span className="text-gray-700">{label}</span>
    </div>

    {hasTimeSelector && TimeSlot && TimeSlot.length > 0 && onTimeSelect && (
      <>
        <p className="text-xl font-semibold mt-2">Select your time</p>
        <div className="flex items-center gap-3 text-gray-600 mb-2">
          <TimeSelector
            TimeSlot={TimeSlot}
            selectedTimeSlotId={selectedTimeSlotId}
            onTimeSelect={onTimeSelect}
          />
        </div>
      </>
    )}
  </React.Fragment>
);
export const MatchIconRegisters: React.FC<DetailItem> = ({ icon, label }) => (
  <React.Fragment>
    <div className="flex items-center gap-4 text-black">
      <Image
        src={icon}
        alt={label}
        width={14}
        height={15}
        className="w-4 h-4"
      />
      <p className="text-md font-bold">{label}</p>
    </div>
  </React.Fragment>
);



export const MatchViewDisplay: React.FC<MatchCardProps> = ({ match }) => {
  // const TimeSlot = match.TimeSlot || [];

  const firstTimeSlot =
    match.TimeSlot && match.TimeSlot.length > 0 ? match.TimeSlot[0] : null;

  console.log("firtTimeSlot", firstTimeSlot);

  const displayTimeSlot = firstTimeSlot
    ? `${firstTimeSlot.start_time} - ${firstTimeSlot.end_time}`
    : "Time TBA";

  return (
    <React.Fragment>
      <div className="space-y-3">
        <p className="font-bold text-base text-black">{match.name_match}</p>

        {/* Time Slots - Show All */}

        <div className="flex items-center text-sm text-gray-600 gap-2">
          <Image src={calender} alt="calender" priority />
          <span className="font-semibold">{displayTimeSlot}</span>
          {/* ✅ Show indicator if multiple slots */}
          {match.TimeSlot && match.TimeSlot.length > 1 && (
            <span className="text-xs bg-[#B5D9D2] text-black px-2 py-0.5 rounded-full">
              +{match.TimeSlot.length - 1} more
            </span>
          )}
        </div>

        <div className="flex items-center text-sm text-gray-600 gap-2">
          <Image src={maps} alt="maps" priority />
          <span className="font-semibold">{match.location}</span>
        </div>
      </div>
    </React.Fragment>
  );
};
