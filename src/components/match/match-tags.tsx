// /components/CompetitionTag.tsx
import Image, { StaticImageData } from "next/image";
import React from "react";
import TimeSelector from "./time-selector";
import { DetailItem } from "@/constant/types";

import { MatchCardProps } from "./match";
import { calender, maps } from "@/public";

interface MatchTagProps {
  icon: StaticImageData;
  label: string;
  hasTimeSelector?: boolean;
  times?: string;
  selectedTime?: string;
  onTimeSelect?: (time: string) => void;
}

export const MatchTag: React.FC<MatchTagProps> = ({
  icon,
  label,
  hasTimeSelector,
  times,
  selectedTime,
  onTimeSelect,
}) => (
  <React.Fragment>
    <div className="flex items-center gap-3 rounded-3xl mb-5">
      <Image src={icon} alt="icon" width={14} height={15} className="w-4 h-5" />
      <span className="text-gray-700">{label}</span>
    </div>

    {hasTimeSelector && times && onTimeSelect && (
      <>
        <p className="text-xl font-semibold mt-2">Select your time</p>
        <div className="flex items-center gap-3 text-gray-600 mb-2">
          <TimeSelector
            match_time={times}
            selectedTime={selectedTime}
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

export const MatchViewDisplay: React.FC<MatchCardProps> = ({ match }) => (
  <React.Fragment>
    <div className="space-y-3">
      <p className="font-bold text-base text-black">{match.name_match}</p>
      <div className="flex items-center text-sm text-gray-600 gap-2">
        <Image src={calender} alt="calender" priority />
        <span className="font-semibold">{match.match_time}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600 gap-2">
        <Image src={maps} alt="maps" priority />
        <span className="font-semibold">{match.location}</span>
      </div>
    </div>
  </React.Fragment>
);
