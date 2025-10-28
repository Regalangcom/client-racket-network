// profileEditForm.tsx
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AccountMenu } from "../accountMenu/title-menu";
import { ProfileFormData, profileFormSchema } from "@/constant/types/zodSchema";
import { useLogoUpload } from "@/hooks/uploadLogo";
import { LogoUpload } from "@/components/club/logo-upload";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ProfileEditFormProps {
  initialData: ProfileFormData;
  onSave: (data: ProfileFormData) => void;
  access_token: string;
  onCancel: () => void;
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  initialData,
  onSave,
  access_token,
  onCancel,
}) => {
  const { logoFile, logoPreview, handleLogoChange } = useLogoUpload(
    initialData.picture
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialData,
  });
  const formValues = form.watch();
  const hasChanges =
    formValues.username !== initialData.username ||
    formValues.email !== initialData.email ||
    formValues.phone_number !== initialData.phone_number ||
    formValues.level !== initialData.level ||
    logoFile !== null;

  useEffect(() => {
    if (initialData.username || initialData.email) {
      form.reset({
        username: initialData.username || "",
        email: initialData.email || "",
        phone_number: initialData.phone_number || "",
        level: initialData.level || "Beginner",
        picture: initialData.picture || "",
      });
    }
  }, [initialData, form]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!access_token) {
      alert("Session expired. Please login again.");
      return;
    }
    try {
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("level_skills", data.level);
      if (data.phone_number) formData.append("phone_number", data.phone_number);

      // Kalau ada upload gambar baru
      if (logoFile) {
        formData.append("profile", logoFile);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/auth/api/v1/users/update-profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const result = await response.json();

      const updatedData = {
        ...data,
        picture: result.data?.profile?.pictureUrl
          ? result.data?.profile?.pictureUrl
          : result.data?.profile?.picture,
      };

      // Panggil onSave untuk update parent state
      onSave(updatedData);

      toast.success("profile updated");
    } catch (error) {
      toast.error("update failed");
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-24">
      <AccountMenu title="Edit Profile" showBackButton />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
          {/* handle logo */}
          <Label className="text-sm font-normal">Profile picture</Label>
          <LogoUpload
            pictureUrl={logoPreview}
            onLogoChange={handleLogoChange}
          />

          {/* Name Field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="w-full h-11"
                    placeholder="Enter your name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="w-full h-11"
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Field */}
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    className="w-full h-11"
                    type="tel"
                    placeholder="Enter  number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Level Field */}
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skill Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select skill level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-end space-x-32  w-full">
            {/* <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button> */}
            <Button
              disabled={!hasChanges || isSubmitting}
              type="submit"
              className="w-full py-3 mt-14 rounded-md bg-background-button-rc hover:text-white"
            >
              {isSubmitting ? "Update..." : "update"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
