export interface ActivityClub {
  id: number;
  name: string;
}

export interface Activity {
  id: number;
  type: "MATCH_CREATED" | "MEMBER_JOINED";
  visibility: string;
  title: string;
  message: string;
  slot_left: number;
  is_full_booked: boolean;
  location: string;
  actor_name: string | null;
  club: ActivityClub;
  reference_id: string;
  reference_type: "MATCH" | "CLUB";
  bannerUrl: string | null;
  created_at: string;
}

export interface ActivityResponse {
  success: boolean;
  data: {
    activities: Activity[];
    pagination: {
      hasMore: boolean;
      nextCursor: string | null;
    };
  };
}