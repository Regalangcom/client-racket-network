// components/club/joined/unified-event-dialog.tsx
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  CompetitionFormValues,
  MatchFormValues,
  matchFormSchema,
} from "@/constant/types/zodSchema";
import { LogoUpload } from "../../logo-upload";
import { GenderRadioGroup } from "../../gender-radio-group";
import { useLogoUpload } from "@/hooks/uploadLogo";
import { FORM_SECTIONS, LEVEL_OPTION } from "@/constant/match";
import { DatePickerField } from "../../date-picker/date-picker-field";
import { TimeSlotInput } from "../time-slot-input";

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
  const [eventType, setEventType] = useState<"Match" | "Competition">("Match");
  const { logoPreview, logoFile, handleLogoChange, resetLogo } =
    useLogoUpload();

  const form = useForm<MatchFormValues>({
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

  useEffect(() => {
    if (eventType === "Match") {
      form.setValue("type_event", "Match");
    } else {
      form.setValue("type_event", "Competition");
    }
  }, [eventType, form]);

  const handleFormSubmit = (data: MatchFormValues) => {
    console.log(`${eventType} Submitted Data:`, data);

    if (eventType === "Match") {
      onSubmitMatch({ ...data, banner_match: logoFile });
    } else if (eventType === "Competition") {
      // For competition, convert the data structure
      const compData = {
        type_event: "Competition",
        event_title: data.event_title,
        date: data.date,
        location: data.location,
        gender: data.gender,
        level: data.level,
        description: data.description,
        quota: data.quota,
        price: data.price,
      };
      onSubmitCompetition({ ...compData, banner: logoFile });
    }
  };

  useEffect(() => {
    if (!open) {
      form.reset({
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
      });
      resetLogo();
      setEventType("Match");
    }
  }, [open, form, resetLogo]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-xl max-h-[95vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-start">
            Create Event
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 text-start">
            Create a new event for your club
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-10 mt-4"
          >
            {/* Event Type Selector */}
            <div className="space-y-2">
              <Label className="text-lg font-normal">Event Type</Label>
              <Select
                value={eventType}
                onValueChange={(value: "Match" | "Competition") =>
                  setEventType(value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Match">Match</SelectItem>
                  <SelectItem value="Competition">Competition</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Hidden type_event field */}
            <input
              type="hidden"
              {...form.register("type_event")}
              value={eventType}
            />

            {/* Basic Info */}
            <div className="space-y-3">
              <Label className="text-lg font-normal">
                {FORM_SECTIONS.BASIC_INFO}
              </Label>

              <FormField
                control={form.control}
                name="event_title"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-normal text-gray-700">
                      {eventType === "Match"
                        ? "Event title"
                        : "Competition title"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Enter ${eventType.toLowerCase()} title`}
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Date Picker */}
              <DatePickerField form={form} />

              <LogoUpload
                label="Banner"
                pictureUrl={logoPreview}
                onLogoChange={handleLogoChange}
              />

              {/* TIME SLOT - ONLY FOR MATCH */}
              {eventType === "Match" && (
                <FormField
                  control={form.control}
                  name="TimeSlot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-normal text-gray-700">
                        Time Slots
                      </FormLabel>
                      <FormControl>
                        <TimeSlotInput
                          value={field.value}
                          onChange={field.onChange}
                          error={form.formState.errors.TimeSlot?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal text-gray-700">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Enter ${eventType.toLowerCase()} description`}
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-lg font-normal">
                    {FORM_SECTIONS.LOCATION}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter location"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Level */}
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-lg font-normal">
                    {FORM_SECTIONS.LEVEL}
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {LEVEL_OPTION.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-normal">
                    {FORM_SECTIONS.GENDER}
                  </FormLabel>
                  <FormControl>
                    <GenderRadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Participant */}
            <div className="space-y-3">
              <Label className="text-lg font-normal">
                {FORM_SECTIONS.PARTICIPANT}
              </Label>
              <FormField
                control={form.control}
                name="quota"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormControl>
                      <Input
                        placeholder="Enter amount participant"
                        className="w-full"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Price */}
            <div className="space-y-3">
              <Label className="text-lg font-normal">
                {FORM_SECTIONS.PRICE}
              </Label>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormControl>
                      <Input
                        placeholder="Enter price"
                        className="w-full"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#174038] hover:bg-[#083d30] text-[#E1FFA0] py-3"
            >
              {isLoading ? "Creating..." : `Create ${eventType}`}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UnifiedEventDialog;
