// /constant/clubTags.ts
import { formatLongDate } from "@/lib/dns-date.options";
import { calender, maps, prices, reviews, Trophy } from "@/public";
import displayIDRCurrency from "@/utils/currency";

export const Competitions = (
  competitions_date: string,
  location: string,
  price: string,
  host: string
) => {
  const priceLabel =
    price === "0" || !price ? "Free" : displayIDRCurrency(price);

  const formattedDate = formatLongDate(competitions_date, "en");
  return [
    // ✅ TAMBAH RETURN INI!
    { icon: calender, label: formattedDate, textClass: "text-xl" },
    { icon: maps, label: location },
    { icon: prices, label: priceLabel },
    { icon: reviews, label: host },
  ];
};

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Returns an array of objects containing information about a competition.
 * Each object has an icon and label property.
 * The icons are Trophy, calender, and maps respectively.
 * The labels are the title, time, and location of the competition respectively.
 * @param {string} title - The title of the competition.
 * @param {string} time - The time of the competition.
 * @param {string} location - The location of the competition.
 * @returns {Array<{icon: string, label: string}>} - An array of objects containing the competition details.
 */
export const CompetitionsDetail = (
  name_comp: string,
  competitions_date: string,
  location: string
) => {
  const formattedDate = formatLongDate(competitions_date, "en");
  return [
    { icon: Trophy, label: name_comp },
    { icon: calender, label: formattedDate },
    { icon: maps, label: location },
  ];
};
