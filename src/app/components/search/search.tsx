"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { filter } from "@/public";
import FilterOptions from "./filter-options";

const SearchForm: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleApply = (filters: {
    sports: string[];
    payment: string[];
    gender: string[];
    location: string[];
  }) => {
    console.log("Applied Filters:", filters);
  };

  return (
    <section className="max-w-full mt-3 md:max-w-[85%] md:right-2 md:ml-3 ml-0 h-32 flex flex-col bg-background-card py-6 px-8 rounded-xl transition-all relative">
      <p className="text-black font-bold mb-4">Search match</p>
      <div className="relative flex items-center space-x-1">
        <div className="flex-grow relative">
          <Input
            className="border-1 w-full bg-white pr-10"
            placeholder="Search"
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
          >
            <Search size={13} className="text-black" />
          </button>
        </div>
        <button
          type="button"
          className="bg-white border rounded-md p-2 w-12"
          onClick={togglePopup}
        >
          <Image
            src={filter}
            width={18}
            height={18}
            alt="filter"
            className="mx-auto"
            priority
          />
        </button>
      </div>

      {isPopupOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={togglePopup}
          />

          {/* Popup Container */}
          <div
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50",
              "transition-all duration-300 ease-in-out",
              "transform origin-bottom",
              "animate-slide-up-popup"
            )}
          >
            <div
              className={cn(
                "bg-white rounded-t-2xl shadow-2xl",
                "md:max-w-6xl max-w-md mx-4 p-5",
                "md:h-[60vh] sm:h-[50vh] overflow-y-auto"
              )}
            >
              <FilterOptions onClose={togglePopup} onApply={handleApply} />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default SearchForm;
