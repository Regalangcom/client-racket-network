"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { PlacesAPI } from "@/services/place-service";
// import {sea}
import { City } from "@/constant/types/place";
import { Loader2 } from "lucide-react";

interface LocationAutocompleteProps {
  value: string;
  onSelect: (city: City) => void;
  placeholder?: string;
}

export const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  value,
  onSelect,
  placeholder = "Search city...",
}) => {
  const [input, setInput] = useState(value);
  const [cities, setCities] = useState<City[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (input.length >= 2 && !selectedCity) {
        setIsLoading(true);
        const results = await PlacesAPI.searchCities(input);
        setCities(results);
        setIsOpen(results.length > 0);
        setIsLoading(false);
      } else {
        setCities([]);
        setIsOpen(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [input, selectedCity]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setSelectedCity(null);
  };

  const handleSelectCity = (city: City) => {
    setSelectedCity(city);
    setInput(city.name);
    setIsOpen(false);
    onSelect(city);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onFocus={() => {
            if (cities.length > 0) setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          </div>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && cities.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {cities.map((city) => (
            <div
              key={city.placeId}
              onClick={() => handleSelectCity(city)}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors border-b last:border-b-0"
            >
              <div className="font-medium text-gray-900">{city.name}</div>
              <div className="text-sm text-gray-600 mt-1">
                {city.fullAddress}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {isOpen && !isLoading && cities.length === 0 && input.length >= 2 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-4 text-center text-gray-500">
          No cities found
        </div>
      )}
    </div>
  );
};
