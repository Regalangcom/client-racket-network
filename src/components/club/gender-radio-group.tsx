import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface GenderOption {
  value: "all" | "men" | "women";
  label: string;
  description: string;
}

interface GenderRadioGroupProps {
  value: "all" | "men" | "women";
  onValueChange: (value: "all" | "men" | "women") => void;
}

const GENDER_OPTIONS: GenderOption[] = [
  {
    value: "all",
    label: "All gender",
    description: "Anyone can join",
  },
  {
    value: "men",
    label: "Men only",
    description: "Only men can join",
  },
  {
    value: "women",
    label: "Women only",
    description: "Only women can join",
  },
];

export const GenderRadioGroup: React.FC<GenderRadioGroupProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <RadioGroup value={value} onValueChange={onValueChange}>
      {GENDER_OPTIONS.map((option) => (
        <div key={option.value} className="flex items-start space-x-2">
          <RadioGroupItem
            value={option.value}
            id={`${option.value}-gender`}
            className="mt-1"
          />
          <div>
            <Label
              htmlFor={`${option.value}-gender`}
              className="font-semibold cursor-pointer"
            >
              {option.label}
            </Label>
            <p className="text-xs text-gray-500">{option.description}</p>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};
