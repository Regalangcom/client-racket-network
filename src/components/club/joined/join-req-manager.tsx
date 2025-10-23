// components/club/join-requests-manager.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Check, X, Loader2 } from "lucide-react";
import {
  approveJoinRequestAction,
  rejectJoinRequestAction,
} from "@/app/(application)/club/[id]/action";
import { JoinRequestItem } from "@/services/club-services";

interface JoinRequestsManagerProps {
  clubId: string | number;
  accessToken: string;
  isOwner: boolean;
  initialRequests: JoinRequestItem[];
}

/**
 * JoinRequestsManager Component
 * Displays join requests and handles approve/reject actions
 * OWNER ONLY
 */
export default function JoinRequestsManager({
  clubId,
  accessToken,
  isOwner,
  initialRequests,
}: JoinRequestsManagerProps) {
  const [requests, setRequests] = useState<JoinRequestItem[]>(initialRequests);
  const [processingIds, setProcessingIds] = useState<Set<number>>(new Set());

  // Only show for owner
  if (!isOwner) return null;

  const handleApprove = async (requestId: number) => {
    setProcessingIds((prev) => new Set(prev).add(requestId));

    try {
      const result = await approveJoinRequestAction(
        requestId,
        String(clubId),
        accessToken
      );

      if (result.success) {
        toast.success(result.message || "Request approved successfully!");
        // Remove approved request from list (will be refreshed by revalidate)
        setRequests((prev) => prev.filter((req) => req.id !== requestId));
      } else {
        toast.error(result.message || "Failed to approve request");
      }
    } catch (error: any) {
      console.error("Approve error:", error);
      toast.error("An error occurred while approving the request");
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const handleReject = async (requestId: number) => {
    setProcessingIds((prev) => new Set(prev).add(requestId));

    try {
      const result = await rejectJoinRequestAction(
        requestId,
        String(clubId),
        accessToken
      );

      if (result.success) {
        toast.success(result.message || "Request rejected");
        // Remove rejected request from list
        setRequests((prev) => prev.filter((req) => req.id !== requestId));
      } else {
        toast.error(result.message || "Failed to reject request");
      }
    } catch (error: any) {
      console.error("Reject error:", error);
      toast.error("An error occurred while rejecting the request");
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Join Requests</h2>

      {requests.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No pending join requests</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => {
            const isProcessing = processingIds.has(request.id);

            return (
              <div
                key={request.id}
                className="bg-white shadow rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex items-center flex-1">
                  <Avatar className="mr-4 h-12 w-12">
                    <AvatarImage
                      src={request.user.profile?.picture || ""}
                      alt={request.user.username}
                    />
                    <AvatarFallback className="bg-gray-200">
                      {request.user.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-grow">
                    <p className="font-semibold text-base">
                      {request.user.username}
                    </p>
                    <p className="text-sm text-gray-500">
                      {request.user.email}
                    </p>
                    {request.user.profile?.location && (
                      <p className="text-xs text-gray-400">
                        📍 {request.user.profile.location}
                      </p>
                    )}
                    {request.message && (
                      <p className="text-sm mt-1 italic text-gray-600">
                        {request.message}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      Requested:{" "}
                      {new Date(request.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleApprove(request.id)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-1" /> Approve
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50"
                    onClick={() => handleReject(request.id)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <X className="h-4 w-4 mr-1" /> Reject
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
