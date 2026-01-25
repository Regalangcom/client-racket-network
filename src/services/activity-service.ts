import { ActivityResponse } from "@/constant/types/activity";

export class ActivityService {
  /**
   * Fetch public activities with cursor-based pagination
   */
  static async getPublicActivities(
    cursor?: string,
    limit: number = 10
  ): Promise<ActivityResponse> {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL_API!;
      const params = new URLSearchParams();

      if (cursor) {
        params.append("cursor", cursor);
      }
      params.append("limit", String(limit));

      const queryString = params.toString() ? `?${params.toString()}` : "";
      const apiUrl = `${baseUrl}/api/v1/activity/public${queryString}`;

      const response = await fetch(apiUrl, {
        cache: "no-store",
      });

      if (!response.ok) {
        console.error("Failed to fetch activities:", response.status);
        return {
          success: false,
          data: {
            activities: [],
            pagination: {
              hasMore: false,
              nextCursor: null,
            },
          },
        };
      }

      const result: ActivityResponse = await response.json();
      return result;
    } catch (error) {
      console.error("Activity fetch error:", error);
      return {
        success: false,
        data: {
          activities: [],
          pagination: {
            hasMore: false,
            nextCursor: null,
          },
        },
      };
    }
  }
}
