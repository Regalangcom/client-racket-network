import {
  CompetitionCore,
  CompetitionCreatePayload,
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
  static async createCompetition(
    payload: CompetitionCreatePayload,
    access_token: string
  ): Promise<CompetitionCore | null> {
    try {
      const formData = new FormData();

      // Append all fields to FormData
      formData.append("club_id", String(payload.club_id));
      formData.append("name_comp", payload.name_comp);
      formData.append("competitions_date", payload.competitions_date);
      formData.append("location", payload.location);
      formData.append("description", payload.description);
      formData.append("price", payload.price);
      formData.append("gender_restriction", payload.gender_restriction);
      formData.append("skill_level", payload.skill_level);
      formData.append("quota", String(payload.quota));

      // Append banner if exists - USE "banner" not "banner_match"
      if (payload.banner) {
        formData.append("banner_comp", payload.banner); // ✅ Fixed: was "banner_match"
      }

      console.log("Creating competition with payload:", {
        club_id: payload.club_id,
        name_comp: payload.name_comp,
        competitions_date: payload.competitions_date,
        has_banner: !!payload.banner,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/competitions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            // Don't set Content-Type - browser will set it with boundary for FormData
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Failed to create competition: ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log("Competition created successfully:", result);
      return result.data;
    } catch (error) {
      console.error("Error in createCompetition:", error);
      throw error;
    }
  }
}

// "/api/v1/competitions
