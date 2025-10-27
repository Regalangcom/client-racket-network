"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CreateClubDialog from "./create-club-dialog";
import { toast } from "sonner";
import { ClubFormValues } from "@/constant/types/zodSchema";
import { ClubService } from "@/services/club-services";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CreateClubProps {
  access_token: string | null;
}
const CreateClub: React.FC<CreateClubProps> = ({ access_token }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const handleSubmit = async (
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

      const result = await ClubService.createClubs(
        payload,
        access_token as string
      );

      // Success handling
      toast.success("Club created successfully! 🎉");

      // Close dialog
      setIsDialogOpen(false);

      router.push(`/club/${result?.id}`);
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
