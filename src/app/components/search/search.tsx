// /app/components/search.tsx
"use client";

import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import FilterSection, { FilterOption } from "./filterSection";
import { cn } from "@/lib/utils";

// Separate component for filter options
const FilterOptions = ({ onClose }: { onClose: () => void }) => {
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);

  const sportOptions: FilterOption[] = [
    { value: "padel", label: "Padel" },
    { value: "tennis", label: "Tennis" },
    { value: "badminton", label: "Badminton" },
    { value: "pingpong", label: "Pingpong" },
  ];

  const paymentOptions: FilterOption[] = [
    { value: "tunai", label: "Tunai" },
    { value: "online", label: "Online" },
    { value: "gratis", label: "Gratis" },
  ];

  const genderOptions: FilterOption[] = [
    { value: "laki-laki", label: "Laki-laki" },
    { value: "perempuan", label: "Perempuan" },
  ];

  const locationOptions: FilterOption[] = [
    { value: "dki-jakarta", label: "DKI Jakarta" },
    { value: "bandung", label: "Bandung" },
    { value: "semarang", label: "Semarang" },
    { value: "bali", label: "Bali" },
    { value: "medan", label: "Medan" },
  ];

  const handleApplyFilter = () => {
    // Implement filter logic here
    console.log("Applied Filters:", {
      sports: selectedSports,
      payment: selectedPayment,
      gender: selectedGender,
      location: selectedLocation,
    });
  };

  return (
    <div className="mb-4 max-w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[21px] text-black font-bold">Filter</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <div className="space-y-7">
        <div className="">
          <p className="text-black font-bold mb-3">sports</p>
          <FilterSection
            label="Sports"
            options={sportOptions}
            selectedValues={selectedSports}
            onSelectionChange={setSelectedSports}
          />
        </div>
        <div className="">
          <h3 className="text-black font-bold mb-3">sports</h3>
          <FilterSection
            label="Pembayaran"
            options={paymentOptions}
            selectedValues={selectedPayment}
            onSelectionChange={setSelectedPayment}
          />
        </div>
        <div className="">
          <h3 className="text-black font-bold mb-3">sports</h3>
          <FilterSection
            label="Gender"
            options={genderOptions}
            selectedValues={selectedGender}
            onSelectionChange={setSelectedGender}
          />
        </div>
        <div className="">
          <h3 className="text-black font-bold mb-3">sports</h3>
          <FilterSection
            label="Lokasi"
            options={locationOptions}
            selectedValues={selectedLocation}
            onSelectionChange={setSelectedLocation}
          />
        </div>
      </div>

      <button
        className="w-full bg-background-button-rc text-white py-2 rounded-lg mt-10"
        onClick={handleApplyFilter}
      >
        Apply
      </button>
    </div>
  );
};

// Main Search Form Component
const SearchForm: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <section className="max-w-full sm:max-w-[70%] pl-9 mx-10 h-32 flex flex-col bg-background-card py-8 px-8 rounded-xl transition-all relative">
      <p className="text-black font-bold mb-4">Search match</p>

      <div className="relative flex items-center space-x-2">
        <div className="flex-grow relative">
          <Input
            className="border-2 w-full bg-white shadow pr-10"
            placeholder="Search"
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
            onClick={() => {
              /* Search functionality */
            }}
          >
            <Search size={13} className="text-black" />
          </button>
        </div>

        <button
          type="button"
          className="bg-white border rounded-md p-2"
          onClick={togglePopup}
        >
          <Filter size={13} className="text-black" />
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
              "fixed bottom-0 left-0 right-0 z-50", // Posisi di bawah layar
              "transition-all duration-300 ease-in-out",
              "transform origin-bottom",
              // Animasi masuk dari bawah
              "animate-slide-up-popup"
            )}
          >
            <div
              className={cn(
                "bg-white rounded-t-2xl shadow-2xl", // Rounded top corners
                "md:max-w-6xl w-[440px] mx-auto p-6",
                "md:h-[60vh] sm:h-[80vh] overflow-y-auto"
              )}
              // max-h-[80vh]
            >
              <FilterOptions onClose={togglePopup} />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default SearchForm;
