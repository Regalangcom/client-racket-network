```
// /app/components/search.tsx
"use client";

import React, { useState } from "react";
import FilterSection, { FilterOption } from "./filterSection";

// Separate component for filter options
const FilterOptions = () => {
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
    <div className="mb-4">
      <h3 className="text-lg font-bold mb-2">Filter</h3>

      <div className="space-y-3">
        <FilterSection
          label="Sports"
          options={sportOptions}
          selectedValues={selectedSports}
          onSelectionChange={setSelectedSports}
        />
        <FilterSection
          label="Pembayaran"
          options={paymentOptions}
          selectedValues={selectedPayment}
          onSelectionChange={setSelectedPayment}
        />
        <FilterSection
          label="Gender"
          options={genderOptions}
          selectedValues={selectedGender}
          onSelectionChange={setSelectedGender}
        />
        <FilterSection
          label="Lokasi"
          options={locationOptions}
          selectedValues={selectedLocation}
          onSelectionChange={setSelectedLocation}
        />
      </div>

      <button
        className="w-full bg-green-700 text-white py-2 rounded-lg mt-4"
        onClick={handleApplyFilter}
      >
        Apply
      </button>
    </div>
  );
};

export default FilterOptions;


```
