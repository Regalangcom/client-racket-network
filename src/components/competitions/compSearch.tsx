"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const CompetitionsSearch: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="max-w-full mt-3 md:max-w-[85%] md:right-2 md:ml-3 ml-0 sm:mx-5 h-32 flex flex-col bg-background-card py-8 px-8 rounded-xl transition-all relative">
      <p className="text-black font-bold mb-4">Search Competitions</p>
      <div className="relative">
        <Input
          className="border-1 w-full bg-white pr-10 text-black"
          placeholder="Search by name, organizer, or location"
          value={searchValue}
          onChange={handleSearch}
        />
        <button
          type="button"
          className="absolute top-1/2 right-3 transform -translate-y-1/2"
        >
          <Search size={13} className="text-black" />
        </button>
      </div>
    </section>
  );
};

export default CompetitionsSearch;
