// components/club/joined/menu-joined.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { comp_1, pencil, podium, racquet } from "@/public";
import EditClubDialog from "./edit-club-dialog";
import { ClubFormValues, MatchFormValues } from "@/constant/types/zodSchema";
import { ClubService } from "@/services/club-services";
import { toast } from "sonner";
import { MatchService } from "@/services/match-service";
import CreateEventDialog from "./create-event-dialog";

interface MenuJoinedProps {
  clubId: string | number;
  access_token: string;
  isOwner: boolean;
  clubData?: ClubFormValues & { logoUrl?: string };
}

export default function MenuJoined({
  clubId,
  access_token,
  isOwner,
  clubData,
}: MenuJoinedProps) {
  const router = useRouter();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateEventDialogOpen, setIsCreateEventDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle Create Event
  const handleCreateEventSubmit = async (
    data: MatchFormValues & { banner_match?: File | null }
  ) => {
    setIsLoading(true);
    try {
      const payload = {
        club_id: clubId,
        name_match: data.event_title,
        match_date: data.date ?? "",
        match_time: data.time,
        location: data.location,
        description: data.description ?? "",
        price: "0",
        gender_restriction: data.gender,
        skill_level: data.level,
        quota: 10,
        banner_match: data.banner_match || null,
      };

      await MatchService.createMatch(payload, access_token);

      toast.success("Event created successfully! 🎉");
      setIsCreateEventDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create event. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
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
      onClick: () => setIsCreateEventDialogOpen(true),
    },
    {
      id: "edit-club",
      label: "Edit Club",
      icon: pencil,
      onClick: () => setIsEditDialogOpen(true),
    },
  ];

  return (
    <>
      <div className="w-full grid grid-cols-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className="flex flex-col items-center gap-2 group"
            onClick={item.onClick}
          >
            <div className="w-40 h-9 gap-4 flex items-center justify-center bg-background-button-rc  rounded-lg transition-colors">
              <Image
                src={item.icon}
                alt={item.label}
                className="w-5 h-5 text-white"
              />
              <span className="text-xs font-semibold text-white text-center leading-tight">
                {item.label}
              </span>
            </div>
          </button>
        ))}
      </div>

      <CreateEventDialog
        open={isCreateEventDialogOpen}
        onOpenChange={setIsCreateEventDialogOpen}
        onSubmit={handleCreateEventSubmit}
        isLoading={isLoading}
      />

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
