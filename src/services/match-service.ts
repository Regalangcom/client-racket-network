// services/match-service.ts
import {
  MatchData,
  MatchResponse,
  SingleMatchResponse,
  CreateMatchPayload,
  UpdateMatchPayload,
  MatchFilter,
  MatchResponses,
  MatchRegistrationPayload,
  MatchRegistrationResponse,
} from "@/constant/types";

// services/match-services.ts

export class MatchService {
  /**
   * Get all matches with pagination
   */
  // if you have all metadata pagination using service this
  // static async getMatches(
  //   page: number = 1,
  //   limit: number = 10,
  //   access_token?: string
  // ): Promise<MatchResponse> {
  //   try {
  //     const headers: HeadersInit = {
  //       "Content-Type": "application/json",
  //     };

  //     if (access_token) {
  //       headers["Authorization"] = `Bearer ${access_token}`;
  //     }

  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_URL_API}/api/v1/match?page=${page}&limit=${limit}`,
  //       {
  //         method: "GET",
  //         headers,
  //         cache: "no-store",
  //       }
  //     );

  //     if (!response.ok) {
  //       const error = await response.json();
  //       throw new Error(error.message || "Failed to fetch matches");
  //     }

  //     return await response.json();
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       throw error;
  //     }
  //     throw new Error("Failed to fetch matches");
  //   }
  // }

  static async getMatches(
    filters: MatchFilter = {},
    access_token: string | null = null
  ) {
    try {
      const queryParams = new URLSearchParams();
      for (const [key, value] of Object.entries(filters)) {
        if (value) queryParams.append(key, value);
      }

      const queryString = queryParams.toString()
        ? `?${queryParams.toString()}`
        : "";

      const url = `${process.env.NEXT_PUBLIC_URL_API}/api/v1/match${queryString}`;

      const headers: HeadersInit = {};
      if (access_token) {
        headers["Authorization"] = `Bearer ${access_token}`;
      }

      const response = await fetch(url, {
        headers,
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch matches: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Error fetching matches:", error);
      // return [];
    }
  }

  /**
   * Get matches by club ID
   */
  static async getMatchesByClub(
    clubId: string | number,
    page: number = 1,
    limit: number = 10,
    accessToken?: string
  ): Promise<MatchResponse> {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/clubs/${clubId}/match?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers,
          cache: "no-store",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch club matches");
      }
      const result = await response.json();

      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to fetch club matches");
    }
  }

  /**
   * Get single match by ID
   */
  static async getMatchById(
    id: string | number,
    access_token?: string
  ): Promise<MatchData> {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (access_token) {
        headers["Authorization"] = `Bearer ${access_token}`;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/match/${id}`,
        {
          method: "GET",
          headers,
          cache: "no-store",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch match details");
      }

      const result: SingleMatchResponse = await response.json();

      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to fetch match details");
    }
  }

  /**
   * Create new match/event
   */
  static async createMatch(
    payload: CreateMatchPayload,
    access_token: string
  ): Promise<MatchData | null> {
    try {
      const formData = new FormData();

      formData.append("club_id", String(payload.club_id));
      formData.append("name_match", payload.name_match);
      formData.append("match_date", payload.match_date);
      formData.append("TimeSlot", JSON.stringify(payload.TimeSlot));
      // formData.append("match_time", payload.match_time);
      formData.append("location", payload.location);
      formData.append("gender_restriction", payload.gender_restriction);
      formData.append("skill_level", payload.skill_level);
      formData.append("price", String(payload.price));
      formData.append("quota", String(payload.quota));
      formData.append("description", payload.description);

      // Append banner if exists
      if (payload.banner_match) {
        formData.append("banner_match", payload.banner_match);
      }

      console.log("form data", formData);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/match`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create match");
      }

      const result: SingleMatchResponse = await response.json();
      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to create match");
    }
  }

  /**
   * Update match/event
   */
  static async updateMatch(
    matchId: string | number,
    payload: UpdateMatchPayload,
    accessToken: string
  ): Promise<MatchData> {
    try {
      const formData = new FormData();

      // Append only provided fields
      if (payload.name_match) {
        formData.append("name_match", payload.name_match);
      }
      if (payload.match_date) {
        formData.append("match_date", payload.match_date);
      }
      if (payload.match_time) {
        formData.append("match_time", payload.match_time);
      }
      if (payload.location) {
        formData.append("location", payload.location);
      }
      if (payload.description) {
        formData.append("description", payload.description);
      }
      if (payload.price) {
        formData.append("price", payload.price);
      }
      if (payload.gender_restriction) {
        formData.append("gender_restriction", payload.gender_restriction);
      }
      if (payload.skill_level) {
        formData.append("skill_level", payload.skill_level);
      }
      if (payload.quota) {
        formData.append("quota", String(payload.quota));
      }
      if (payload.banner_match) {
        formData.append("banner_match", payload.banner_match);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/matches/${matchId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update match");
      }

      const result: SingleMatchResponse = await response.json();
      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to update match");
    }
  }

  /**
   * Delete match/event
   */
  static async deleteMatch(
    matchId: string | number,
    accessToken: string
  ): Promise<void> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/matches/${matchId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete match");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to delete match");
    }
  }

  /**
   * Join match
   */
  static async joinMatch(
    matchId: string | number,
    accessToken: string
  ): Promise<void> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/matches/${matchId}/join`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to join match");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to join match");
    }
  }

  /**
   * Leave match
   */
  static async leaveMatch(
    matchId: string | number,
    accessToken: string
  ): Promise<void> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/matches/${matchId}/leave`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to leave match");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to leave match");
    }
  }

  static async registrationMatch(
    payload: MatchRegistrationPayload,
    access_token?: string
  ): Promise<MatchRegistrationResponse> {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (access_token) {
        headers["Authorization"] = `Bearer ${access_token}`;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/match/register`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to register for match");
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to register to match");
    }
  }
}
