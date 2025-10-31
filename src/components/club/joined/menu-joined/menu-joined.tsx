// components/club/joined/menu-joined.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { pencil, racquet } from "@/public";
import EditClubDialog from "./edit-club-dialog";
import { ClubFormValues, MatchFormValues } from "@/constant/types/zodSchema";
import { ClubService } from "@/services/club-services";
import { toast } from "sonner";
import { MatchService } from "@/services/match-service";
import CreateEventDialog from "./create-event-dialog";
import CreateCompDialog from "./create-comp-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const [isCreateCompDialogOpen, setIsCreateCompDialogOpen] = useState(false);
  const [isTypeSelectionOpen, setIsTypeSelectionOpen] = useState(false);
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
        price: data.price || "0",
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
      setIsCreateEventDialogOpen(false);
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
  const handleCreateCompSubmit = () => {
    console.log("data");
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

  // Handle Type Selection
  const handleSelectEventType = (type: "Match" | "Competition") => {
    setIsTypeSelectionOpen(false);
    if (type === "Match") {
      setIsCreateEventDialogOpen(true);
    } else {
      setIsCreateCompDialogOpen(true);
    }
  };

  const menuItems = [
    {
      id: "create-event",
      label: "Create Event",
      icon: racquet,
      onClick: () => setIsTypeSelectionOpen(true),
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

      {/* Type Selection Dialog */}
      <Dialog open={isTypeSelectionOpen} onOpenChange={setIsTypeSelectionOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Select Event Type
            </DialogTitle>
            <DialogDescription>
              Choose the type of event you want to create
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Match Button */}
            <Button
              variant="outline"
              className="h-auto justify-start text-left p-4 hover:bg-accent"
              onClick={() => handleSelectEventType("Match")}
            >
              <div className="flex flex-col items-start gap-1 w-full">
                <p className="text-base font-semibold">Match</p>
                <p className="text-sm text-muted-foreground">
                  Create a match event with time slots
                </p>
              </div>
            </Button>

            {/* Competition Button */}
            <Button
              variant="outline"
              className="h-auto justify-start text-left p-4 hover:bg-accent"
              onClick={() => handleSelectEventType("Competition")}
            >
              <div className="flex flex-col items-start gap-1 w-full">
                <p className="text-base font-semibold">Competition</p>
                <p className="text-sm text-muted-foreground">
                  Create a competition or tournament event
                </p>
              </div>
            </Button>
          </div>

          <div className="flex justify-end">
            <Button
              variant="ghost"
              onClick={() => setIsTypeSelectionOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Match Dialog */}
      <CreateEventDialog
        open={isCreateEventDialogOpen}
        onOpenChange={setIsCreateEventDialogOpen}
        onSubmit={handleCreateMatchSubmit}
        isLoading={isLoading}
      />

      {/* Competition Dialog */}
      <CreateCompDialog
        open={isCreateCompDialogOpen}
        onOpenChange={setIsCreateCompDialogOpen}
        onSubmit={handleCreateCompSubmit}
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
