"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
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
  RegistrationMatchForm,
  registrationMatchSchema,
} from "@/constant/types/zodSchema";
import { MatchRegisterProps } from "@/constant/types";
import { matchIconRegister } from "@/constant/match";
import { MatchIconRegisters } from "./match-tags";
import Separator from "../ui/separator";
import { PromoCodeInput } from "../form/promo-code-input";
import { useState } from "react";

const MatchRegister: React.FC<MatchRegisterProps> = ({
  location,
  match_date,
  gender_restriction,
  name_match,
  price,
  name_club,
}) => {
  const router = useRouter();
  const { isMobile } = useWindowDimension();
  const details = matchIconRegister(
    gender_restriction,
    location,
    name_match,
    price,
    name_club,
    match_date
  );

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = useForm<RegistrationMatchForm>({
    resolver: zodResolver(registrationMatchSchema),
  });

  const nameWatch = watch("name");

  const onSubmit: SubmitHandler<RegistrationMatchForm> = async (data) => {
    try {
      // Proses pendaftaran
      console.log(data);

      router.push("/payment");
      // Contoh: await submitRegistration(data)
    } catch (error) {
      console.error("Pendaftaran gagal", error);
    }
  };

  const [discountAmount, setDiscountAmount] = useState<number>(30000);
  const originalPrice = 100000; // This would be your actual price

  const handlePromoApplied = (discount: number) => {
    setDiscountAmount(discount);
    // You can also perform any other actions needed when a promo is applied
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
                <ArrowLeft className="h-5 w-5" />
              </button>
              <p className="text-2xl font-bold flex-grow">Match details</p>
            </div>
          )}

          {/* Judul Match Details untuk Desktop */}
          {!isMobile && (
            <p className="text-3xl font-bold mb-4">Match details</p>
          )}
          {/* Card Match Detail */}
          <div className="bg-white rounded-2xl">
            <div className="space-y-2 mb-4">
              {details.map((item, index) => (
                <MatchIconRegisters
                  key={index}
                  icon={item.icon}
                  label={item.label}
                />
              ))}
            </div>
          </div>

          {/* SEPARATOR */}
          <Separator />
        </div>

        {/* Kolom Kanan - Registrasi & Pembayaran */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Card Informasi Pendaftaran */}
            <div className="bg-white rounded-2xl mb-6">
              <h3 className="text-2xl font-semibold mb-4">Information</h3>
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
                </div>
              </div>
            </div>

            <Separator />

            {/* promo code */}
            <PromoCodeInput
              register={register}
              setValue={setValue}
              getValues={getValues}
              onPromoApplied={handlePromoApplied}
              className="mb-2 mt-4"
              placeholder="TEN87"
            />

            {/* SEPARATOR */}
            <Separator />

            {/* Card Detail Pembayaran */}
            <div className="bg-white rounded-2xl ">
              <h3 className="text-2xl font-semibold mb-4">Payment Detail</h3>

              {/* Price row */}
              <div className="flex justify-between mb-2">
                <span>Price</span>
                <span>Rp {originalPrice.toLocaleString()}</span>
              </div>

              {/* Promo discount row - only shown when discount is applied */}
              {discountAmount > 0 && (
                <div className="flex justify-between mb-2">
                  <span>Promo</span>
                  <span className="text-red-500">
                    -Rp {discountAmount.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Total row */}
              <div className="flex justify-between text-[#174038] mb-4 font-bold">
                <span>Total</span>
                <span>
                  Rp {(originalPrice - discountAmount).toLocaleString()}
                </span>
              </div>
              <div className="mt-[100px] grid min-h-[200px] items-start">
                {/* <Link href="/payment"> */}
                <Button
                  type="submit"
                  disabled={!nameWatch}
                  className="w-full bg-background-button-rc text-white p-3 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
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

export default MatchRegister;
