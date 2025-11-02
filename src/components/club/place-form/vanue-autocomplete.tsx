"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { PlacesAPI } from "@/services/place-service";
import { Venue } from "@/constant/types/place";
import { Loader2, MapPin, Star } from "lucide-react";

interface VenueAutocompleteProps {
  value: string;
  onSelect: (venue: Venue) => void;
  city?: string;
  placeholder?: string;
}

export const VenueAutocomplete: React.FC<VenueAutocompleteProps> = ({
  value,
  onSelect,
  city,
  placeholder = "Search venue...",
}) => {
  const [input, setInput] = useState(value);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (input.length >= 3 && !selectedVenue) {
        setIsLoading(true);
        const results = await PlacesAPI.searchVenues(input, city);
        setVenues(results);
        setIsOpen(results.length > 0);
        setIsLoading(false);
      } else {
        setVenues([]);
        setIsOpen(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [input, city, selectedVenue]);

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
    setSelectedVenue(null);
  };

  const handleSelectVenue = (venue: Venue) => {
    setSelectedVenue(venue);
    setInput(venue.name);
    setIsOpen(false);
    onSelect(venue);
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
            if (venues.length > 0) setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full"
          disabled={!city}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          </div>
        )}
      </div>

      {/* Disabled State Helper */}
      {!city && (
        <p className="text-xs text-gray-500 mt-1">Please select a city first</p>
      )}

      {/* Dropdown */}
      {isOpen && venues.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto"
        >
          {venues.map((venue) => (
            <div
              key={venue.placeId}
              onClick={() => handleSelectVenue(venue)}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors border-b last:border-b-0"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{venue.name}</div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {venue.address}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
