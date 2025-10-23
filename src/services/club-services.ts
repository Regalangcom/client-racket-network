// services/club-service.ts
import { ClubData, ClubFilter, ClubResponse } from "@/constant/types";
import { ClubFormValues } from "@/constant/types/zodSchema";

// Base URL untuk API
const API_URL = process.env.NEXT_PUBLIC_URL_API || "http://localhost:8080";

// Interface untuk respons klub
export interface ClubResponses {
  success: boolean;
  data: ClubData;
  message?: string;
}

// Base response type
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  status?: string;
}

// Join response types
export interface JoinClubResponse extends ApiResponse {
  status: "JOINED" | "PENDING";
}

// Join requests types
export interface JoinRequestItem {
  id: number;
  user_id: number;
  club_id: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  message?: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    username: string;
    email: string;
    profile?: {
      picture?: string;
      location?: string;
    };
  };
}

export interface JoinRequestsResponse extends ApiResponse {
  data: JoinRequestItem[];
}

// Approval response
export interface ApproveRejectResponse extends ApiResponse {
  // Berdasarkan approveJoinRequestService, hanya ada message
}

// Join status response
export interface JoinStatusResponse extends ApiResponse {
  data: {
    isMember: boolean;
    requestStatus: "PENDING" | "APPROVED" | "REJECTED" | null;
  };
}

// Class ClubService
export class ClubService {
  static async getClubs(
    filters: ClubFilter = {},
    accessToken: string | null = null
  ) {
    try {
      // Buat query params dari filter
      const queryParams = new URLSearchParams();

      for (const [key, value] of Object.entries(filters)) {
        if (value) queryParams.append(key, value);
      }

      const queryString = queryParams.toString()
        ? `?${queryParams.toString()}`
        : "";
      const url = `${process.env.NEXT_PUBLIC_URL_API}/api/v1/club${queryString}`;

      const headers: HeadersInit = {};
      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const response = await fetch(url, {
        headers,
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch clubs: ${response.statusText}`);
      }

      const data: ClubResponse = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Error fetching clubs:", error);
      return [];
    }
  }

  // Method untuk mendapatkan detail klub
  static async getClubById(
    id: string | number,
    access_token?: string
  ): Promise<ClubData | null> {
    try {
      // Opsi header jika ada token
      const headers: HeadersInit = {};
      if (access_token) {
        headers["Authorization"] = `Bearer ${access_token}`;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/club/${id}`,
        {
          headers,
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch club: ${response.statusText}`);
      }

      // Parse data
      const data: ClubResponses = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Error fetching club with id ${id}:`, error);
      return null;
    }
  }

  // ✅ FIXED: Join club method dengan proper error handling
  static async joinClub(
    id: string | number,
    access_token: string
  ): Promise<JoinClubResponse> {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/club/${id}/join`,
        {
          method: "POST",
          headers,
          cache: "no-store",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Failed to join club: ${errorData.message}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`Error joining club with id ${id}:`, error);
      throw error; // Re-throw untuk handling di UI
    }
  }

  static async getJoinStatus(
    id: string | number,
    access_token: string
  ): Promise<{
    isMember: boolean;
    requestStatus: "PENDING" | "APPROVED" | "REJECTED" | null;
  }> {
    try {
      const headers: HeadersInit = {
        Authorization: `Bearer ${access_token}`,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/club/${id}/join-status`,
        {
          headers,
          cache: "no-store",
        }
      );

      if (!response.ok) {
        // If endpoint fails or doesn't exist, return default
        console.warn(`Failed to fetch join status: ${response.statusText}`);
        return { isMember: false, requestStatus: null };
      }

      const data: JoinStatusResponse = await response.json();
      return {
        isMember: data.data?.isMember || false,
        requestStatus: data.data?.requestStatus || null,
      };
    } catch (error) {
      console.error(`Error fetching join status for club ${id}:`, error);
      return { isMember: false, requestStatus: null };
    }
  }

  // ✅ FIXED: URL endpoint corrected - removed 's' from join-requests and added /api/v1
  static async getClubJoinRequests(
    id: string | number,
    access_token: string
  ): Promise<JoinRequestsResponse["data"] | []> {
    try {
      const headers: HeadersInit = {
        Authorization: `Bearer ${access_token}`,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/club/${id}/join-request`,
        {
          headers,
          cache: "no-store",
        }
      );

      if (!response.ok) {
        // Jika 403 atau 401, mungkin bukan owner
        if (response.status === 403 || response.status === 401) {
          return [];
        }
        throw new Error(
          `Failed to fetch join requests: ${response.statusText}`
        );
      }

      const result: JoinRequestsResponse = await response.json();
      return result.data || [];
    } catch (error) {
      console.error(`Error fetching join requests for club ${id}:`, error);
      return [];
    }
  }

  // ✅ FIXED: URL endpoint corrected - added /api/v1
  static async approveJoinRequest(
    requestId: string | number,
    access_token: string
  ): Promise<ApproveRejectResponse> {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/club/join-requests/${requestId}/approve`,
        {
          method: "POST",
          headers,
          cache: "no-store",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Failed to approve request: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`Error approving request ${requestId}:`, error);
      throw error;
    }
  }

  // ✅ FIXED: URL endpoint corrected - added /api/v1
  static async rejectJoinRequest(
    requestId: string | number,
    access_token: string
  ): Promise<ApproveRejectResponse> {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/club/join-requests/${requestId}/reject`,
        {
          method: "POST",
          headers,
          cache: "no-store",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Failed to reject request: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`Error rejecting request ${requestId}:`, error);
      throw error;
    }
  }

  static async createClubs(
    data: ClubFormValues & { logo?: File | null },
    access_token: string
  ): Promise<ClubData | null> {
    try {
      // Validasi token
      if (!access_token) {
        throw new Error("Authentication token is required");
      }

      const formData = new FormData();

      formData.append("sport_category", data.sport_category);
      formData.append("name_club", data.clubName);
      formData.append("privacy", data.privacy);
      formData.append("location", data.location);
      formData.append("home_court", data.home_court);
      formData.append("gender_rule", data.gender);

      if (data.description) {
        formData.append("description", data.description);
      }

      // Tambahkan file logo jika ada
      if (data.logo instanceof File) {
        formData.append("logo", data.logo);
      }

      // Panggil API
      const response = await fetch(`${API_URL}/api/v1/club`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Failed to create club: ${response.statusText}`
        );
      }

      const responseData: ClubResponses = await response.json();
      return responseData.data;
    } catch (error) {
      console.error("Error creating club:", error);
      throw error;
    }
  }

  // Method untuk memeriksa keanggotaan klub
  static async checkMembership(
    clubId: string | number,
    token: string
  ): Promise<boolean> {
    try {
      // Validasi token
      if (!token) {
        throw new Error("Authentication token is required");
      }

      // Panggil API
      const response = await fetch(
        `${API_URL}/api/v1/club/${clubId}/members/check`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Cek respons
      if (!response.ok) {
        throw new Error(`Failed to check membership: ${response.statusText}`);
      }

      const data = await response.json();
      return data.isMember || false;
    } catch (error) {
      console.error(`Error checking membership for club ${clubId}:`, error);
      return false;
    }
  }
}
