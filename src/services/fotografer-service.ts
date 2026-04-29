import { FotograferEvent, FotograferInvitation } from "@/constant/types/fotografer";
import {
  MOCK_FOTOGRAFER_EVENTS,
  MOCK_INVITATIONS,
} from "@/constant/mock/fotografer-events";

export class FotograferService {
  static async getEvents(
    access_token: string | null = null
  ): Promise<FotograferEvent[]> {
    try {
      // TODO: uncomment when backend is ready
      // const headers: HeadersInit = {};
      // if (access_token) headers["Authorization"] = `Bearer ${access_token}`;
      //
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_URL_API}/api/v1/fotografer/events`,
      //   { headers, cache: "no-store" }
      // );
      // if (!response.ok) throw new Error("Failed to fetch events");
      // const data = await response.json();
      // return data.data || [];

      return MOCK_FOTOGRAFER_EVENTS;
    } catch (error) {
      console.error("Error fetching fotografer events:", error);
      return [];
    }
  }

  static async getEventById(
    id: number,
    access_token: string | null = null
  ): Promise<FotograferEvent | null> {
    try {
      // TODO: uncomment when backend is ready
      // const headers: HeadersInit = {};
      // if (access_token) headers["Authorization"] = `Bearer ${access_token}`;
      //
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_URL_API}/api/v1/fotografer/events/${id}`,
      //   { headers, cache: "no-store" }
      // );
      // if (response.status === 404) return null;
      // if (!response.ok) throw new Error("Failed to fetch event");
      // const data = await response.json();
      // return data.data;

      return MOCK_FOTOGRAFER_EVENTS.find((e) => e.id === id) ?? null;
    } catch (error) {
      console.error(`Error fetching fotografer event ${id}:`, error);
      return null;
    }
  }

  static async getEventInvitations(
    eventId: number,
    access_token: string | null = null
  ): Promise<FotograferInvitation[]> {
    try {
      // TODO: uncomment when backend is ready
      // const headers: HeadersInit = {};
      // if (access_token) headers["Authorization"] = `Bearer ${access_token}`;
      //
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_URL_API}/api/v1/fotografer/events/${eventId}/invitations`,
      //   { headers, cache: "no-store" }
      // );
      // if (!response.ok) throw new Error("Failed to fetch invitations");
      // const data = await response.json();
      // return data.data || [];

      return MOCK_INVITATIONS;
    } catch (error) {
      console.error(`Error fetching invitations for event ${eventId}:`, error);
      return [];
    }
  }
}
