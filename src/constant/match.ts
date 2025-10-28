// /constant/clubTags.ts
// constant/match.ts

import { accounts, maps, prices, reviews, times } from "@/public";
import { DetailItem } from "./types";

export const matchDetailCard = (
  location: string,
  price: string,
  name_club: string,
  gender_restriction: string
): DetailItem[] => {
  // ✅ Format gender label
  const genderLabel =
    gender_restriction === "women"
      ? "Women only"
      : gender_restriction === "men"
      ? "Men only"
      : "All genders";

  // ✅ Format price label
  const priceLabel = price === "0" || !price ? "Free" : `Rp ${price}`;

  return [
    {
      icon: accounts,
      label: genderLabel,
      hasTimeSelector: true,
    },
    {
      icon: maps,
      label: location,
      hasTimeSelector: false,
    },
    {
      icon: prices,
      label: priceLabel,
      hasTimeSelector: false,
    },
    {
      icon: reviews,
      label: name_club,
      hasTimeSelector: false,
    },
  ];
};

export const matchIconRegister = (
  location: string,
  time: string,
  price: string,
  club: string
): DetailItem[] => [
  { icon: accounts, label: "Women only", hasTimeSelector: false },
  { icon: maps, label: location },
  { icon: prices, label: price },
  { icon: reviews, label: club },
  { icon: times, label: time },
];

// Sport Options
export const TYPE_EVENT = [
  { value: "Match", label: "Match" },
  { value: "Competition", label: "Competition" },
] as const;

export const LEVEL_OPTION = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
] as const;

// Location Options
export const TIME_OPTIONS = [
  { value: "16:00 - 17:00 am", label: "16:00 - 17:00 am" },
  { value: "19:00 - 20:00 am", label: "19:00 - 20:00 am" },
  { value: "20:00 - 22:00 am", label: "20:00 - 22:00 am" },
] as const;

// Form Section Titles
export const FORM_SECTIONS = {
  TYPE: "1. Choose your event",
  BASIC_INFO: "2. Basic Information",
  LOCATION: "3. Location",
  LEVEL: "4. Level",
  GENDER: "5. Gender",
} as const;
