// components/club/joined/date-picker/use-date-picker.ts
import { useState } from "react";

export type DateMode = "single" | "range";

export const useDatePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<DateMode>("single");

  const openPicker = () => setIsOpen(true);
  const closePicker = () => setIsOpen(false);
  const togglePicker = () => setIsOpen((prev) => !prev);

  const switchMode = (newMode: DateMode) => {
    setMode(newMode);
    setIsOpen(false);
  };

  return {
    isOpen,
    mode,
    openPicker,
    closePicker,
    togglePicker,
    switchMode,
  };
};
