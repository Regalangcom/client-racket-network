"use client";

import { useState } from "react";

export default function TimeSelector({ times }: { times: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {times?.map((time, idx) => {
        const isActive = selected === time;
        return (
          <button
            key={idx}
            onClick={() => setSelected(time)}
            className={`px-4 py-1 font-bold rounded-lg border-2 transition 
              ${
                isActive
                  ? "bg-[#B5D9D2] border-[#4A918E] text-black"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
