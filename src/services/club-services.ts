// services/club-service.ts
import { ClubData, ClubResponse } from "@/constant/types";

import { ClubFormValues } from "@/constant/types/zodSchema";

// Base URL untuk API
const API_URL = process.env.NEXT_PUBLIC_URL_API || "http://localhost:8080";

// Interface untuk respons klub
export interface ClubResponses {
  success: boolean;
  data: ClubData;
  message?: string;
}

// Class ClubService
export class ClubService {
  // Method untuk mendapatkan daftar klub
  static async getClubs(token?: string): Promise<ClubData[]> {
    try {
      // Opsi header jika ada token
      const headers: HeadersInit = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // Panggil API
      const response = await fetch(`${API_URL}/api/v1/club`, {
        headers,
        cache: "no-store",
      });

      // Cek respons
      if (!response.ok) {
        throw new Error(`Failed to fetch clubs: ${response.statusText}`);
      }

      // Parse data
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
    token?: string
  ): Promise<ClubData | null> {
    try {
      // Opsi header jika ada token
      const headers: HeadersInit = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // Panggil API
      const response = await fetch(`${API_URL}/api/v1/club/${id}`, {
        headers,
        cache: "no-store",
      });

      // Cek respons
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

  // Method untuk membuat klub baru
  static async createClub(
    data: ClubFormValues & { logo?: File | null },
    token: string
  ): Promise<ClubData | null> {
    try {
      // Validasi token
      if (!token) {
        throw new Error("Authentication token is required");
      }

      // Prepare FormData untuk upload file
      const formData = new FormData();

      // Tambahkan field teks ke FormData
      formData.append("sport", data.sport);
      formData.append("name_club", data.clubName); // Sesuaikan dengan API Anda
      formData.append("privacy", data.privacy);
      formData.append("location", data.location);
      formData.append("HomeCourt", data.HomeCourt);
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
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // Cek respons
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Failed to create club: ${response.statusText}`
        );
      }

      // Parse data
      const responseData: ClubResponses = await response.json();
      return responseData.data;
    } catch (error) {
      console.error("Error creating club:", error);
      throw error; // Re-throw untuk handling di UI layer
    }
  }

  // Method untuk bergabung ke klub
  static async joinClub(
    clubId: string | number,
    token: string
  ): Promise<boolean> {
    try {
      // Validasi token
      if (!token) {
        throw new Error("Authentication token is required");
      }

      // Panggil API
      const response = await fetch(`${API_URL}/api/v1/club/${clubId}/join`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Cek respons
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Failed to join club: ${response.statusText}`
        );
      }

      return true;
    } catch (error) {
      console.error(`Error joining club with id ${clubId}:`, error);
      throw error; // Re-throw untuk handling di UI layer
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
