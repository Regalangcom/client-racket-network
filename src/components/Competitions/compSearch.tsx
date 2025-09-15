"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
const CompetitionsSearch: React.FC = () => {
  return (
    <>
      <section className="max-w-full mt-3 md:max-w-[85%] md:right-2 md:ml-3 ml-0 sm:mx-5 h-32 flex flex-col bg-background-card py-8 px-8 rounded-xl transition-all relative">
        {/* <section className="max-w-full sm:max-w-[70%] pl-9  mx-10 h-32 flex flex-col  bg-background-card py-8 px-8 rounded-xl transition-all"> */}
        <p className="text-black font-bold mb-4">Search Competitions</p>
        <div className="relative">
          <Input
            className="border-2 w-full bg-white shadow pr-10"
            placeholder="Search"
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
          >
            <Search size={13} className="text-black" />
          </button>
        </div>
      </section>
    </>
  );
};

// // Reusable SearchProps Component
// interface NavItemProps {
//   label: string;
//   active: boolean;
//   onMouseEnter: () => void;
//   onMouseLeave: () => void;
//   button?: boolean; // Optional, to handle the 'Log in' button separately
// }

// const SearchProps: React.FC<NavItemProps> = ({
//   label,
//   active,
//   onMouseEnter,
//   onMouseLeave,
//   button = false,
// }) => {
//   return (
//     <div
//       className={`${
//         active ? "text-green-rc " : "text-gray-800"
//       } py-2 px-3 rounded-md cursor-pointer transition-all duration-300 ease-in-out`}
//       onMouseEnter={onMouseEnter}
//       onMouseLeave={onMouseLeave}
//     >
//       {button ? (
//         <button className="py-2 px-6 bg-background-button-rc text-white rounded-md  transition-all">
//           {label}
//         </button>
//       ) : (
//         <span className="text-base">{label}</span>
//       )}
//     </div>
//   );
// };

export default CompetitionsSearch;
