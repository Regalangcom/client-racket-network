// app/club/[id]/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { ClubService } from "@/services/club-services";

/**
 * Server Action: Join Club
 * User joins a club (public = instant, private = pending)
 */
export async function joinClubAction(clubId: string, accessToken: string) {
  try {
    const result = await ClubService.joinClub(clubId, accessToken);

    // Revalidate the club page to refresh data
    revalidatePath(`/club/${clubId}`);

    return {
      success: true,
      status: result.status, // "JOINED" or "PENDING"
      message: result.message,
    };
  } catch (error: any) {
    console.error("Join club action error:", error);
    return {
      success: false,
      message: error.message || "Failed to join club",
    };
  }
}

/**
 * Server Action: Approve Join Request
 * Owner approves a user's join request
 */
export async function approveJoinRequestAction(
  requestId: number,
  clubId: string,
  accessToken: string
) {
  try {
    const result = await ClubService.approveJoinRequest(requestId, accessToken);

    // Revalidate to refresh join requests list
    revalidatePath(`/club/${clubId}`);

    return {
      success: true,
      message: result.message || "Request approved successfully",
    };
  } catch (error: any) {
    console.error("Approve request action error:", error);
    return {
      success: false,
      message: error.message || "Failed to approve request",
    };
  }
}

/**
 * Server Action: Reject Join Request
 * Owner rejects a user's join request
 */
export async function rejectJoinRequestAction(
  requestId: number,
  clubId: string,
  accessToken: string
) {
  try {
    const result = await ClubService.rejectJoinRequest(requestId, accessToken);

    // Revalidate to refresh join requests list
    revalidatePath(`/club/${clubId}`);

    return {
      success: true,
      message: result.message || "Request rejected successfully",
    };
  } catch (error: any) {
    console.error("Reject request action error:", error);
    return {
      success: false,
      message: error.message || "Failed to reject request",
    };
  }
}
