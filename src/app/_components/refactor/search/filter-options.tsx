"use client";

import React, { useState } from "react";
import FilterSection, { FilterOption } from "./filter-select";

interface FilterOptionsProps {
  onClose: () => void;
  onApply: (filters: {
    skill_level: string[];
    payment: string[];
    gender: string[];
    location: string[];
  }) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ onClose, onApply }) => {
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);

  const skillLevelOptions: FilterOption[] = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
  ];

  const paymentOptions: FilterOption[] = [
    { value: "tunai", label: "Tunai" },
    { value: "online", label: "Online" },
    { value: "gratis", label: "Gratis" },
  ];

  const genderOptions: FilterOption[] = [
    { value: "Men Only", label: "Men Only" },
    { value: "All Gender", label: "All Gender" },
    // { value: "women", label: "Perempuan" },
    { value: "Woman only", label: "Woman only" },
  ];

  const locationOptions: FilterOption[] = [
    { value: "Jakarta", label: "DKI Jakarta" },
    { value: "Bandung", label: "Bandung" },
    { value: "Semarang", label: "Semarang" },
    { value: "Bali", label: "Bali" },
    { value: "Medan", label: "Medan" },
  ];

  const handleApplyFilter = () => {
    onApply({
      skill_level: selectedSkillLevel,
      payment: selectedPayment,
      gender: selectedGender,
      location: selectedLocation,
    });
    onClose();
  };

  return (
    <div className="mb-4 max-w-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-[21px] text-black font-bold">Filter</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <p className="text-black text-base font-bold mb-1">Skill Level</p>
          <FilterSection
            label="Skill Level"
            options={skillLevelOptions}
            selectedValues={selectedSkillLevel}
            onSelectionChange={setSelectedSkillLevel}
          />
        </div>
        <div>
          <p className="text-black text-base font-semibold mb-1">Pembayaran</p>
          <FilterSection
            label="Pembayaran"
            options={paymentOptions}
            selectedValues={selectedPayment}
            onSelectionChange={setSelectedPayment}
          />
        </div>
        <div>
          <p className="text-black text-base font-semibold mb-1">Gender</p>
          <FilterSection
            label="Gender"
            options={genderOptions}
            selectedValues={selectedGender}
            onSelectionChange={setSelectedGender}
          />
        </div>
        <div>
          <p className="text-black text-base font-semibold mb-1">Lokasi</p>
          <FilterSection
            label="Lokasi"
            options={locationOptions}
            selectedValues={selectedLocation}
            onSelectionChange={setSelectedLocation}
          />
        </div>
      </div>

      <button
        className="w-full bg-background-button-rc text-[#E1FFA0] py-2 rounded-lg mt-10"
        onClick={handleApplyFilter}
      >
        Apply
      </button>
    </div>
  );
};

export default FilterOptions;
