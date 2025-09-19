"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Calendar } from "lucide-react";
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
const competitionPaymentSchema = z.object({
  email: z.email("Email tidak valid"),
  name: z.string().min(2, "Nama minimal 2 karakter"),
  phoneNumber: z.string().min(10, "Nomor telepon tidak valid"),
  level: z.enum(["Beginner", "Intermediate", "Advanced"], {
    error: "Pilih level yang valid",
  }),

  additionalInfo: z.string().optional(),
});

type RegistrationFormData = z.infer<typeof competitionPaymentSchema>;

interface MatchRegisterProps {
  title: string;
  date: string;
  location: string;
  price: string;
  club: string;
  times: string[];
}

const CompetitionPayment: React.FC<MatchRegisterProps> = ({
  // title,
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
    resolver: zodResolver(competitionPaymentSchema),
  });

  // pantau field tertentu, misalnya "name"
  const nameValue = watch("name");
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
      <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-6">
        {/* Kolom Kiri - Match Information */}
        <div className="space-y-6 mb-8">
          {/* Tombol Kembali untuk Mobile */}
          {isMobile && (
            <div className=" flex gap-3 relative w-full ">
              <span
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-6 w-6" />
              </span>
              <span className="text-2xl font-bold flex-grow">
                Competition details
              </span>
            </div>
          )}

          {/* Judul Match Details untuk Desktop */}
          {!isMobile && (
            <p className="text-3xl font-bold mb-4">Competition details</p>
          )}
          {/* Card Match Detail */}
          <div className="bg-white">
            {/* <h2 className="text-xl font-bold mb-4">{title}</h2> */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5 text-green-600" />
                <strong>Tanggal:</strong> {date}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5 text-green-600" />
                <strong>Lokasi:</strong> {location}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5 text-green-600" />
                <strong>Klub:</strong> {club}
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan - Registrasi & Pembayaran */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Card Informasi Pendaftaran */}
            <div className="bg-white ">
              {/* Card Waktu Pertandingan */}
              <div className="py-2">
                <div className="relative bg-gray-200 py-[4px] px-6"></div>
              </div>
              <h3 className="text-lg font-semibold mb-4 mt-3">Informations</h3>
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
                    placeholder="Nama Lengkap"
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
                    placeholder="Nomor Telepon"
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
            <div className="bg-white mb-2 mt-4">
              <h3 className="text-lg font-semibold mb-4">Kode Promo</h3>
              <input
                type="text"
                placeholder="Masukkan Kode Referral"
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Card Detail Pembayaran */}
            <div className="bg-white rounded-2xl shadow">
              <div className="py-8">
                <div className="relative bg-gray-200 py-[4px] px-6"></div>
              </div>
              <h3 className="text-lg font-semibold mb-4">Payment detail</h3>
              <div className="flex justify-between mb-4">
                <span>Total Biaya:</span>
                <span className="font-bold">{price}</span>
              </div>
              <div className="mt-[100px] grid min-h-[200px] items-start">
                <Button
                  type="submit"
                  disabled={!nameValue}
                  // disabled={isSubmitting}
                  className="w-full bg-background-button-rc text-[#E1FFA0] font-semibold rounded-lg hover:bg-white hover:text-black hover:border-2"
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

export default CompetitionPayment;
