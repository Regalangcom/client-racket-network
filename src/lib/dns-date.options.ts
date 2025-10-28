// utils/date-formatter.ts

import {
  format,
  parseISO,
  formatDistanceToNow,
  isToday,
  isTomorrow,
} from "date-fns";
import { id as localeId, enUS } from "date-fns/locale";

type Locale = "id" | "en";

const locales = {
  id: localeId,
  en: enUS,
};

/**
 * Get current locale from localStorage or default to "en"
 */
export function getCurrentLocale(): Locale {
  if (typeof window === "undefined") return "en"; // SSR safe
  const saved = localStorage.getItem("app-locale");
  return saved === "id" || saved === "en" ? saved : "en";
}

/**
 * Set locale to localStorage
 */
export function setCurrentLocale(locale: Locale): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("app-locale", locale);
  }
}

/**
 * Toggle locale between "id" and "en"
 */
export function toggleLocale(): Locale {
  const current = getCurrentLocale();
  const newLocale = current === "id" ? "en" : "id";
  setCurrentLocale(newLocale);
  return newLocale;
}

/**
 * Format date - Long format
 * EN: "Wednesday, October 29, 2025"
 * ID: "Rabu, 29 Oktober 2025"
 */
export function formatLongDate(dateString: string, locale?: Locale): string {
  try {
    const currentLocale = locale || getCurrentLocale();
    const pattern =
      currentLocale === "en" ? "EEEE, MMMM d, yyyy" : "EEEE, d MMMM yyyy";
    return format(parseISO(dateString), pattern, {
      locale: locales[currentLocale],
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
}

/**
 * Format date - Short format
 * EN: "Oct 29, 2025"
 * ID: "29 Okt 2025"
 */
export function formatShortDate(dateString: string, locale?: Locale): string {
  try {
    const currentLocale = locale || getCurrentLocale();
    const pattern = currentLocale === "en" ? "MMM d, yyyy" : "d MMM yyyy";
    return format(parseISO(dateString), pattern, {
      locale: locales[currentLocale],
    });
  } catch (error) {
    return "Invalid date";
  }
}

/**
 * Format date - Medium format
 * EN: "October 29, 2025"
 * ID: "29 Oktober 2025"
 */
export function formatMediumDate(dateString: string, locale?: Locale): string {
  try {
    const currentLocale = locale || getCurrentLocale();
    const pattern = currentLocale === "en" ? "MMMM d, yyyy" : "d MMMM yyyy";
    return format(parseISO(dateString), pattern, {
      locale: locales[currentLocale],
    });
  } catch (error) {
    return "Invalid date";
  }
}

/**
 * Format day name only
 * EN: "Wednesday"
 * ID: "Rabu"
 */
export function formatDayName(dateString: string, locale?: Locale): string {
  try {
    const currentLocale = locale || getCurrentLocale();
    return format(parseISO(dateString), "EEEE", {
      locale: locales[currentLocale],
    });
  } catch (error) {
    return "";
  }
}

/**
 * Format month name only
 * EN: "October"
 * ID: "Oktober"
 */
export function formatMonthName(dateString: string, locale?: Locale): string {
  try {
    const currentLocale = locale || getCurrentLocale();
    return format(parseISO(dateString), "MMMM", {
      locale: locales[currentLocale],
    });
  } catch (error) {
    return "";
  }
}

/**
 * Format date - Numeric (same for both)
 * "29/10/2025"
 */
export function formatNumericDate(dateString: string): string {
  try {
    return format(parseISO(dateString), "dd/MM/yyyy");
  } catch (error) {
    return "Invalid date";
  }
}

/**
 * Smart date formatter with relative dates
 * EN: "Today", "Tomorrow", "Wednesday"
 * ID: "Hari ini", "Besok", "Rabu"
 */
export function formatSmartDate(dateString: string, locale?: Locale): string {
  try {
    const currentLocale = locale || getCurrentLocale();
    const date = parseISO(dateString);

    if (isToday(date)) {
      return currentLocale === "en" ? "Today" : "Hari ini";
    }

    if (isTomorrow(date)) {
      return currentLocale === "en" ? "Tomorrow" : "Besok";
    }

    // Within 7 days - show day name
    const now = new Date();
    const diffDays = Math.floor(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays > 0 && diffDays <= 7) {
      return format(date, "EEEE", { locale: locales[currentLocale] });
    }

    // Otherwise show full date
    const pattern = currentLocale === "en" ? "MMMM d, yyyy" : "d MMMM yyyy";
    return format(date, pattern, { locale: locales[currentLocale] });
  } catch (error) {
    return "Invalid date";
  }
}

/**
 * Get relative time from now
 * EN: "in 5 days", "2 hours ago"
 * ID: "dalam 5 hari", "2 jam yang lalu"
 */
export function formatRelativeTime(
  dateString: string,
  locale?: Locale
): string {
  try {
    const currentLocale = locale || getCurrentLocale();
    return formatDistanceToNow(parseISO(dateString), {
      addSuffix: true,
      locale: locales[currentLocale],
    });
  } catch (error) {
    return "";
  }
}

/**
 * Format with custom pattern
 */
export function formatCustomDate(
  dateString: string,
  pattern: string,
  locale?: Locale
): string {
  try {
    const currentLocale = locale || getCurrentLocale();
    return format(parseISO(dateString), pattern, {
      locale: locales[currentLocale],
    });
  } catch (error) {
    return "Invalid date";
  }
}
