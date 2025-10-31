import {
  CompetitionCore,
  // CompetitionDetailResponse,
  CompetitionsFilters,
} from "@/constant/types";

export class CompetitionsService {
  static async getAllCompetition(
    filters: CompetitionsFilters = {},
    access_token: string | null = null
  ) {
    try {
      const queryParams = new URLSearchParams();
      for (const [key, value] of Object.entries(filters)) {
        if (value) queryParams.append(key, String(value));
      }

      const queryString = queryParams.toString()
        ? `?${queryParams.toString()}`
        : "";

      const url = `${process.env.NEXT_PUBLIC_URL_API}/api/v1/competitions/${queryString}`;

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
    }
  }

  /**
   * Get single match by ID
   */
  static async getCompetitionsById(
    id: string | number,
    access_token?: string
  ): Promise<CompetitionCore | null> {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (access_token) {
        headers["Authorization"] = `Bearer ${access_token}`;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/competitions/${id}`,
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

      const result = await response.json();

      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to fetch match details");
    }
  }

  // static async createMatch(
  //   payload: CreateMatchPayload,
  //   access_token: string
  // ): Promise<MatchData | null> {
  //   try {
  //     const formData = new FormData();

  //     formData.append("club_id", String(payload.club_id));
  //     formData.append("name_match", payload.name_match);
  //     formData.append("match_date", payload.match_date);
  //     formData.append("TimeSlot", JSON.stringify(payload.TimeSlot));
  //     // formData.append("match_time", payload.match_time);
  //     formData.append("location", payload.location);
  //     formData.append("gender_restriction", payload.gender_restriction);
  //     formData.append("skill_level", payload.skill_level);
  //     formData.append("price", payload.price);
  //     formData.append("quota", String(payload.quota));

  //     if (payload.description) {
  //       formData.append("description", payload.description);
  //     }

  //     if (payload.price) {
  //       formData.append("price", payload.price);
  //     }

  //     if (payload.quota) {
  //       formData.append("quota", String(payload.quota));
  //     }

  //     // Append banner if exists
  //     if (payload.banner_match) {
  //       formData.append("banner_match", payload.banner_match);
  //     }

  //     console.log("form data", formData);

  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_URL_API}/api/v1/competitions`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //         },
  //         body: formData,
  //       }
  //     );

  //     if (!response.ok) {
  //       const error = await response.json();
  //       throw new Error(error.message || "Failed to create match");
  //     }

  //     const result: SingleMatchResponse = await response.json();
  //     return result.data;
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       throw error;
  //     }
  //     throw new Error("Failed to create match");
  //   }
  // }
}

// "/api/v1/competitions
