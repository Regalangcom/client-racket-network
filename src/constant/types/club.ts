// /src/types/club.d.ts
import { StaticImageData } from "next/image";

export interface ClubDetailCardProps {
  title: string;
  logo: string;
  club: string;
  genre: string;
  name_contact: string;
  member: string;
  contact_avatar: string;
  stars_label: string;
}

export type IconEnvClub = {
  icon: StaticImageData;
  label: string;
};

export interface ClubFormData {
  sport: string;
  logo?: File | null;
  logoPreview?: string;
  clubName: string;
  description: string;
  privacy: "public" | "private";
  location: string;
  venue: string;
  gender: "all" | "men" | "women";
}
