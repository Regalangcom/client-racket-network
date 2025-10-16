"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CreateClubDialog from "./create-club-dialog";
import { toast } from "sonner";
// import { clubService } from "@/services/clubService";
import { ClubFormValues } from "@/constant/types/zodSchema";

const CreateClub: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (
    data: ClubFormValues & { logo?: File | null }
  ) => {
    setIsLoading(true);

    try {
      // Prepare data for API
      const clubData = {
        sport: data.sport,
        clubName: data.clubName,
        description: data.description || "",
        privacy: data.privacy,
        location: data.location,
        venue: data.venue,
        gender: data.gender,
        logo: data.logo || null,
        logoPreview: "", // Not needed for API
      };

      // Call API using service layer
      // const result = await clubService.createClub(clubData);

      // Success handling
      toast.success("Club created successfully! 🎉");

      // Close dialog
      setIsDialogOpen(false);

      // Optional: Redirect or refresh data
      // router.push(`/clubs/${result.data.id}`);
      // or
      // window.location.reload();

      console.log("Club created:", "");
    } catch (error) {
      console.error("Error creating club:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create club. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="max-w-full sm:max-w-[87%] flex flex-col bg-slate-900 rounded-xl transition-all">
        <div className="relative">
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="border-[#174038] border w-full text-black hover:bg-background-button-rc hover:text-white bg-background-card pr-10"
          >
            Create a Club
          </Button>
        </div>
      </section>

      <CreateClubDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  );
};

export default CreateClub;
