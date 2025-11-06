import { StaticImageData } from "next/image";

export interface CompetitionsDetailCardProps {
  title: string;
  logo: string;
  date: string;
  location: string;
  price: string;
  club: string;
  description: string;
  name_contact: string;
  organized: string;
  contact_avatar: string;
}

export type CompetitionsRegisterProps = {
  name_comp: string;
  location: string;
  competition_date: string;
  price: string;
  competitonId: number;
};

export type IconsCompetitonsProps = {
  icon: StaticImageData;
  label: string | number;
  textClass?: string;
  containerClass?: string;
};

// this used
export type CompetitionsFilters = {
  id?: number;
  page?: string;
  limit?: string;
  name_comp?: string;
  banner?: string;
  bannerUrl?: string;
  organizer_name?: string;
  location?: string;
  competition_date?: string;
  sport_category?: string;
  members_count?: string;
  slot_left?: string;
  quota?: string;
};

export type HostInfo = {
  username: string;
  phone_number: string;
};

export type ClubInfo = {
  id: number;
  name_club: string;
  logo: string | null;
};
// types/competition-types.ts or constant/types/competition.ts

// Type for CREATE Competition Payload (what you send to API)
export type CompetitionCreatePayload = {
  club_id: string | number;
  name_comp: string;
  competitions_date: string;
  location: string;
  description: string;
  price: string;
  gender_restriction: string;
  skill_level: string;
  quota: number;
  banner?: File | null;
};

export type CompetitionCore = {
  id: number;
  name_comp: string;
  bannerUrl: string;
  banner: string;
  description: string;
  organizer_name: string;
  location: string;
  club_id: number;
  gender_restriction: string;
  skill_level: string;
  quota: string;
  price: string;
  competitions_date: string;
  club: ClubInfo;
  logo: string;
  host: HostInfo;
};

export type CompetitionDetailCore = {
  id: number;
  name_comp: string;
  bannerUrl: string;
  description: string;
  organizer_name: string;
  location: string;
  price: string;
  competitions_date: string;
  club: ClubInfo;
  logo: string;
  host: HostInfo;
};

export type CompetitionData = {
  id: number;
  name_comp: string;
  bannerUrl: string;
  organizer_name: string;
  location: string;
  competition_date: string;
  sport_category: string;
  members_count: string;
  slot_left: string;
  quota: string;
};

export type CompetitionRegistrationPayload = {
  competition_id: number;
  full_name: string;
  email: string;
  phone_number: string;
  skill_level: "Beginner" | "Intermediate" | "Advanced";
  promo_code?: string | null;
  promo_code_id?: number | null;
  original_amount: number;
  discount_amount: number;
  final_amount: number;
};

export type CompetitionRegistrationResponse = {
  success: true;
  message: string;
  data: {
    registration: {
      id: number;
      user_id: number | null;
      competition_id: number;
      full_name: string;
      email: string;
      phone_number: string;
      skill_level: string;
      promo_code: string | null;
      promo_code_id: number | null;
      payment_status: "PENDING" | "PAID" | "FAILED";
      original_amount: string;
      discount_amount: string;
      final_amount: string;
      createdAt: string;
      match: { id: number };
    };
  };
};
