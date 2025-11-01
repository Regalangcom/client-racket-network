// components/club/joined/event-form-fields.tsx
"use client";
import React from "react";
import {
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
// import { LogoUpload } from "../logo-upload";
import { LogoUpload } from "../club/logo-upload";
import { GenderRadioGroup } from "../club/gender-radio-group";
import { DatePickerField } from "../club/date-picker/date-picker-field";
import { TimeSlotInput } from "../club/joined/time-slot-input";
import { FORM_SECTIONS, LEVEL_OPTION } from "@/constant/match";
import { Control } from "react-hook-form";

interface EventFormFieldsProps {
  control: Control<any>;
  eventType: "Match" | "Competition";
  logoPreview: string | null;
  onLogoChange: (file: File | null) => void;
  isLoading: boolean;
  form: any; // For DatePickerField
  errors?: any;
}

export const EventFormFields: React.FC<EventFormFieldsProps> = ({
  control,
  eventType,
  logoPreview,
  onLogoChange,
  isLoading,
  form,
  errors,
}) => {
  const isMatch = eventType === "Match";
  return (
    <>
      {/* Basic Info */}
      <div className="space-y-3">
        <Label className="text-lg font-normal">
          {FORM_SECTIONS.BASIC_INFO}
        </Label>

        <LogoUpload
          label="Banner"
          pictureUrl={logoPreview ?? undefined}
          onLogoChange={onLogoChange}
        />

        <FormField
          control={control}
          name="event_title"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-normal text-gray-700">
                {isMatch ? "Event title" : "Competition title"}
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

        {/* TIME SLOT - ONLY FOR MATCH */}
        {isMatch && (
          <FormField
            control={control}
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
                    error={errors?.TimeSlot?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
          control={control}
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
        <Label className="text-lg font-normal">{FORM_SECTIONS.PRICE}</Label>
        <FormField
          control={control}
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

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#174038] hover:bg-[#083d30] text-[#E1FFA0] py-3"
      >
        {isLoading ? "Creating..." : `Create ${eventType}`}
      </Button>
    </>
  );
};
