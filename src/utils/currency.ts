interface CurrencyOptions {
  showDecimals?: boolean;
  decimalPlaces?: number;
}

/**
 * Format number to Indonesian Rupiah (Custom)
 */
const displayIDRCurrency = (
  num: number | string,
  options: CurrencyOptions = {}
): string => {
  const { showDecimals = false, decimalPlaces = 2 } = options;

  // Convert to number
  const amount = typeof num === "string" ? parseFloat(num) : num;

  // Handle invalid
  if (isNaN(amount) || amount === null || amount === undefined) {
    return "Rp 0";
  }

  // Format with thousand separator
  let formatted: string;

  if (showDecimals) {
    const [integerPart, decimalPart] = amount.toFixed(decimalPlaces).split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    formatted = `${formattedInteger},${decimalPart}`;
  } else {
    formatted = Math.floor(amount)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return `Rp ${formatted}`;
};

export default displayIDRCurrency;
