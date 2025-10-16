import { ClubFormData } from "@/constant/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://your-api.com/api";

// Helper function to get auth token
const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  }
  return null;
};

// Generic fetch wrapper with auth
async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getAuthToken();

  const headers: HeadersInit = {
    ...options.headers,
  };

  // Add Authorization header if token exists
  if (token) {
    // headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle unauthorized
  if (response.status === 401) {
    // Clear token and redirect to login
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }
  }

  return response;
}

// Club Service
export const clubService = {
  // Create new club
  async createClub(data: ClubFormData) {
    const formData = new FormData();

    formData.append("sport", data.sport);
    formData.append("name", data.clubName); // adjust key based on your API
    formData.append("description", data.description);
    formData.append("privacy", data.privacy);
    formData.append("location", data.location);
    formData.append("venue", data.venue);
    formData.append("gender", data.gender);

    if (data.logo) {
      formData.append("logo", data.logo);
    }

    const response = await fetchWithAuth("/clubs", {
      method: "POST",
      body: formData,
      // Don't set Content-Type for FormData, browser will set it with boundary
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Failed to create club" }));
      throw new Error(
        error.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  },

  // Get all clubs
  async getClubs(params?: {
    page?: number;
    limit?: number;
    sport?: string;
    location?: string;
  }) {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.sport) queryParams.append("sport", params.sport);
    if (params?.location) queryParams.append("location", params.location);

    const queryString = queryParams.toString();
    const endpoint = `/clubs${queryString ? `?${queryString}` : ""}`;

    const response = await fetchWithAuth(endpoint, {
      method: "GET",
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Failed to fetch clubs" }));
      throw new Error(
        error.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  },

  // Get single club by ID
  async getClubById(id: string) {
    const response = await fetchWithAuth(`/clubs/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Failed to fetch club" }));
      throw new Error(
        error.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  },

  // Update club
  async updateClub(id: string, data: Partial<ClubFormData>) {
    const formData = new FormData();

    if (data.sport) formData.append("sport", data.sport);
    if (data.clubName) formData.append("name", data.clubName);
    if (data.description) formData.append("description", data.description);
    if (data.privacy) formData.append("privacy", data.privacy);
    if (data.location) formData.append("location", data.location);
    if (data.venue) formData.append("venue", data.venue);
    if (data.gender) formData.append("gender", data.gender);
    if (data.logo) formData.append("logo", data.logo);

    const response = await fetchWithAuth(`/clubs/${id}`, {
      method: "PATCH", // or PUT depending on your API
      body: formData,
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Failed to update club" }));
      throw new Error(
        error.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  },

  // Delete club
  async deleteClub(id: string) {
    const response = await fetchWithAuth(`/clubs/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Failed to delete club" }));
      throw new Error(
        error.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  },

  // Join club
  async joinClub(clubId: string) {
    const response = await fetchWithAuth(`/clubs/${clubId}/join`, {
      method: "POST",
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Failed to join club" }));
      throw new Error(
        error.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  },

  // Leave club
  async leaveClub(clubId: string) {
    const response = await fetchWithAuth(`/clubs/${clubId}/leave`, {
      method: "POST",
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Failed to leave club" }));
      throw new Error(
        error.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  },
};
