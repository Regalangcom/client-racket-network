// File: components/club/join-requests-tab.tsx

"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ClubService } from "@/services/club-services";
import { toast } from "sonner";
import { Check, X, Loader2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { JoinRequestItem } from "@/services/club-services";

interface JoinRequestsTabProps {
  clubId: string | number;
  accessToken: string;
  isOwner: boolean;
}

const JoinRequestsTab: React.FC<JoinRequestsTabProps> = ({
  clubId,
  accessToken,
  isOwner,
}) => {
  const [requests, setRequests] = useState<JoinRequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<number[]>([]);

  // Ambil data permintaan join
  const fetchJoinRequests = async () => {
    try {
      setLoading(true);
      const result = await ClubService.getClubJoinRequests(clubId, accessToken);
      setRequests(result || []);
    } catch (error: any) {
      console.error("Error fetching join requests:", error);
      toast.error(error.message || "Failed to fetch join requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOwner && accessToken) {
      fetchJoinRequests();
    }
  }, [clubId, accessToken, isOwner]);

  // Handle approve request
  const handleApprove = async (requestId: number) => {
    setProcessingIds((prev) => [...prev, requestId]);
    try {
      await ClubService.approveJoinRequest(requestId, accessToken);
      toast.success("Join request approved successfully!");
      // Update list dengan menghapus request yang diapprove
      setRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error: any) {
      console.error("Error approving request:", error);
      toast.error(error.message || "Failed to approve request");
    } finally {
      setProcessingIds((prev) => prev.filter((id) => id !== requestId));
    }
  };

  // Handle reject request
  const handleReject = async (requestId: number) => {
    setProcessingIds((prev) => [...prev, requestId]);
    try {
      await ClubService.rejectJoinRequest(requestId, accessToken);
      toast.success("Join request rejected");
      // Update list dengan menghapus request yang direject
      setRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error: any) {
      console.error("Error rejecting request:", error);
      toast.error(error.message || "Failed to reject request");
    } finally {
      setProcessingIds((prev) => prev.filter((id) => id !== requestId));
    }
  };

  // Jika bukan owner, jangan tampilkan apa-apa
  if (!isOwner) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Join Requests</h2>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading requests...</span>
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No pending join requests</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
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
                  <p className="text-sm text-gray-500">{request.user.email}</p>
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
                  disabled={processingIds.includes(request.id)}
                >
                  {processingIds.includes(request.id) ? (
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
                  disabled={processingIds.includes(request.id)}
                >
                  {processingIds.includes(request.id) ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <X className="h-4 w-4 mr-1" /> Reject
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinRequestsTab;
