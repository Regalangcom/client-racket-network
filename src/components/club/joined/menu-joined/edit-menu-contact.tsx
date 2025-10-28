// components/club/edit-contact-modal.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClubService } from "@/services/club-services";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface EditContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUsername: string;
  currentPhone: string;
  accessToken: string;
  onSuccess: () => void;
}

export default function EditContactModal({
  isOpen,
  onClose,
  currentUsername,
  currentPhone,
  accessToken,
  onSuccess,
}: EditContactModalProps) {
  const [username, setUsername] = useState(currentUsername);
  const [phoneNumber, setPhoneNumber] = useState(currentPhone);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    phoneNumber?: string;
  }>({});

  // Validate form
  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (username.trim().length < 3) {
      newErrors.username = "Name must be at least 3 characters";
    }

    const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ""))) {
      newErrors.phoneNumber = "Invalid phone number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const updateData: {
        username?: string;
        phone_number?: string;
      } = {};

      // Only send changed fields
      if (username !== currentUsername) {
        updateData.username = username.trim();
      }
      if (phoneNumber !== currentPhone) {
        updateData.phone_number = phoneNumber.replace(/\s/g, "");
      }

      // If nothing changed
      if (Object.keys(updateData).length === 0) {
        toast.info("No changes detected");
        onClose();
        return;
      }

      await ClubService.updateOwnerContact(updateData, accessToken);

      toast.success("Contact information updated successfully!");
      onSuccess(); // Refresh club page data
      onClose();
    } catch (error: any) {
      console.error("Error updating contact:", error);
      toast.error(error.message || "Failed to update contact");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <DialogHeader>
          <DialogTitle>Edit Contact Information</DialogTitle>
          <DialogDescription>
            Update your name and WhatsApp number. This will be visible to club
            members.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Username Input */}
            <div className="grid gap-2">
              <Label htmlFor="username">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors((prev) => ({ ...prev, username: undefined }));
                }}
                placeholder="Enter your name"
                disabled={isLoading}
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            {/* Phone Number Input */}
            <div className="grid gap-2">
              <Label htmlFor="phone">
                WhatsApp Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
                }}
                placeholder="+628123456789"
                disabled={isLoading}
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-500">{errors.phoneNumber}</p>
              )}
              <p className="text-xs text-gray-500">
                Format: +62, 62, or 0 followed by 9-13 digits
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              className=" bg-background-button-rc"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
