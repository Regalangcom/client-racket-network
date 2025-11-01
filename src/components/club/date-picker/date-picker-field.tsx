// components/club/joined/date-picker/date-picker-field.tsx
import React from "react";
import { FormField, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Control } from "react-hook-form";
import { SingleDatePicker } from "./single-date-picker";
import { RangeDatePicker } from "./range-date-picker";
import { useDatePicker, DateMode } from "@/hooks/use-date-picker";

// Generic interface - works with any form that has date/dateRange fields
interface DatePickerFieldProps {
  form: {
    control: Control<any>;
    resetField: (...args: any[]) => void; // Accept any resetField signature
  };
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({ form }) => {
  const { isOpen, mode, togglePicker, closePicker, switchMode } =
    useDatePicker();

  const handleModeChange = (newMode: DateMode) => {
    switchMode(newMode);
    form.resetField("date");
    form.resetField("dateRange");
  };

  return (
    <div className="space-y-3">
      <FormLabel className="text-sm font-normal text-gray-700">Date</FormLabel>

      {/* Radio Group */}
      <RadioGroup
        value={mode}
        onValueChange={handleModeChange}
        className="flex gap-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="single" id="single" />
          <Label
            htmlFor="single"
            className="cursor-pointer font-normal text-sm"
          >
            One day
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="range" id="range" />
          <Label htmlFor="range" className="cursor-pointer font-normal text-sm">
            Long Day
          </Label>
        </div>
      </RadioGroup>

      {/* Date Picker */}
      {mode === "single" ? (
        <FormField
          key="single-date"
          control={form.control}
          name="date"
          render={({ field }) => (
            <SingleDatePicker
              field={field}
              isOpen={isOpen}
              onOpenChange={togglePicker}
            />
          )}
        />
      ) : (
        <FormField
          key="range-date"
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <RangeDatePicker
              field={field}
              isOpen={isOpen}
              onOpenChange={togglePicker}
            />
          )}
        />
      )}
    </div>
  );
};
