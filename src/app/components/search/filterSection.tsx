import React from "react";

export interface FilterOption {
  value: string;
  label?: string;
}

interface FilterSectionProps {
  label: string;
  options: FilterOption[];
  type?: "button" | "checkbox" | "radio";
  selectedValues?: string[];
  onSelectionChange?: (selected: string[]) => void;
  className?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  label,
  options,
  type = "button",
  selectedValues = [],
  onSelectionChange,
  className = "",
}) => {
  const handleOptionSelect = (optionValue: string) => {
    let newSelectedValues: string[];

    if (type === "radio") {
      newSelectedValues = [optionValue];
    } else {
      newSelectedValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((val) => val !== optionValue)
        : [...selectedValues, optionValue];
    }

    onSelectionChange?.(newSelectedValues);
  };

  const renderOptions = () => {
    return options.map((option) => (
      <button
        key={option.value}
        className={`
          px-2 py-1 
          ${
            selectedValues.includes(option.value)
              ? "bg-green-500 text-white"
              : "bg-white text-black"
          }
          rounded-md text-xs mb-1 mr-1
        `}
        onClick={() => handleOptionSelect(option.value)}
      >
        {option.label || option.value}
      </button>
    ));
  };

  return (
    <div className={`mb-3 ${className}`}>
      {/* <label className="block font-bold">{label}</label> */}
      <div className="flex space-x-2 flex-wrap">{renderOptions()}</div>
    </div>
  );
};

export default FilterSection;
