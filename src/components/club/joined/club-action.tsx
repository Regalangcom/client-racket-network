// components/club/club-actions.tsx
"use client";

import JoinButton from "./join-button";
import JoinRequestsManager from "./join-req-manager";
import { JoinRequestItem } from "@/services/club-services";
import MenuJoined from "./menu-joined/menu-joined";

interface ClubActionsProps {
  clubId: string | number;
  accessToken?: string;
  privacy: string;
  isOwner: boolean;
  joinRequests: JoinRequestItem[];
  // ✅ NEW: User join status from server
  userJoinStatus?: {
    isMember: boolean;
    requestStatus: "PENDING" | "APPROVED" | "REJECTED" | null;
  };
}

/**
 * ClubActions Component
 * Conditional wrapper that renders:
 * - JoinButton (if user is NOT owner)
 * - JoinRequestsManager (if user IS owner)
 */
export default function ClubActions({
  clubId,
  accessToken,
  privacy,
  isOwner,
  joinRequests,
  userJoinStatus,
}: ClubActionsProps) {
  const handleCreateEvent = () => {
    console.log("Navigate to create event");
    // TODO: Implement navigation
  };

  const handleEditClub = () => {
    console.log("Navigate to edit club");
    // TODO: Implement navigation
  };

  const handleActivities = () => {
    console.log("Navigate to activities");
    // TODO: Implement navigation
  };

  const handleStats = () => {
    console.log("Navigate to stats");
    // TODO: Implement navigation
  };
  return (
    <div>
      {/* User Actions - Join Button */}
      {!isOwner && (
        <JoinButton
          clubId={clubId}
          accessToken={accessToken}
          privacy={privacy}
          isOwner={isOwner}
          initialStatus={userJoinStatus} // ✅ Pass initial status
        />
      )}
      {isOwner && accessToken && (
        <MenuJoined
          clubId={clubId}
          // accessToken={accessToken}
          onCreateEvent={handleCreateEvent}
          onEditClub={handleEditClub}
          onActivities={handleActivities}
          onStats={handleStats}
        />
      )}

      {/* Owner Actions - Manage Join Requests */}
      {isOwner && accessToken && (
        <JoinRequestsManager
          clubId={clubId}
          accessToken={accessToken}
          isOwner={isOwner}
          initialRequests={joinRequests}
        />
      )}
    </div>
  );
}
