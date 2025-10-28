// components/club/joined/date-picker/single-date-picker.tsx
import React from "react";
import { format } from "date-fns";
import { Calendar1Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";

interface SingleDatePickerProps {
  field: ControllerRenderProps<any, "date">;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SingleDatePicker: React.FC<SingleDatePickerProps> = ({
  field,
  isOpen,
  onOpenChange,
}) => {
  const safeValue = typeof field.value === "string" ? field.value : "";
  const hasValue = safeValue && safeValue !== "";

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      field.onChange(format(date, "yyyy-MM-dd"));
      onOpenChange(false);
    }
  };

  return (
    <FormItem className="relative">
      <FormControl>
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(!isOpen)}
          className={cn(
            "w-full justify-start text-left font-normal",
            !hasValue && "text-muted-foreground"
          )}
        >
          <Calendar1Icon className="mr-2 h-4 w-4" />
          {hasValue ? (
            format(new Date(safeValue), "EEEE, MMMM dd, yyyy")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </FormControl>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => onOpenChange(false)}
          />

          <div className="absolute top-full left-0 mt-2 z-50 border rounded-md bg-white shadow-lg">
            <Calendar
              mode="single"
              selected={hasValue ? new Date(safeValue) : undefined}
              onSelect={handleSelect}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
              initialFocus
            />
          </div>
        </>
      )}

      <FormMessage />
    </FormItem>
  );
};
