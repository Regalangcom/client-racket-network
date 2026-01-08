import { useState } from "react";

// Hook helper untuk manage multiple countdowns
export const useCountdowns = () => {
  const [countdowns, setCountdowns] = useState<
    Array<{
      id: string;
      targetTime: string | number;
      message: string;
      paymentUrl: string;
    }>
  >([]);

  const addCountdown = (
    id: string,
    targetTime: string | number,
    message: string,
    paymentUrl: string
  ) => {
    setCountdowns((prev) => {
      // Cek apakah countdown dengan id ini sudah ada
      if (prev.some((c) => c.id === id)) {
        return prev;
      }
      return [...prev, { id, targetTime, message, paymentUrl }];
    });
  };

  const removeCountdown = (id: string) => {
    setCountdowns((prev) => prev.filter((c) => c.id !== id));
  };

  const clearAllCountdowns = () => {
    setCountdowns([]);
  };

  return {
    countdowns,
    addCountdown,
    removeCountdown,
    clearAllCountdowns,
  };
};
