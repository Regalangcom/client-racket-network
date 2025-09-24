// /constant/clubTags.ts
import { accounts, maps, prices, reviews } from "@/public";
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
