// "use client";

// import React, { useState } from "react";
// import { Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import { filter } from "@/public";
// import FilterOptions from "./filter-options";

// const SearchForm: React.FC = () => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const togglePopup = () => setIsPopupOpen(!isPopupOpen);

//   const handleApply = (filters: {
//     sports: string[];
//     payment: string[];
//     gender: string[];
//     location: string[];
//   }) => {
//     console.log("Applied Filters:", filters);
//   };

//   return (
//     <section className="max-w-full mt-3 md:max-w-[85%] md:right-2 md:ml-3 ml-0 h-32 flex flex-col bg-background-card py-6 px-8 rounded-xl transition-all relative">
//       <p className="text-black font-bold mb-4">Search </p>
//       <div className="relative flex items-center space-x-1">
//         <div className="flex-grow relative">
//           <Input
//             className="border-1 w-full bg-white pr-10"
//             placeholder="Search"
//           />
//           <button
//             type="button"
//             className="absolute top-1/2 right-3 transform -translate-y-1/2"
//           >
//             <Search size={13} className="text-black" />
//           </button>
//         </div>
//         <button
//           type="button"
//           className="bg-white border rounded-md p-2 w-12"
//           onClick={togglePopup}
//         >
//           <Image
//             src={filter}
//             width={18}
//             height={18}
//             alt="filter"
//             className="mx-auto"
//             priority
//           />
//         </button>
//       </div>

//       {isPopupOpen && (
//         <>
//           {/* Overlay */}
//           <div
//             className="fixed inset-0 bg-black/30 z-40"
//             onClick={togglePopup}
//           />

//           {/* Popup Container */}
//           <div
//             className={cn(
//               "fixed bottom-0 left-0 right-0 z-50",
//               "transition-all duration-300 ease-in-out",
//               "transform origin-bottom",
//               "animate-slide-up-popup"
//             )}
//           >
//             <div
//               className={cn(
//                 "bg-white rounded-t-2xl shadow-2xl",
//                 "md:max-w-6xl max-w-md mx-4 p-5",
//                 "md:h-[60vh] sm:h-[50vh] overflow-y-auto"
//               )}
//             >
//               <FilterOptions onClose={togglePopup} onApply={handleApply} />
//             </div>
//           </div>
//         </>
//       )}
//     </section>
//   );
// };

// export default SearchForm;

// app/_components/search/search-client.tsx
"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { filter } from "@/public";
import FilterOptions from "./filter-options";
import { useRouter, usePathname } from "next/navigation";

interface SearchFormProps {
  initialSport?: string;
  initialLocation?: string;
  initialGender?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({
  initialSport,
  initialLocation,
  initialGender,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  // Convert API values to UI values
  const getInitialValues = () => {
    // Map API values to UI values
    const sportsMap: Record<string, string> = {
      Padel: "padel",
      Badminton: "badminton",
      padel: "padel",
    };

    const genderMap: Record<string, string> = {
      "All gender": "all-gender",
      Perempuan: "women",
      "Laki-laki": "men",
    };

    return {
      sports: initialSport
        ? [sportsMap[initialSport] || initialSport.toLowerCase()]
        : [],
      location: initialLocation ? [initialLocation.toLowerCase()] : [],
      gender: initialGender
        ? [genderMap[initialGender] || initialGender.toLowerCase()]
        : [],
      payment: [], // Tidak digunakan dalam API
    };
  };

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleApply = (filters: {
    sports: string[];
    payment: string[];
    gender: string[];
    location: string[];
  }) => {
    // Build URL with query params
    const params = new URLSearchParams();

    if (filters.sports.length > 0) {
      const sportValue =
        filters.sports[0].charAt(0).toUpperCase() + filters.sports[0].slice(1);
      params.set("sport_category", sportValue);
    }

    if (filters.location.length > 0) {
      params.set("location", filters.location[0]);
    }

    // PERBAIKAN: Gunakan nilai API langsung
    if (filters.gender.length > 0) {
      // Nilai 'value' di option sudah merupakan nilai API, jadi gunakan langsung
      params.set("gender_rule", filters.gender[0]);
      console.log("Setting gender filter param:", filters.gender[0]);
    }

    // Navigate with the filters applied
    router.push(`${pathname}?${params.toString()}`);

    setIsPopupOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality if needed
    console.log("Search for:", searchTerm);
  };

  return (
    <section className="max-w-full mt-3 md:max-w-[85%] md:right-2 md:ml-3 ml-0 h-32 flex flex-col bg-background-card py-6 px-8 rounded-xl transition-all relative">
      <p className="text-black font-bold mb-4">Search match</p>
      <div className="relative flex items-center space-x-1">
        <form onSubmit={handleSearch} className="flex-grow relative">
          <Input
            className="border-1 w-full bg-white pr-10"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
          >
            <Search size={13} className="text-black" />
          </button>
        </form>
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
              <FilterOptions
                initialValues={getInitialValues()}
                onClose={togglePopup}
                onApply={handleApply}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default SearchForm;
