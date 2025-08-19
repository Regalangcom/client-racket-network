// components/Competitions/compFilter.tsx
"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";

const CompetitionFilter: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("Tennis");

  const filters = ["Tennis", "Padel", "Badminton"];

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`flex items-center gap-2 px-4  rounded-full border ${
            activeFilter === filter
              ? "bg-[#B5D9D2] border-green-900 text-green-900 font-semibold"
              : "bg-gray-100 border-gray-300 text-gray-700"
          }`}
        >
          <Menu size={16} />
          <span>{filter}</span>
        </button>
      ))}
    </div>
  );
};

export default CompetitionFilter;
