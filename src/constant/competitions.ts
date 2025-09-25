// /constant/clubTags.ts
import { calender, maps, prices, reviews, Trophy } from "@/public";

export const Competitions = (
  date: string,
  location: string,
  price: string,
  club: string
) => [
  { icon: calender, label: date, textClass: "text-xl" },
  { icon: maps, label: location },
  { icon: prices, label: price },
  { icon: reviews, label: club },
];

export const CompetitionsDetail = (
  title: string,
  time: string,
  location: string
) => [
  { icon: Trophy, label: title },
  { icon: calender, label: time },
  { icon: maps, label: location },
];
