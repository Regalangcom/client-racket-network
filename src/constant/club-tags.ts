// /constant/clubTags.ts
import { stars, members, maps } from "@/public";

export const clubTags = (club: string, member: string, stars_label: string) => [
  { icon: maps, label: club },
  { icon: members, label: member },
  { icon: stars, label: stars_label },
];
