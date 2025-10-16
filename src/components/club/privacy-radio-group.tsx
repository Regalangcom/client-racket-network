import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PrivacyOption {
  value: "public" | "private";
  label: string;
  description: string;
}

interface PrivacyRadioGroupProps {
  value: "public" | "private";
  onValueChange: (value: "public" | "private") => void;
}

const PRIVACY_OPTIONS: PrivacyOption[] = [
  {
    value: "public",
    label: "Public",
    description: "Anyone can join",
  },
  {
    value: "private",
    label: "Private",
    description: "People must request permission to join",
  },
];

export const PrivacyRadioGroup: React.FC<PrivacyRadioGroupProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <RadioGroup value={value} onValueChange={onValueChange}>
      {PRIVACY_OPTIONS.map((option) => (
        <div key={option.value} className="flex items-start space-x-2">
          <RadioGroupItem
            value={option.value}
            id={option.value}
            className="mt-1"
          />
          <div>
            <Label
              htmlFor={option.value}
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
