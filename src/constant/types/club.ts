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

export interface ClubData {
  id: number;
  name_club: string;
  logo: string | null;
  description: string;
  sport_category: string;
  location: string;
  gender_rule: string;
  privacy: string;
  owner_id: number;
  rating: number;
  owner: {
    id: number;
    username: string;
    email: string;
  };
  _count: {
    members: number;
    matches: number;
  };
  logoUrl: string;
}

export interface ClubResponse {
  success: boolean;
  data: ClubData[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
