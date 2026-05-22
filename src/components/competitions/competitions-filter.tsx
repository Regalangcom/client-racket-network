"use client";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  tenis,
  padel,
  badmindton,
  tenisActive,
  badmindtonActive,
  padelActive,
} from "@/public";
import { SPORT_OPTIONS } from "@/constant/club-tags";
import Image from "next/image";

const CompetitionFilter: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeFilter = searchParams.get("sport_category") || "";

  const iconMap: Record<string, { icon: any; activeIcon: any }> = {
    Tennis: { icon: tenis, activeIcon: tenisActive },
    Padel: { icon: padel, activeIcon: padelActive },
    PingPong: { icon: padel, activeIcon: padelActive },
    Badminton: { icon: badmindton, activeIcon: badmindtonActive },
  };

  const filters = SPORT_OPTIONS.map((sport) => ({
    name: sport.label,
    ...iconMap[sport.value],
  }));

  const handleFilterClick = (filterName: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (activeFilter.toLowerCase() === filterName.toLowerCase()) {
      params.delete("sport_category");
    } else {
      params.set("sport_category", filterName);
    }

    // Navigate with updated params
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {filters.map(({ name, icon, activeIcon }) => (
        <button
          key={name}
          onClick={() => handleFilterClick(name)}
          className={`flex items-center gap-2 px-3  rounded-full border ${
            activeFilter === name
              ? "bg-[#B5D9D2] border-green-900 text-green-900 font-semibold"
              : "bg-gray-100 border-gray-300 text-gray-700"
          }`}
        >
          <Image
            src={
              activeFilter.toLowerCase() === name.toLowerCase()
                ? activeIcon
                : icon
            }
            alt={name}
            className="w-5 h-5"
            priority
          />
          <span className="font-semibold">{name}</span>
        </button>
      ))}
    </div>
  );
};

export default CompetitionFilter;
