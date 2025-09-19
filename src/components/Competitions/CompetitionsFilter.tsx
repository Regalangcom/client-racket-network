// components/Competitions/compFilter.tsx
"use client";

import React, { useState } from "react";
import {
  tenis,
  padel,
  badmindton,
  tenisActive,
  badmindtonActive,
  padelActive,
} from "@/public";
import Image from "next/image";

const CompetitionFilter: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("Tennis");
  const filters = [
    { name: "Tennis", icon: tenis, activeIcon: tenisActive },
    { name: "Padel", icon: padel, activeIcon: padelActive },
    { name: "Badminton", icon: badmindton, activeIcon: badmindtonActive },
  ];

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {filters.map(({ name, icon, activeIcon }) => (
        <button
          key={name}
          onClick={() => setActiveFilter(name)}
          className={`flex items-center gap-2 px-3  rounded-full border ${
            activeFilter === name
              ? "bg-[#B5D9D2] border-green-900 text-green-900 font-semibold"
              : "bg-gray-100 border-gray-300 text-gray-700"
          }`}
        >
          <Image
            src={activeFilter === name ? activeIcon : icon}
            alt={name}
            className=""
            priority
          />
          <span className="font-semibold">{name}</span>
        </button>
      ))}
    </div>
  );
};

export default CompetitionFilter;
