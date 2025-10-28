// components/club/club-actions.tsx
"use client";

import JoinButton from "./join-button";
import JoinRequestsManager from "./join-req-manager";
import { JoinRequestItem } from "@/services/club-services";
import MenuJoined from "./menu-joined/menu-joined";
import { ClubFormValues } from "@/constant/types/zodSchema";

interface ClubActionsProps {
  clubId: string | number;
  accessToken?: string;
  privacy: string;
  isOwner: boolean;
  joinRequests: JoinRequestItem[];
  userJoinStatus?: {
    isMember: boolean;
    requestStatus: "PENDING" | "APPROVED" | "REJECTED" | null;
  };
  clubData?: ClubFormValues & { logoUrl?: string };
}

export default function ClubActions({
  clubId,
  accessToken,
  privacy,
  isOwner,
  joinRequests,
  userJoinStatus,
  clubData,
}: ClubActionsProps) {
  return (
    <div>
      {/* User Actions - Join Button */}
      {!isOwner && (
        <JoinButton
          clubId={clubId}
          accessToken={accessToken}
          privacy={privacy}
          isOwner={isOwner}
          initialStatus={userJoinStatus}
        />
      )}
      {isOwner && accessToken && (
        <MenuJoined
          clubId={clubId}
          isOwner={isOwner}
          access_token={accessToken}
          clubData={clubData}
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
