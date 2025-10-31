// components/club/joined/create-comp-dialog.tsx
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
import {
  CompetitionFormValues,
  competitionsFormSchema,
} from "@/constant/types/zodSchema";
import { LogoUpload } from "../../logo-upload";
import { GenderRadioGroup } from "../../gender-radio-group";
import { useLogoUpload } from "@/hooks/uploadLogo";
import { FORM_SECTIONS, LEVEL_OPTION } from "@/constant/match";
import { DatePickerField } from "../../date-picker/date-picker-field";

interface CreateCompDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CompetitionFormValues & { banner?: File | null }) => void;
  isLoading?: boolean;
  initialData?: CompetitionFormValues & { banner?: string };
}

const CreateCompDialog: React.FC<CreateCompDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
  initialData,
}) => {
  const { logoPreview, logoFile, handleLogoChange, resetLogo } =
    useLogoUpload();

  const form = useForm<CompetitionFormValues>({
    resolver: zodResolver(competitionsFormSchema),
    defaultValues: initialData || {
      type_event: "Competition",
      event_title: "",
      date: "",
      // dateRange: { from: "", to: "" },
      location: "",
      gender: "all",
      level: "Beginner",
      banner: "",
      description: "",
      quota: "",
      price: "",
    },
  });

  useEffect(() => {
    if (open && initialData) {
      form.reset(initialData);
    }
  }, [open, initialData, form]);

  const handleFormSubmit = (data: CompetitionFormValues) => {
    console.log("Competition Submitted Data:", data);
    onSubmit({ ...data, banner: logoFile });
  };

  useEffect(() => {
    if (!open) {
      form.reset({
        type_event: "Competition",
        event_title: "",
        date: "",
        // dateRange: { from: "", to: "" },
        location: "",
        gender: "all",
        level: "Beginner",
        // banner: "",
        description: "",
        quota: "",
        price: "",
      });
      resetLogo();
    }
  }, [open, form, resetLogo]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-xl max-h-[95vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-start">
            Create Competition
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 text-start">
            Create a new competition or tournament event for your club
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-10 mt-4"
          >
            {/* Hidden type_event field - always Competition */}
            <input
              type="hidden"
              {...form.register("type_event")}
              value="Competition"
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
                      Competition title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter competition title"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date Picker */}
              {/* <DatePickerField form={form} /> */}

              {/* NO TIME SLOT FOR COMPETITION */}

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
                        placeholder="Enter competition description"
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
              {isLoading ? "Creating..." : "Create Competition"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCompDialog;
