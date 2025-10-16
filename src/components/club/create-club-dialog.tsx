import React from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { clubFormSchema, ClubFormValues } from "@/constant/types/zodSchema";

interface CreateClubDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ClubFormValues & { logo?: File | null }) => void;
  isLoading?: boolean;
}

const CreateClubDialog: React.FC<CreateClubDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}) => {
  const [logoPreview, setLogoPreview] = React.useState<string>("");
  const [logoFile, setLogoFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Initialize React Hook Form
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

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (data: ClubFormValues) => {
    // Combine form data with logo file
    onSubmit({
      ...data,
      logo: logoFile,
    });
  };

  // Reset form when dialog closes
  React.useEffect(() => {
    if (!open) {
      form.reset();
      setLogoPreview("");
      setLogoFile(null);
    }
  }, [open, form]);

  return (
    <section className="">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-screen-xl max-h-[95vh] overflow-y-auto bg-white">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-2xl mt-5 font-semibold">
              Create a club
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="space-y-10 mt-4"
            >
              {/* 1. Choose Sport */}
              <FormField
                control={form.control}
                name="sport"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-lg font-normal">
                      1. Choose your clubs sport
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Tennis" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="tennis">Tennis</SelectItem>
                        <SelectItem value="football">Football</SelectItem>
                        <SelectItem value="basketball">Basketball</SelectItem>
                        <SelectItem value="volleyball">Volleyball</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 2. Customize Club */}
              <div className="space-y-3">
                <Label className="text-lg font-normal">
                  2. Customize your club
                </Label>

                {/* Logo */}
                <div className="space-y-2">
                  <Label className="text-sm font-normal text-gray-700">
                    Club Logo
                  </Label>
                  <div className="relative">
                    <div
                      onClick={handleLogoClick}
                      className="w-full h-20 rounded-lg overflow-hidden cursor-pointer relative"
                      style={{
                        backgroundImage: logoPreview
                          ? `url(${logoPreview})`
                          : "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 150%22%3E%3Crect fill=%22%2388c057%22 width=%22400%22 height=%22150%22/%3E%3Cpath fill=%22%2376b34a%22 d=%22M0,75 Q100,50 200,75 T400,75 L400,150 L0,150 Z%22/%3E%3Cpath fill=%22%23a8d47f%22 d=%22M0,90 Q100,70 200,90 T400,90 L400,150 L0,150 Z%22/%3E%3Ccircle fill=%22%23ff6b6b%22 cx=%2250%22 cy=%2260%22 r=%2212%22/%3E%3Cpath fill=%22%23ffd93d%22 d=%22M100,30 L110,50 L130,50 L115,65 L120,85 L100,70 L80,85 L85,65 L70,50 L90,50 Z%22/%3E%3C/svg%3E')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute bottom-7 right-40 bg-gray-300 blur-0 rounded-full p-1.5">
                        <Pencil className="w-4 h-4 text-[#174038]" />
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Club Name */}
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

                {/* Description */}
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
                      3. Privacy
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem
                            value="public"
                            id="public"
                            className="mt-1"
                          />
                          <div>
                            <Label
                              htmlFor="public"
                              className="font-semibold cursor-pointer"
                            >
                              Public
                            </Label>
                            <p className="text-xs text-gray-500">
                              Anyone can join
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem
                            value="private"
                            id="private"
                            className="mt-1"
                          />
                          <div>
                            <Label
                              htmlFor="private"
                              className="font-semibold cursor-pointer"
                            >
                              Private
                            </Label>
                            <p className="text-xs text-gray-500">
                              People must request permission to join
                            </p>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 4. Location */}
              <div className="space-y-3">
                <Label className="text-lg font-normal">4. Location</Label>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Jakarta Timur" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="jakarta-timur">
                            Jakarta Timur
                          </SelectItem>
                          <SelectItem value="jakarta-barat">
                            Jakarta Barat
                          </SelectItem>
                          <SelectItem value="jakarta-selatan">
                            Jakarta Selatan
                          </SelectItem>
                          <SelectItem value="jakarta-utara">
                            Jakarta Utara
                          </SelectItem>
                          <SelectItem value="jakarta-pusat">
                            Jakarta Pusat
                          </SelectItem>
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Kencana Arena" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="kencana-arena">
                            Kencana Arena
                          </SelectItem>
                          <SelectItem value="stadium-utama">
                            Stadium Utama
                          </SelectItem>
                          <SelectItem value="sport-center">
                            Sport Center
                          </SelectItem>
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
                      5. Gender
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem
                            value="all"
                            id="all-gender"
                            className="mt-1"
                          />
                          <div>
                            <Label
                              htmlFor="all-gender"
                              className="font-semibold cursor-pointer"
                            >
                              All gender
                            </Label>
                            <p className="text-xs text-gray-500">
                              Anyone can join
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem
                            value="men"
                            id="men-only"
                            className="mt-1"
                          />
                          <div>
                            <Label
                              htmlFor="men-only"
                              className="font-semibold cursor-pointer"
                            >
                              Men only
                            </Label>
                            <p className="text-xs text-gray-500">
                              Only men can join
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem
                            value="women"
                            id="women-only"
                            className="mt-1"
                          />
                          <div>
                            <Label
                              htmlFor="women-only"
                              className="font-semibold cursor-pointer"
                            >
                              Women only
                            </Label>
                            <p className="text-xs text-gray-500">
                              Only women can join
                            </p>
                          </div>
                        </div>
                      </RadioGroup>
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
    </section>
  );
};

export default CreateClubDialog;
