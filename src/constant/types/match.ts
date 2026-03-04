import { StaticImageData } from "next/image";

export interface Match {
  id: string;
  clubName: string;
  title: string;
  date: string;
  location: string;
  status: "ongoing" | "created" | "completed" | "waiting_payment";
  imageUrl: StaticImageData | string;
  clubLogo?: string;
  // added
  paymentDeadline?: string | number; // ISO string atau timestamp dari BE
  countdownMessage?: string;
  paymentUrl?: string;
}

export type MatchRegisterProps = {
  location: string;
  gender_restriction: string;
  name_match: string;
  matchId: number;
  match_date: string;
  price: string;
  name_club: string;
  timeSlots: TimeSlot[];
  selectedTimeSlot?: TimeSlot | null;
  isAuthenticated?: boolean;
  userEmail?: string | null;
};
export type MatchCardViewProps = {
  id: string;
  title: string;
  time: string;
  location: string;
  logo?: StaticImageData;
  clubName: string;
};

export interface MatchCardProps {
  match: MatchCardViewProps;
}

export type DetailItem = {
  icon: StaticImageData;
  label: string;
  hasTimeSelector?: boolean;
  times?: string[];
};

export type TimeSlot = {
  id?: number;
  start_time: string;
  end_time: string;
  match_id?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type MatchData = {
  id: number;
  banner_match: string;
  match_date: string;
  location: string;
  name_match: string;
  club_id: number;
  description: string;
  price: string;
  gender_restriction: string;
  name_club: string;
  skill_level: string;
  quota: number;
  status : string;
  is_full : boolean;
  available_spots : number;
  cratedAt: string;
  updatedAt: string;
  club: {
    id: number;
    name_club: string;
    logo: string;
    logoUrl?: string;
    owner_id: number;
  };
  _count: {
    UsersOnMatches: number;
  };
  // TimeSlot: TimeSlot[];
  TimeSlot: Array<{
    start_time: string;
    end_time: string;
  }>;
  bannerUrl: string;
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
  // success: boolean;
  data: MatchData;
  // message?: string;
};
export type MatchDetail = {
  id: number;
  banner_match: string;
  match_date: string; // ISO string
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
  TimeSlot: Array<{
    start_time: string;
    end_time: string;
  }>;
};

export type MatchDetailCardProps = {
  id: number;
  name_match: string;
  bannerUrl: string;
  match_date: string;
  // match_time: string;
  TimeSlot: TimeSlot[];
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
  // match_time: string;
  location: string;
  description: string;
  price: string;
  gender_restriction: string;
  skill_level: string;
  quota: number;
  banner_match?: File | null;
  TimeSlot: Array<{
    start_time: string;
    end_time: string;
  }>;
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
  name?: string;
};

export type MatchRegistrationPayload = {
  match_id: number;
  time_slot_id: number;
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

export type MatchRegistrationResponse = {
  success: true;
  message: string;
  data: {
    registration: {
      id: number;
      user_id: number | null;
      match_id: number;
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
      start_at: string | null;
      end_at: string | null;
      time_slot?: {
        id: number;
        start_time: string;
        end_time: string;
      };
    };
  };
  transaction?: {
    order_id: string;
    payment_method: string;
  };
};
