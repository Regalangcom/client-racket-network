// components/club/joined/create-event-dialog.tsx
import React, { useEffect } from "react";
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
import { MatchFormValues, matchFormSchema } from "@/constant/types/zodSchema";
import { LogoUpload } from "../../logo-upload";
import { GenderRadioGroup } from "../../gender-radio-group";
import { useLogoUpload } from "@/hooks/uploadLogo";
import {
  TYPE_EVENT,
  TIME_OPTIONS,
  FORM_SECTIONS,
  LEVEL_OPTION,
} from "@/constant/match";
import { DatePickerField } from "../../date-picker/date-picker-field";

interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: MatchFormValues & { banner_match?: File | null }) => void;
  isLoading?: boolean;
  initialData?: MatchFormValues & { banner_match?: string };
}

const CreateEventDialog: React.FC<CreateEventDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
  initialData,
}) => {
  const { logoPreview, logoFile, handleLogoChange, resetLogo } =
    useLogoUpload();

  const form = useForm<MatchFormValues>({
    resolver: zodResolver(matchFormSchema),
    defaultValues: initialData || {
      type_event: "",
      event_title: "",
      date: "",
      dateRange: { from: "", to: "" },
      time: "PUBLIC",
      location: "",
      gender: "all",
      level: "Beginner",
      banner_match: "",
      description: "",
    },
  });

  useEffect(() => {
    if (open && initialData) {
      form.reset(initialData);
    }
  }, [open, initialData, form]);

  const handleFormSubmit = (data: MatchFormValues) => {
    console.log("Form submitted:", data);
    onSubmit({ ...data, banner_match: logoFile });
  };

  useEffect(() => {
    if (!open) {
      form.reset();
      resetLogo();
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
            Create a new match or competition event for your club
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-10 mt-4"
          >
            {/* Sport Selection */}
            <FormField
              control={form.control}
              name="type_event"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-lg font-normal">
                    {FORM_SECTIONS.TYPE}
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a sport" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TYPE_EVENT.map((sport) => (
                        <SelectItem key={sport.value} value={sport.value}>
                          {sport.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Basic Info */}
            <div className="space-y-3">
              <Label className="text-lg font-normal">
                {FORM_SECTIONS.BASIC_INFO}
              </Label>

              <LogoUpload
                label="Banner"
                pictureUrl={logoPreview}
                onLogoChange={handleLogoChange}
              />

              <FormField
                control={form.control}
                name="event_title"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-normal text-gray-700">
                      Event title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter event title"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ DATE PICKER - CLEAN & SIMPLE! */}
              <DatePickerField form={form} />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal text-gray-700">
                      Time
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TIME_OPTIONS.map((time) => (
                          <SelectItem key={time.value} value={time.value}>
                            {time.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        placeholder="Enter event description"
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

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#174038] hover:bg-[#083d30] text-[#E1FFA0] py-3"
            >
              {isLoading ? "Creating..." : "Create Match"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventDialog;
