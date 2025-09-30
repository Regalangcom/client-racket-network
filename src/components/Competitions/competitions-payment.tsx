"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import { Button } from "../ui/button";
import {
  CompetitionPaymentSchema,
  RegistrationFormData,
} from "@/constant/types/zodSchema";
import { CompetitionsRegisterProps } from "@/constant/types";
import { CompetitionsDetail } from "@/constant/competitions";
import CompetitionTag from "./competitons-tags";
import Link from "next/link";

const CompetitionPayment: React.FC<CompetitionsRegisterProps> = ({
  title,
  // date,
  time,
  location,
  price,
  // club,
}) => {
  const router = useRouter();
  const { isMobile } = useWindowDimension();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(CompetitionPaymentSchema),
    mode: "onBlur",
  });

  // pantau field tertentu, misalnya "name"
  const nameValue = watch("name");
  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    try {
      // Proses pendaftaran
      console.log(data);
      router.push("/payment");
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
            <div className=" flex gap-3 relative w-full">
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
              {CompetitionsDetail(title, time, location).map((tag, idx) => (
                <CompetitionTag key={idx} {...tag} />
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan - Registrasi & Pembayaran */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Card Informasi Pendaftaran */}
            <div className="bg-white ">
              {/* Card Waktu Pertandingan */}
              {/* SEPARATOR */}
              <div className="py-2 mb-8 relative w-[calc(100%+2rem)] -mx-4 md:-mx-6">
                <div className="bg-gray-300 absolute left-0 right-0 py-[4px]"></div>
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
                  <Controller
                    name="level"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select skill level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.level && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.level.message}
                    </p>
                  )}
                  {/* <Select {...register("level")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select skill level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.level && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.level.message}
                    </p>
                  )} */}
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
            <div className="bg-white rounded-2xl ">
              {/* SEPARATOR */}
              <div className="py-8 relative w-[calc(100%+2rem)] -mx-4 md:-mx-6">
                <div className="bg-gray-300 absolute left-0 right-0 py-[4px]"></div>
              </div>
              <h3 className="text-lg font-semibold mb-4">Payment detail</h3>
              <div className="flex justify-between mb-4">
                <span>Total Biaya:</span>
                <span className="font-bold">{price}</span>
              </div>
              <div className="mt-[100px] grid min-h-[200px] items-start">
                {/* <Link href="/payment"> */}
                <Button
                  type="submit"
                  disabled={!nameValue}
                  // disabled={isSubmitting}
                  className="w-full bg-background-button-rc text-[#E1FFA0] font-semibold rounded-lg hover:bg-white hover:text-black hover:border-2"
                >
                  {isSubmitting ? "Prosesing..." : "Continue"}
                </Button>
                {/* </Link> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompetitionPayment;
