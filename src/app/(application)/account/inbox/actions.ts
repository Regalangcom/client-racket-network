"use server";

import { revalidatePath } from "next/cache";
import { NotificationService } from "@/services/notification-service";

export async function markNotificationAsRead(
  notificationId: number,
  accessToken: string
) {
  try {
    await NotificationService.markAsRead(notificationId, accessToken);
    revalidatePath("/account/inbox");
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to mark notification as read",
    };
  }
}
