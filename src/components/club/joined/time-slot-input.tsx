// components/time-slot-input.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
// import { Input } from "@/components/ui/input";
import { Clock, X, ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";

interface TimeSlot {
  start_time: string;
  end_time: string;
}

interface TimeSlotInputProps {
  value: TimeSlot[];
  onChange: (slots: TimeSlot[]) => void;
  error?: string;
}

// Predefined time options (atau bisa generate dynamic)
const TIME_OPTIONS = [
  { label: "06:00 - 07:00", start: "06:00", end: "07:00" },
  { label: "07:00 - 08:00", start: "07:00", end: "08:00" },
  { label: "08:00 - 09:00", start: "08:00", end: "09:00" },
  { label: "09:00 - 10:00", start: "09:00", end: "10:00" },
  { label: "10:00 - 11:00", start: "10:00", end: "11:00" },
  { label: "11:00 - 12:00", start: "11:00", end: "12:00" },
  { label: "12:00 - 13:00", start: "12:00", end: "13:00" },
  { label: "13:00 - 14:00", start: "13:00", end: "14:00" },
  { label: "14:00 - 15:00", start: "14:00", end: "15:00" },
  { label: "15:00 - 16:00", start: "15:00", end: "16:00" },
  { label: "16:00 - 17:00", start: "16:00", end: "17:00" },
  { label: "17:00 - 18:00", start: "17:00", end: "18:00" },
  { label: "18:00 - 19:00", start: "18:00", end: "19:00" },
  { label: "19:00 - 20:00", start: "19:00", end: "20:00" },
  { label: "20:00 - 21:00", start: "20:00", end: "21:00" },
  { label: "21:00 - 22:00", start: "21:00", end: "22:00" },
  { label: "22:00 - 23:00", start: "22:00", end: "23:00" },
];

export const TimeSlotInput: React.FC<TimeSlotInputProps> = ({
  value,
  onChange,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectTime = (start: string, end: string) => {
    // Check if already selected
    const exists = value.some(
      (slot) => slot.start_time === start && slot.end_time === end
    );

    if (exists) {
      // Remove if already exists
      const updated = value.filter(
        (slot) => !(slot.start_time === start && slot.end_time === end)
      );
      onChange(updated);
    } else {
      // Add new slot (max 5)
      if (value.length < 5) {
        onChange([...value, { start_time: start, end_time: end }]);
      }
    }
  };

  const handleRemove = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  const isSelected = (start: string, end: string) => {
    return value.some(
      (slot) => slot.start_time === start && slot.end_time === end
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Input Field with Badges */}
      <div
        className={`
          min-h-[42px] w-full rounded-md border bg-white px-3 py-2 
          cursor-pointer flex items-center gap-2 flex-wrap
          ${error ? "border-red-500" : "border-input"}
          ${isOpen ? "ring-2 ring-ring ring-offset-2" : ""}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Icon */}
        <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />

        {/* Badges or Placeholder */}
        {value.length === 0 ? (
          <span className="text-sm text-muted-foreground flex-1">
            Select time slots
          </span>
        ) : (
          <div className="flex flex-wrap gap-1.5 flex-1">
            {value.map((slot, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#174038] text-white rounded-full text-xs font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                <span>
                  {slot.start_time} - {slot.end_time}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(index);
                  }}
                  className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Chevron */}
        <ChevronDown
          className={`h-4 w-4 text-gray-500 flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-[300px] overflow-y-auto">
          <div className="p-2 space-y-1">
            {TIME_OPTIONS.map((option, index) => {
              const selected = isSelected(option.start, option.end);
              const disabled = !selected && value.length >= 5;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectTime(option.start, option.end)}
                  disabled={disabled}
                  className={`
                    w-full px-3 py-2 text-sm text-left rounded-md transition-colors
                    ${
                      selected
                        ? "bg-[#174038] text-white font-medium"
                        : "hover:bg-gray-100"
                    }
                    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {selected && <span className="text-xs">(Selected)</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {value.length >= 5 && (
            <div className="p-2 text-xs text-center text-gray-500 border-t">
              Maximum 5 time slots
            </div>
          )}
        </div>
      )}
    </div>
  );
};
