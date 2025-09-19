"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Calendar, MapPin, Users, ArrowLeft, Timer } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import { Button } from "../ui/button";

// Skema validasi menggunakan Zod
const registrationSchema = z.object({
  email: z.string().email("Email tidak valid"),
  name: z.string().min(2, "Nama minimal 2 karakter"),
  phoneNumber: z.string().min(10, "Nomor telepon tidak valid"),
  level: z.enum(["beginner", "expert"], {
    error: "Pilih level yang valid",
  }),
  additionalInfo: z.string().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface MatchRegisterProps {
  title: string;
  date: string;
  location: string;
  price: string;
  club: string;
  times: string[];
}

const MatchRegister: React.FC<MatchRegisterProps> = ({
  title,
  times,
  date,
  location,
  price,
  club,
}) => {
  const router = useRouter();
  const { isMobile } = useWindowDimension();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const nameWatch = watch("name");

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    try {
      // Proses pendaftaran
      console.log(data);
      // Contoh: await submitRegistration(data)
    } catch (error) {
      console.error("Pendaftaran gagal", error);
    }
  };

  return (
    <div className="container-lg mx-auto max-w-full px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kolom Kiri - Match Information */}
        <div className="space-y-6">
          {/* Tombol Kembali untuk Mobile */}
          {isMobile && (
            <div className="flex gap-3 relative w-full">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <p className="text-2xl font-bold flex-grow">Match details</p>
            </div>
          )}

          {/* Judul Match Details untuk Desktop */}
          {!isMobile && (
            <p className="text-3xl font-bold mb-4">Match details</p>
          )}
          {/* Card Match Detail */}
          <div className="bg-white rounded-2xl ">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="space-y-2 mb-4">
              <div className="flex items-center  gap-2 text-gray-600">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="text-md font-semibold">{date}</span>
              </div>
              <div className="flex items-center mb-6 gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="text-md font-semibold">{location}</span>
              </div>
              <div className="flex items-center mb-6 gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="text-md font-semibold">{price}</span>
              </div>
              <div className="flex items-center mb-6 gap-2 text-gray-600">
                <Users className="w-5 h-5 text-green-600" />
                <span className="text-md font-semibold">{club}</span>
              </div>
            </div>
          </div>

          {/* Card Waktu Pertandingan */}
          <div className="bg-white">
            <h3 className="text-lg font-semibold mb-4">Waktu Pertandingan</h3>
            <div className="space-y-2">
              {times.map((time, index) => (
                <p className="flex items-center gap-2" key={index}>
                  <Timer className="w-5 h-5 text-green-600" />
                  {time}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan - Registrasi & Pembayaran */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Card Informasi Pendaftaran */}
            <div className="bg-white rounded-2xl mb-6">
              <h3 className="text-lg font-semibold mb-4">
                Informasi Pendaftaran
              </h3>
              <div className="space-y-4">
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Name"
                    className="w-full p-2 border rounded"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("phoneNumber")}
                    type="text"
                    placeholder="Phone no"
                    className="w-full p-2 border rounded"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                {/* Dropdown Level */}
                <div className="relative">
                  <Select {...register("level")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select skill level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.level && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.level.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Card Promo */}
            <div className="bg-white rounded-2xl  mb-6">
              <h3 className="text-lg font-semibold mb-4">Kode Promo</h3>
              <input
                type="text"
                placeholder="Referral code"
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Card Detail Pembayaran */}
            <div className="bg-white rounded-2xl ">
              <h3 className="text-lg font-semibold mb-4">Detail Pembayaran</h3>
              <div className="flex justify-between mb-4">
                <span>Total Biaya:</span>
                <span className="font-bold">{price}</span>
              </div>
              <div className="mt-[100px] grid min-h-[200px] items-start">
                <Button
                  type="submit"
                  disabled={!nameWatch}
                  className="w-full bg-background-button-rc text-white p-3 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Prosesing..." : "Continue"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MatchRegister;
