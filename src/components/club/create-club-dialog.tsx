import React, { useEffect, useState } from "react";
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
import { LocationAutocomplete } from "./place-form/location-autocomplete";
import { VenueAutocomplete } from "./place-form/vanue-autocomplete";
import { City, Venue } from "@/constant/types/place";

import { SPORT_OPTIONS, FORM_SECTIONS } from "@/constant/club-tags";

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

  // State for selected city (untuk pass ke venue autocomplete)
  const [selectedCity, setSelectedCity] = useState<string>("");

  // Form initialization
  const form = useForm<ClubFormValues>({
    resolver: zodResolver(clubFormSchema),
    defaultValues: {
      sport_category: "",
      clubName: "",
      description: "",
      privacy: "PUBLIC",
      location: "",
      home_court: "",
      gender: "all",
    },
  });

  // Handle city selection
  const handleCitySelect = (city: City) => {
    form.setValue("location", city.name);
    setSelectedCity(city.name);
    // Reset home_court when city changes
    form.setValue("home_court", "");
  };

  // Handle venue selection
  const handleVenueSelect = (venue: Venue) => {
    form.setValue("home_court", venue.name);
  };

  // Handle form submission
  const handleFormSubmit = (data: ClubFormValues) => {
    onSubmit({ ...data, logo: logoFile });
  };

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      form.reset();
      resetLogo();
      setSelectedCity("");
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
              name="sport_category"
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
                pictureUrl={logoPreview}
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

            {/* 4. Location - UPDATED WITH AUTOCOMPLETE */}
            <div className="space-y-3">
              <Label className="text-lg font-normal">
                {FORM_SECTIONS.LOCATION}
              </Label>

              {/* City Autocomplete */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal text-gray-700">
                      City
                    </FormLabel>
                    <FormControl>
                      <LocationAutocomplete
                        value={field.value}
                        onSelect={handleCitySelect}
                        placeholder="Search city (e.g., Jakarta, Bandung)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Venue Autocomplete */}
              <FormField
                control={form.control}
                name="home_court"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal text-gray-700">
                      Home Court / Venue
                    </FormLabel>
                    <FormControl>
                      <VenueAutocomplete
                        value={field.value}
                        onSelect={handleVenueSelect}
                        city={selectedCity}
                        placeholder="Search venue (e.g., Padel court, Gym)"
                      />
                    </FormControl>
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
