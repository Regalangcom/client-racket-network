"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWindowDimension } from "@/hooks/useWindowdimension";

// Skema validasi menggunakan Zod
const registrationSchema = z.object({
  email: z.string().email("Email tidak valid"),
  name: z.string().min(2, "Nama minimal 2 karakter"),
  phoneNumber: z.string().min(10, "Nomor telepon tidak valid"),
  level: z.enum(["beginner", "expert"], {
    errorMap: () => ({ message: "Pilih level yang valid" }),
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
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kolom Kiri - Match Information */}
        <div className="space-y-6">
          {/* Tombol Kembali untuk Mobile */}
          {isMobile && (
            <div className="flex items-center space-x-4 mb-4 bg-gray-100 p-3 rounded-lg">
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
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="space-y-2">
              <p>
                <strong>Tanggal:</strong> {date}
              </p>
              <p>
                <strong>Lokasi:</strong> {location}
              </p>
              <p>
                <strong>Harga:</strong> {price}
              </p>
              <p>
                <strong>Klub:</strong> {club}
              </p>
            </div>
          </div>

          {/* Card Waktu Pertandingan */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Waktu Pertandingan</h3>
            <div className="space-y-2">
              {times.map((time, index) => (
                <p key={index}>{time}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan - Registrasi & Pembayaran */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Card Informasi Pendaftaran */}
            <div className="bg-white rounded-2xl shadow p-6 mb-6">
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
                  <select
                    {...register("level")}
                    className="w-full p-2 border rounded appearance-none"
                  >
                    <option value="">Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="expert">Expert</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                  {errors.level && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.level.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Card Promo */}
            <div className="bg-white rounded-2xl shadow p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Kode Promo</h3>
              <input
                type="text"
                placeholder="Masukkan Kode Referral"
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Card Detail Pembayaran */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Detail Pembayaran</h3>
              <div className="flex justify-between mb-4">
                <span>Total Biaya:</span>
                <span className="font-bold">Rp {price}</span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-background-button-rc text-white p-3 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Prosesing..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MatchRegister;
