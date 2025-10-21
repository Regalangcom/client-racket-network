// "use client";

// import React, { useState } from "react";
// import FilterSection, { FilterOption } from "./filter-select";

// interface FilterOptionsProps {
//   onClose: () => void;
//   onApply: (filters: {
//     sports: string[];
//     payment: string[];
//     gender: string[];
//     location: string[];
//   }) => void;
// }

// const FilterOptions: React.FC<FilterOptionsProps> = ({ onClose, onApply }) => {
//   const [selectedSports, setSelectedSports] = useState<string[]>([]);
//   const [selectedPayment, setSelectedPayment] = useState<string[]>([]);
//   const [selectedGender, setSelectedGender] = useState<string[]>([]);
//   const [selectedLocation, setSelectedLocation] = useState<string[]>([]);

//   const sportOptions: FilterOption[] = [
//     { value: "padel", label: "Padel" },
//     { value: "tennis", label: "Tennis" },
//     { value: "badminton", label: "Badminton" },
//     { value: "pingpong", label: "Pingpong" },
//   ];

//   const paymentOptions: FilterOption[] = [
//     { value: "tunai", label: "Tunai" },
//     { value: "online", label: "Online" },
//     { value: "gratis", label: "Gratis" },
//   ];

//   const genderOptions: FilterOption[] = [
//     { value: "laki-laki", label: "Laki-laki" },
//     { value: "perempuan", label: "Perempuan" },
//   ];

//   const locationOptions: FilterOption[] = [
//     { value: "dki-jakarta", label: "DKI Jakarta" },
//     { value: "bandung", label: "Bandung" },
//     { value: "semarang", label: "Semarang" },
//     { value: "bali", label: "Bali" },
//     { value: "medan", label: "Medan" },
//   ];

//   const handleApplyFilter = () => {
//     onApply({
//       sports: selectedSports,
//       payment: selectedPayment,
//       gender: selectedGender,
//       location: selectedLocation,
//     });
//     onClose();
//   };

//   return (
//     <div className="mb-4 max-w-full">
//       <div className="flex justify-between items-center mb-3">
//         <h3 className="text-[21px] text-black font-bold">Filter</h3>
//         <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//           ✕
//         </button>
//       </div>

//       <div className="space-y-5">
//         <div>
//           <p className="text-black text-base font-bold mb-1">Sports</p>
//           <FilterSection
//             label="Sports"
//             options={sportOptions}
//             selectedValues={selectedSports}
//             onSelectionChange={setSelectedSports}
//           />
//         </div>
//         <div>
//           <p className="text-black text-base font-semibold mb-1">Pembayaran</p>
//           <FilterSection
//             label="Pembayaran"
//             options={paymentOptions}
//             selectedValues={selectedPayment}
//             onSelectionChange={setSelectedPayment}
//           />
//         </div>
//         <div>
//           <p className="text-black text-base font-semibold mb-1">Gender</p>
//           <FilterSection
//             label="Gender"
//             options={genderOptions}
//             selectedValues={selectedGender}
//             onSelectionChange={setSelectedGender}
//           />
//         </div>
//         <div>
//           <p className="text-black text-base font-semibold mb-1">Lokasi</p>
//           <FilterSection
//             label="Lokasi"
//             options={locationOptions}
//             selectedValues={selectedLocation}
//             onSelectionChange={setSelectedLocation}
//           />
//         </div>
//       </div>

//       <button
//         className="w-full bg-background-button-rc text-[#E1FFA0] py-2 rounded-lg mt-10"
//         onClick={handleApplyFilter}
//       >
//         Apply
//       </button>
//     </div>
//   );
// };

// export default FilterOptions;

// app/_components/search/filter-options.tsx
"use client";

import React, { useState, useEffect } from "react";
import FilterSection, { FilterOption } from "./filter-select";

interface FilterOptionsProps {
  initialValues?: {
    sports: string[];
    payment: string[];
    gender: string[];
    location: string[];
  };
  onClose: () => void;
  onApply: (filters: {
    sports: string[];
    payment: string[];
    gender: string[];
    location: string[];
  }) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  initialValues,
  onClose,
  onApply,
}) => {
  const [selectedSports, setSelectedSports] = useState<string[]>(
    initialValues?.sports || []
  );
  const [selectedPayment, setSelectedPayment] = useState<string[]>(
    initialValues?.payment || []
  );
  const [selectedGender, setSelectedGender] = useState<string[]>(
    initialValues?.gender || []
  );
  const [selectedLocation, setSelectedLocation] = useState<string[]>(
    initialValues?.location || []
  );

  // Update state when initialValues change
  useEffect(() => {
    if (initialValues) {
      setSelectedSports(initialValues.sports || []);
      setSelectedPayment(initialValues.payment || []);
      setSelectedGender(initialValues.gender || []);
      setSelectedLocation(initialValues.location || []);
    }
  }, [initialValues]);

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
    { value: "men", label: "Laki-laki" }, // value harus sesuai dengan mapping
    { value: "women", label: "Perempuan" }, // value harus sesuai dengan mapping
  ];

  const locationOptions: FilterOption[] = [
    { value: "jakarta", label: "Jakarta" },
    { value: "jakarta-barat", label: "Jakarta Barat" },
    { value: "bandung", label: "Bandung" },
    { value: "semarang", label: "Semarang" },
    { value: "bali", label: "Bali" },
    { value: "medan", label: "Medan" },
  ];

  const handleApplyFilter = () => {
    onApply({
      sports: selectedSports,
      payment: selectedPayment,
      gender: selectedGender,
      location: selectedLocation,
    });
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
          <p className="text-black text-base font-bold mb-1">Sports</p>
          <FilterSection
            label="Sports"
            options={sportOptions}
            selectedValues={selectedSports}
            onSelectionChange={setSelectedSports}
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
