"use client";

import React, { useState, Suspense } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { filter } from "@/public";
import FilterOptions from "./filter-options";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SearchInner = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? ""
  );

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleSearch = () => {
    // console.log("Search value");
    const params = new URLSearchParams(searchParams.toString());
    if (searchValue.trim()) {
      params.set("search", searchValue.trim());
    } else {
      params.delete("search");
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const handleApply = (filters: {
    skill_level: string[];
    payment: string[];
    gender: string[];
    location: string[];
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("gender_restriction");
    params.delete("location");
    params.delete("skill_level");

    if (filters.gender.length > 0) {
      params.set("gender_restriction", filters.gender[0]);
    }
    if (filters.location.length > 0) {
      params.set("location", filters.location[0]);
    }
    if (filters.skill_level.length > 0) {
      params.set("skill_level", filters.skill_level[0]);
    }
    if (searchValue.trim()) {
      params.set("search", searchValue.trim());
    }

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <section className="max-w-full mt-3 md:max-w-[85%] md:right-2 md:ml-3 ml-0 h-32 flex flex-col bg-background-card py-6 px-8 rounded-xl transition-all relative">
      <p className="text-black font-bold mb-4">Search match</p>
      <div className="relative flex items-center space-x-1">
        <div className="flex-grow relative">
          <Input
            className="border-1 w-full text-black bg-white pr-10"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}  
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
            onClick={handleSearch}
          >
            <SearchIcon size={13} className="text-black" />
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
          <div className="fixed inset-0 bg-black/30 z-40" onClick={togglePopup} />

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

const Search = () => (
  <Suspense fallback={null}>
    <SearchInner />
  </Suspense>
);

export default Search;
