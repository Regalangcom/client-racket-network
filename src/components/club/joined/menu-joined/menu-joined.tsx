// components/club/joined/menu-joined.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { comp_1, pencil, podium, racquet } from "@/public";
import EditClubDialog from "./edit-club-dialog";
import { ClubFormValues } from "@/constant/types/zodSchema";
import { ClubService } from "@/services/club-services";
import { toast } from "sonner";

interface MenuJoinedProps {
  clubId: string | number;
  access_token: string;
  isOwner: boolean;
  clubData?: ClubFormValues & { logoUrl?: string }; // Initial club data for editing
}

export default function MenuJoined({
  clubId,
  access_token,
  isOwner,
  clubData,
}: MenuJoinedProps) {
  const router = useRouter();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle Create Event
  const handleCreateEvent = () => {
    router.push(`/club/${clubId}/create-event`);
  };

  // Handle Edit Club - with submit logic (similar to create-club.tsx)
  const handleEditClubSubmit = async (
    data: ClubFormValues & { logo?: File | null }
  ) => {
    setIsLoading(true);
    try {
      const payload = {
        sport_category: data.sport_category,
        clubName: data.clubName,
        description: data.description || "",
        privacy: data.privacy,
        location: data.location,
        home_court: data.home_court,
        gender: data.gender,
        logo: data.logo || null,
      };

      await ClubService.updateClubs(clubId, payload, access_token);
      console.log("clubid", clubId);

      toast.success("Club updated successfully! 🎉");
      setIsEditDialogOpen(false);

      // Refresh the page data
      router.refresh();
    } catch (error) {
      console.error("Error updating club:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update club. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleActivities = () => {
    router.push(`/club/${clubId}/activities`);
  };

  const handleStats = () => {
    router.push(`/club/${clubId}/stats`);
  };

  const menuItems = [
    {
      id: "create-event",
      label: "Create Event",
      icon: racquet,
      onClick: handleCreateEvent,
    },
    {
      id: "edit-club",
      label: "Edit Club",
      icon: pencil,
      onClick: () => setIsEditDialogOpen(true),
    },
    {
      id: "activities",
      label: "Activities",
      icon: comp_1,
      onClick: handleActivities,
    },
    {
      id: "stats",
      label: "Stats",
      icon: podium,
      onClick: handleStats,
    },
  ];

  return (
    <>
      <div className="w-full grid grid-cols-4 gap-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className="flex flex-col items-center gap-2 group"
            onClick={item.onClick}
          >
            <div className="w-12 h-12 flex items-center justify-center bg-background-button-rc hover:bg-green-700 rounded-xl transition-colors">
              <Image
                src={item.icon}
                alt={item.label}
                className="w-5 h-5 text-white"
              />
            </div>
            <span className="text-xs font-semibold text-gray-700 text-center leading-tight">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Edit Club Dialog */}
      <EditClubDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditClubSubmit}
        isLoading={isLoading}
        initialData={clubData}
      />
    </>
  );
}
