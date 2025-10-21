// /constant/clubTags.ts
import { stars, members, bola_tennis, padel, badmindton } from "@/public";

export const SPORT_ICONS = {
  Tennis: bola_tennis,
  Padel: padel,
  PingPong: padel,
  Badminton: badmindton,
} as const;

export const clubTags = (
  genre: string,
  member: string,
  stars_label: string
) => [
  {
    icon: SPORT_ICONS[genre as keyof typeof SPORT_ICONS] || bola_tennis,
    label: genre,
  },
  { icon: members, label: member },
  { icon: stars, label: stars_label },
];

// Sport Options
export const SPORT_OPTIONS = [
  { value: "Tennis", label: "Tennis" },
  { value: "Padel", label: "Padel" },
  { value: "PingPong", label: "PingPong" },
  { value: "Badminton", label: "Badminton" },
] as const;

// Location Options
export const LOCATION_OPTIONS = [
  { value: "jakarta-timur", label: "Jakarta Timur" },
  { value: "jakarta-barat", label: "Jakarta Barat" },
  { value: "jakarta-selatan", label: "Jakarta Selatan" },
  { value: "jakarta-utara", label: "Jakarta Utara" },
  { value: "jakarta-pusat", label: "Jakarta Pusat" },
] as const;

// Venue Options
export const VENUE_OPTIONS = [
  { value: "kencana-arena", label: "Kencana Arena" },
  { value: "stadium-utama", label: "Stadium Utama" },
  { value: "sport-center", label: "Sport Center" },
  { value: "lapangan-hijau", label: "Lapangan Hijau" },
] as const;

// Form Section Titles
export const FORM_SECTIONS = {
  SPORT: "1. Choose your clubs sport",
  CUSTOMIZE: "2. Customize your club",
  PRIVACY: "3. Privacy",
  LOCATION: "4. Location",
  GENDER: "5. Gender",
} as const;
