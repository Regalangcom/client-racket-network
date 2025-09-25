// /constant/clubTags.ts
import { accounts, maps, prices, reviews, times } from "@/public";
import { DetailItem } from "./types";

export const matchDetailCard = (
  location: string,
  price: string,
  club: string
): DetailItem[] => [
  { icon: accounts, label: "Women only", hasTimeSelector: true },
  { icon: maps, label: location },
  { icon: prices, label: price },
  { icon: reviews, label: club },
];

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
