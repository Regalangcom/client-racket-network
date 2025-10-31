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

export interface CompetitionsRegisterProps {
  title: string;
  location: string;
  time: string;
  price: string;
  club: string;
}

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
  organizer_name?: string;
  location?: string;
  competition_date?: string;
  sport_category?: string;
  members_count?: string;
  slot_left?: string;
  quota?: string;
};

export type CompetitionData = {
  id: number;
  name_comp: string;
  banner: string;
  organizer_name: string;
  location: string;
  competition_date: string;
  sport_category: string;
  members_count: string;
  slot_left: string;
  quota: string;
};

// 📁 types/competition.ts

export type HostInfo = {
  username: string;
  phone_number: string;
};

export type ClubInfo = {
  id: number;
  name_club: string;
  logo: string | null;
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
  competitions_date: string; // ISO string
  club: ClubInfo;
  // name_club: string;
  logo: string;
  host: HostInfo;
};
