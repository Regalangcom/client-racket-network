// /components/CompetitionTag.tsx
import Image from "next/image";
import React from "react";
import TimeSelector from "./time-selector";
import { DetailItem } from "@/constant/types";

// type IconsMatchProps = {
//   icon: StaticImageData;
//   label: string | number;
//   hasTimeSelector?: boolean;
//   times?: string[];
// };

export const MatchTag: React.FC<DetailItem> = ({
  icon,
  label,
  hasTimeSelector,
  times,
}) => (
  <React.Fragment>
    <div className={`flex items-center gap-3 rounded-3xl mb-5`}>
      <Image src={icon} alt="icon" width={14} height={15} className="w-4 h-5" />
      <span>{label}</span>
    </div>

    {hasTimeSelector && times && (
      <>
        <p className="text-xl font-semibold mt-2">Select your time</p>
        <div className="flex items-center gap-3 text-gray-600 mb-2">
          <TimeSelector times={times} />
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
