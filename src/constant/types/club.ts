// /src/types/club.d.ts
import { StaticImageData } from "next/image";
import { JoinRequestItem } from "@/services/club-services";

// export interface ClubDetailCardProps {
//   title: string;
//   logoUrl: string;
//   privacy: string;
//   club: string;
//   genre: string;
//   name_contact: string;
//   member: string;
//   contact_avatar: string;
//   stars_label: string;
//   id: string | number;
//   owner_id?: number | string;
// }

export type ClubDetailCardProps = {
  id: string | number;
  title: string;
  logoUrl: string;
  club: string;
  genre: string;
  member: string;
  location: string;
  home_court: string;
  privacy: string;
  name_contact: string;
  contact_avatar: string;
  stars_label: string;
  owner_id: number;
  accessToken?: string;
  isOwner: boolean;
  userId?: number;
  joinRequests: JoinRequestItem[];
  userJoinStatus?: {
    isMember: boolean;
    requestStatus: "PENDING" | "APPROVED" | "REJECTED" | null;
  };
};

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
  home_court: string;
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

export interface ClubFilter {
  sport_category?: string;
  location?: string;
  gender_rule?: string;
}
