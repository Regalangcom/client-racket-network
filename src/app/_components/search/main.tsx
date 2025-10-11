// Main Search Form Component
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import FilterOptions from "./search";
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
        <div className="absolute top-full right-0 mt-2 w-64 bg-gray-100 rounded-lg shadow-lg z-10 p-4">
          <FilterOptions />
        </div>
      )}
    </section>
  );
};

export default SearchForm;
