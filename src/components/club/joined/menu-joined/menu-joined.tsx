// components/club/joined/menu-joined.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { pencil, racquet } from "@/public";
import EditClubDialog from "./edit-club-dialog";
import {
  ClubFormValues,
  CompetitionFormValues,
  MatchFormValues,
} from "@/constant/types/zodSchema";
import { ClubService } from "@/services/club-services";
import { toast } from "sonner";
import { MatchService } from "@/services/match-service";
import UnifiedEventDialog from "./create-event-dialog";
import { CompetitionsService } from "@/services/comp-services";

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
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle Create Match
  const handleCreateMatchSubmit = async (
    data: MatchFormValues & { banner_match?: File | null }
  ) => {
    setIsLoading(true);

    try {
      const payload = {
        club_id: clubId,
        name_match: data.event_title,
        match_date: data.date ?? "",
        location: data.location,
        description: data.description ?? "",
        price: data.price,
        gender_restriction: data.gender,
        skill_level: data.level,
        quota: Number(data.quota) || 10,
        banner_match: data.banner_match || null,
        TimeSlot: data.TimeSlot.map((slot) => ({
          start_time: slot.start_time,
          end_time: slot.end_time,
        })),
      };

      await MatchService.createMatch(payload, access_token);

      toast.success("Match created successfully! 🎉");
      setIsEventDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error creating match:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create match. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Create Competition
  const handleCreateCompSubmit = async (
    data: CompetitionFormValues & { banner?: File | null }
  ) => {
    setIsLoading(true);
    try {
      const payload = {
        club_id: clubId,
        name_comp: data.event_title,
        competitions_date: data.date ?? "", // Match backend field name
        location: data.location,
        description: data.description ?? "",
        price: data.price || "0",
        gender_restriction: data.gender,
        skill_level: data.level,
        quota: Number(data.quota) || 10,
        banner: data.banner || null, // Use 'banner' for competition
      };

      console.log("Competition Payload:", payload); // Debug log

      await CompetitionsService.createCompetition(payload, access_token);

      toast.success("Competition created successfully! 🎉");
      setIsEventDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error creating competition:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create competition. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Edit Club
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

      toast.success("Club updated successfully! 🎉");
      setIsEditDialogOpen(false);
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

  const menuItems = [
    {
      id: "create-event",
      label: "Create Event",
      icon: racquet,
      onClick: () => setIsEventDialogOpen(true),
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
            <div className="w-40 h-9 gap-2 flex items-center justify-center bg-background-button-rc rounded-lg transition-colors hover:opacity-80">
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

      {/* Unified Event Dialog (Match & Competition) */}
      <UnifiedEventDialog
        open={isEventDialogOpen}
        onOpenChange={setIsEventDialogOpen}
        onSubmitMatch={handleCreateMatchSubmit}
        onSubmitCompetition={handleCreateCompSubmit}
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
