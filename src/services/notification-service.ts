// src/services/notification-service.ts
import {
  Notification,
  NotificationResponse,
  MarkAsReadResponse,
} from "@/constant/types/notification";

export class NotificationService {
  static async getNotifications(
    accessToken: string
  ): Promise<Notification[]> {
    try {
      const headers: HeadersInit = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/notification`,
        {
          headers,
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch notifications: ${response.statusText}`);
      }

      const data: NotificationResponse = await response.json();
      return data.data?.notifications || [];
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  }

  static async markAsRead(
    notificationId: number,
    accessToken: string
  ): Promise<MarkAsReadResponse> {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/notification/${notificationId}/read`,
        {
          method: "PATCH",
          headers,
          cache: "no-store",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Failed to mark notification as read: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`Error marking notification ${notificationId} as read:`, error);
      throw error;
    }
  }
}
