// components/club/joined/create-event-dialog.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MatchFormValues,
  matchFormSchema,
  CompetitionFormValues,
  competitionsFormSchema,
} from "@/constant/types/zodSchema";
import { useLogoUpload } from "@/hooks/uploadLogo";
import { EventFormFields } from "@/components/form/event-form-fields";

type EventType = "Match" | "Competition";

interface UnifiedEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitMatch: (
    data: MatchFormValues & { banner_match?: File | null }
  ) => void;
  onSubmitCompetition: (
    data: CompetitionFormValues & { banner?: File | null }
  ) => void;
  isLoading?: boolean;
}

const UnifiedEventDialog: React.FC<UnifiedEventDialogProps> = ({
  open,
  onOpenChange,
  onSubmitMatch,
  onSubmitCompetition,
  isLoading = false,
}) => {
  const [eventType, setEventType] = useState<EventType>("Match");
  const { logoPreview, logoFile, handleLogoChange, resetLogo } =
    useLogoUpload();

  // Separate forms with their own schemas
  const matchForm = useForm<MatchFormValues>({
    resolver: zodResolver(matchFormSchema),
    defaultValues: {
      type_event: "Match",
      event_title: "",
      date: "",
      dateRange: { from: "", to: "" },
      TimeSlot: [],
      location: "",
      gender: "all",
      level: "Beginner",
      banner_match: "",
      description: "",
      quota: "",
      price: "",
    },
  });

  const compForm = useForm<CompetitionFormValues>({
    resolver: zodResolver(competitionsFormSchema),
    defaultValues: {
      type_event: "Competition",
      event_title: "",
      date: "",
      location: "",
      gender: "all",
      level: "Beginner",
      banner: "",
      description: "",
      quota: "",
      price: "",
    },
  });

  // Handle event type change
  const handleEventTypeChange = (value: EventType) => {
    setEventType(value);
    resetLogo();
  };

  // Handle form submission
  const handleFormSubmit = (data: any) => {
    if (eventType === "Match") {
      console.log("Match Submitted Data:", data);
      onSubmitMatch({ ...data, banner_match: logoFile });
    } else {
      console.log("Competition Submitted Data:", data);
      onSubmitCompetition({ ...data, banner: logoFile });
    }
  };

  // // Reset forms when dialog closes
  // useEffect(() => {
  //   if (!open) {
  //     setEventType("Match");
  //     matchForm.reset({
  //       type_event: "Match",
  //       event_title: "",
  //       date: "",
  //       dateRange: { from: "", to: "" },
  //       TimeSlot: [],
  //       location: "",
  //       gender: "all",
  //       level: "Beginner",
  //       banner_match: "",
  //       description: "",
  //       quota: "",
  //       price: "",
  //     });
  //     compForm.reset({
  //       type_event: "Competition",
  //       event_title: "",
  //       date: "",
  //       location: "",
  //       gender: "all",
  //       level: "Beginner",
  //       banner: "",
  //       description: "",
  //       quota: "",
  //       price: "",
  //     });
  //     resetLogo();
  //   }
  // }, [open, matchForm, compForm, resetLogo]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-xl max-h-[95vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-start">
            Create Event
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 text-start">
            Create a new {eventType.toLowerCase()} event for your club
          </DialogDescription>
        </DialogHeader>

        {/* Event Type Selector */}
        <div className="space-y-2 border-b pb-4">
          <Label className="text-sm font-medium">Event Type</Label>
          <Select value={eventType} onValueChange={handleEventTypeChange}>
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Match">
                <div className="flex flex-col items-start">
                  <span className="font-medium">Match</span>
                  <span className="text-xs text-muted-foreground">
                    Event with time slots
                  </span>
                </div>
              </SelectItem>
              <SelectItem value="Competition">
                <div className="flex flex-col items-start">
                  <span className="font-medium">Competition</span>
                  <span className="text-xs text-muted-foreground">
                    Tournament event
                  </span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Match Form */}
        {eventType === "Match" && (
          <Form {...matchForm}>
            <form
              onSubmit={matchForm.handleSubmit(handleFormSubmit)}
              className="space-y-10 mt-4"
            >
              <input
                type="hidden"
                {...matchForm.register("type_event")}
                value="Match"
              />

              <EventFormFields
                control={matchForm.control}
                eventType="Match"
                logoPreview={logoPreview}
                onLogoChange={(file) => file && handleLogoChange(file)}
                isLoading={isLoading}
                form={matchForm}
                errors={matchForm.formState.errors}
              />
            </form>
          </Form>
        )}

        {/* Competition Form */}
        {eventType === "Competition" && (
          <Form {...compForm}>
            <form
              onSubmit={compForm.handleSubmit(handleFormSubmit)}
              className="space-y-10 mt-4"
            >
              <input
                type="hidden"
                {...compForm.register("type_event")}
                value="Competition"
              />

              <EventFormFields
                control={compForm.control}
                eventType="Competition"
                logoPreview={logoPreview}
                onLogoChange={(file) => file && handleLogoChange(file)}
                isLoading={isLoading}
                form={compForm}
                errors={compForm.formState.errors}
              />
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UnifiedEventDialog;
