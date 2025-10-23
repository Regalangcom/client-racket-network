// components/club/join-button.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { joinClubAction } from "@/app/(application)/club/[id]/action";
import { Loader2 } from "lucide-react";

interface JoinButtonProps {
  clubId: string | number;
  accessToken?: string;
  privacy: string;
  isOwner: boolean;
  // ✅ NEW: Initial status from server
  initialStatus?: {
    isMember: boolean;
    requestStatus: "PENDING" | "APPROVED" | "REJECTED" | null;
  };
}

/**
 * JoinButton Component
 * Handles user join action for club
 * Public club → Direct join (JOINED)
 * Private club → Send request (PENDING)
 *
 * ✅ Now tracks initial status from server
 */
export default function JoinButton({
  clubId,
  accessToken,
  privacy,
  isOwner,
  initialStatus,
}: JoinButtonProps) {
  // ✅ NEW: Determine initial state from server data
  const getInitialJoinStatus = () => {
    if (!initialStatus) return "NOT_JOINED";

    // If user is already a member
    if (initialStatus.isMember) return "JOINED";

    // If user has pending request
    if (initialStatus.requestStatus === "PENDING") return "PENDING";

    // Default: not joined
    return "NOT_JOINED";
  };

  const [joinStatus, setJoinStatus] = useState<
    "NOT_JOINED" | "PENDING" | "JOINED"
  >(getInitialJoinStatus());

  const [isJoining, setIsJoining] = useState(false);

  // ✅ NEW: Update state when initialStatus changes (after revalidation)
  useEffect(() => {
    setJoinStatus(getInitialJoinStatus());
  }, [initialStatus]);

  // Owner shouldn't see join button
  if (isOwner) return null;

  const handleJoin = async () => {
    // Check authentication
    if (!accessToken) {
      toast.error("Please login first to join this club");
      return;
    }

    setIsJoining(true);

    try {
      // Call server action
      const result = await joinClubAction(String(clubId), accessToken);

      if (result.success) {
        if (result.status === "JOINED") {
          setJoinStatus("JOINED");
          toast.success("Successfully joined the club!");
        } else if (result.status === "PENDING") {
          setJoinStatus("PENDING");
          toast.info("Join request sent. Waiting for owner approval.");
        }
      } else {
        toast.error(result.message || "Failed to join club");
      }
    } catch (error: any) {
      console.error("Join error:", error);
      toast.error("An error occurred while joining the club");
    } finally {
      setIsJoining(false);
    }
  };

  // Determine button configuration
  const getButtonConfig = () => {
    if (isJoining) {
      return {
        text: "Processing...",
        disabled: true,
        icon: <Loader2 className="h-4 w-4 mr-2 animate-spin" />,
      };
    }

    if (joinStatus === "JOINED") {
      return {
        text: "Joined ✓",
        disabled: true,
        icon: null,
      };
    }

    if (joinStatus === "PENDING") {
      return {
        text: "Pending Approval",
        disabled: true,
        icon: null,
      };
    }

    // Default - not joined
    return {
      text: privacy === "PRIVATE" ? "Request to Join" : "Join",
      disabled: false,
      icon: null,
    };
  };

  const buttonConfig = getButtonConfig();

  return (
    <Button
      onClick={handleJoin}
      disabled={buttonConfig.disabled}
      className="w-full py-4 bg-green-900 border-[#174038] border text-[#E1FFA0] font-semibold rounded-md hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {buttonConfig.icon}
      {buttonConfig.text}
    </Button>
  );
}
