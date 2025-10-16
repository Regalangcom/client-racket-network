import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { clubFormSchema, ClubFormValues } from "@/constant/types/zodSchema";
import { LogoUpload } from "./logo-upload";
import { PrivacyRadioGroup } from "./privacy-radio-group";
import { GenderRadioGroup } from "./gender-radio-group";
import { useLogoUpload } from "@/hooks/uploadLogo";

import {
  SPORT_OPTIONS,
  LOCATION_OPTIONS,
  VENUE_OPTIONS,
  FORM_SECTIONS,
} from "@/constant/club-tags";

interface CreateClubDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ClubFormValues & { logo?: File | null }) => void;
  isLoading?: boolean;
  title?: string;
}

export const CreateClubDialog: React.FC<CreateClubDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
  title = "Create a club",
}) => {
  // Custom hooks
  const { logoPreview, logoFile, handleLogoChange, resetLogo } =
    useLogoUpload();

  // Form initialization
  const form = useForm<ClubFormValues>({
    resolver: zodResolver(clubFormSchema),
    defaultValues: {
      sport: "",
      clubName: "",
      description: "",
      privacy: "public",
      location: "",
      venue: "",
      gender: "all",
    },
  });

  // Handle form submission
  const handleFormSubmit = (data: ClubFormValues) => {
    onSubmit({ ...data, logo: logoFile });
  };

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      form.reset();
      resetLogo();
    }
  }, [open, form, resetLogo]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-xl max-h-[95vh] overflow-y-auto bg-white">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl mt-5 font-semibold">
            {title}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-10 mt-4"
          >
            {/* 1. Sport Selection */}
            <FormField
              control={form.control}
              name="sport"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-lg font-normal">
                    {FORM_SECTIONS.SPORT}
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a sport" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SPORT_OPTIONS.map((sport) => (
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

            {/* 2. Customization */}
            <div className="space-y-3">
              <Label className="text-lg font-normal">
                {FORM_SECTIONS.CUSTOMIZE}
              </Label>

              <LogoUpload
                logoPreview={logoPreview}
                onLogoChange={handleLogoChange}
              />

              <FormField
                control={form.control}
                name="clubName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-normal text-gray-700">
                      Club Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Green Jungle"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-normal text-gray-700">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Go hard or go home"
                        className="w-full min-h-[60px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 3. Privacy */}
            <FormField
              control={form.control}
              name="privacy"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-normal">
                    {FORM_SECTIONS.PRIVACY}
                  </FormLabel>
                  <FormControl>
                    <PrivacyRadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 4. Location */}
            <div className="space-y-3">
              <Label className="text-lg font-normal">
                {FORM_SECTIONS.LOCATION}
              </Label>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LOCATION_OPTIONS.map((location) => (
                          <SelectItem
                            key={location.value}
                            value={location.value}
                          >
                            {location.label}
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
                name="venue"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select venue" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {VENUE_OPTIONS.map((venue) => (
                          <SelectItem key={venue.value} value={venue.value}>
                            {venue.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 5. Gender */}
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

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#174038] hover:bg-[#083d30] text-[#E1FFA0] py-3"
            >
              {isLoading ? "Creating..." : "Create club"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClubDialog;
