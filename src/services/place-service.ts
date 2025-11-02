import { City, Venue, PlacesApiResponse } from "@/constant/types/place";
export class PlacesAPI {
  /**
   * Search cities for location autocomplete
   * @param input - User search input (min 2 characters)
   * @returns Array of cities
   */
  static async searchCities(input: string): Promise<City[]> {
    try {
      if (input.length < 2) return [];

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_URL_API
        }/api/v1/places/autocomplete-cities?input=${encodeURIComponent(input)}`,
        {
          method: "GET",
          headers,
          cache: "no-store",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to search cities");
      }

      const result: PlacesApiResponse<City> = await response.json();
      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Search cities error:", error.message);
        throw error;
      }
      throw new Error("Failed to search cities");
    }
  }

  /**
   * Search venues for home court autocomplete
   * @param input - User search input (min 3 characters)
   * @param city - Optional city filter
   * @param userLocation - Optional user coordinates {lat, lng}
   * @returns Array of venues
   */
  static async searchVenues(
    input: string,
    city?: string
    // userLocation?: { lat: number; lng: number }
  ): Promise<Venue[]> {
    try {
      if (input.length < 3) return [];

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      const params = new URLSearchParams({
        input,
        ...(city && { city }),
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/places/autocomplete-venues?${params}`,
        {
          method: "GET",
          headers,
          cache: "no-store",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to search venues");
      }

      const result: PlacesApiResponse<Venue> = await response.json();
      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Search venues error:", error.message);
        throw error;
      }
      throw new Error("Failed to search venues");
    }
  }

  /**
   * Get place details by placeId
   * @param placeId - Google Place ID
   * @returns Place details
   */
  static async getPlaceDetails(placeId: string): Promise<Venue> {
    try {
      if (!placeId) {
        throw new Error("Place ID is required");
      }

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/places/details/${placeId}`,
        {
          method: "GET",
          headers,
          cache: "no-store",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to get place details");
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Get place details error:", error.message);
        throw error;
      }
      throw new Error("Failed to get place details");
    }
  }
}
