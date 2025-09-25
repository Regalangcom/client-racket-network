// /constant/clubTags.ts
import { stars, members, bola_tennis } from "@/public";

export const clubTags = (
  genre: string,
  member: string,
  stars_label: string
) => [
  { icon: bola_tennis, label: genre },
  { icon: members, label: member },
  { icon: stars, label: stars_label },
];
