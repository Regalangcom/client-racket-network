import { StaticImageData } from "next/image";

export interface Match {
  id: string;
  clubName: string;
  title: string;
  date: string;
  location: string;
  status: "ongoing" | "created" | "completed";
  imageUrl: StaticImageData;
}

export interface MatchRegisterProps {
  location: string;
  time: string;
  price: string;
  club: string;
}
export interface MatchCardViewProps {
  id: string;
  title: string;
  time: string;
  location: string;
  logo?: StaticImageData;
  clubName: string;
}

export interface MatchCardProps {
  match: MatchCardViewProps;
}

export type DetailItem = {
  icon: StaticImageData;
  label: string;
  hasTimeSelector?: boolean;
  times?: string[];
};

// Types based on API response
export type MatchData = {
  id: number;
  banner_match: string;
  match_date: string;
  match_time: string;
  location: string;
  name_match: string;
  club_id: number;
  description: string;
  price: string;
  gender_restriction: string;
  name_club: string;
  skill_level: string;
  quota: number;
  cratedAt: string;
  updatedAt: string;
  club: {
    id: number;
    name_club: string;
    logo: string;
    logoUrl: string;
  };
  _count: {
    UsersOnMatches: number;
  };
  matchUrl: string;
};

export type MatchResponse = {
  success: boolean;
  data: MatchData[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

export type MatchResponses = {
  success: boolean;
  data: MatchData;
  message?: string;
};
export type MatchDetail = {
  id: number;
  banner_match: string;
  match_date: string; // ISO string
  match_time: string;
  location: string;
  name_match: string;
  club_id: number;
  description: string;
  price: string;
  gender_restriction: "all" | "men" | "women";
  skill_level: "Beginner" | "Intermediate" | "Advanced";
  quota: number;
  cratedAt: string;
  updatedAt: string;
  club: {
    id: number;
    name_club: string;
    logo: string;
    logoUrl: string;
  };
  _count: {
    UsersOnMatches: number;
  };
  bannerUrl: string;
};

export type MatchDetailCardProps = {
  id: number;
  name_match: string;
  matchUrl: string;
  match_date: string;
  match_time: string;
  location: string;
  price: string;
  name_club: string;
  gender_restriction: string;
  description: string;
};
export type SingleMatchResponse = {
  success: boolean;
  data: MatchData;
};

export type CreateMatchPayload = {
  club_id: string | number;
  name_match: string;
  match_date: string;
  match_time: string;
  location: string;
  description?: string;
  price?: string;
  gender_restriction: string;
  skill_level: string;
  quota?: number;
  banner_match?: File | null;
};

export type UpdateMatchPayload = {
  name_match?: string;
  match_date?: string;
  match_time?: string;
  location?: string;
  description?: string;
  price?: string;
  gender_restriction?: string;
  skill_level?: string;
  quota?: number;
  banner_match?: File | null;
};

// ✅ Filter interface
export type MatchFilter = {
  page?: string;
  limit?: string;
  gender_restriction?: string;
  skill_level?: string;
  location?: string;
  club_id?: string;
  date_from?: string;
  date_to?: string;
  search?: string;
};
