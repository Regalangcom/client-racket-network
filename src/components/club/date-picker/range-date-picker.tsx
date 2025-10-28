// components/club/joined/date-picker/range-date-picker.tsx
import React from "react";
import { format } from "date-fns";
import { Calendar1Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";
import { DateRange } from "react-day-picker";

interface RangeDatePickerProps {
  field: ControllerRenderProps<any, "dateRange">;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RangeDatePicker: React.FC<RangeDatePickerProps> = ({
  field,
  isOpen,
  onOpenChange,
}) => {
  const safeValue = field.value || { from: "", to: "" };
  const fromDate =
    safeValue.from && safeValue.from !== "" ? safeValue.from : null;
  const toDate = safeValue.to && safeValue.to !== "" ? safeValue.to : null;

  const handleSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      field.onChange({
        from: format(range.from, "yyyy-MM-dd"),
        to: range.to ? format(range.to, "yyyy-MM-dd") : "",
      });

      if (range.to) {
        onOpenChange(false);
      }
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
            !fromDate && "text-muted-foreground"
          )}
        >
          <Calendar1Icon className="mr-2 h-4 w-4" />
          {fromDate ? (
            toDate ? (
              <>
                {format(new Date(fromDate), "LLL dd, y")} -{" "}
                {format(new Date(toDate), "LLL dd, y")}
              </>
            ) : (
              format(new Date(fromDate), "LLL dd, y")
            )
          ) : (
            <span>Pick date range</span>
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
              mode="range"
              selected={{
                from: fromDate ? new Date(fromDate) : undefined,
                to: toDate ? new Date(toDate) : undefined,
              }}
              onSelect={handleSelect}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
              numberOfMonths={2}
              initialFocus
            />
          </div>
        </>
      )}

      <FormMessage />
    </FormItem>
  );
};
