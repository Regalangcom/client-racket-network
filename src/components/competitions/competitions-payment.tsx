"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
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
import { PromoCodeInput } from "../form/promo-code-input";
import { useState, useEffect } from "react";
import Separator from "../ui/separator";
import displayIDRCurrency from "@/utils/currency";
import { VoucherService } from "@/services/voucher-service";
import { toast } from "sonner";
import { CompetitionsService } from "@/services/comp-services";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

const CompetitionPayment: React.FC<CompetitionsRegisterProps> = ({
  name_comp,
  competition_date,
  location,
  price,
  competitonId,
  isAuthenticated = false,
  userEmail = null,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { isMobile } = useWindowDimension();

  // state
  const [errorMessage, setIsErrorMessage] = useState<string | null>("");

  // state
  const [appliedVoucher, setIsAppliedVoucher] = useState<{
    code: string;
    discount: number;
    promoCodeId: number;
    final_amount: number;
  } | null>(null);

  // state
  const [isApplyingVoucher, setIsApplyVoucher] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(CompetitionPaymentSchema),
    mode: "onBlur",
    defaultValues: {
      email: userEmail || "",
    },
  });

  // Pre-fill email for authenticated users
  useEffect(() => {
    if (isAuthenticated && userEmail) {
      setValue("email", userEmail);
    }
  }, [isAuthenticated, userEmail, setValue]);

  const nameValue = watch("name");
  const originalPrice = parseFloat(price);
  const discountAmount = appliedVoucher?.discount || 0;
  const finalPrice = appliedVoucher?.final_amount || originalPrice;

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    try {
      const payload = {
        competition_id: competitonId,
        full_name: data.name,
        email: data.email,
        phone_number: data.phoneNumber,
        skill_level: data.level,
        promo_code: appliedVoucher?.code || null,
        promo_code_id: appliedVoucher?.promoCodeId || null,
        original_amount: originalPrice,
        discount_amount: appliedVoucher?.discount || 0,
        final_amount: finalPrice,
      };

      // Pass token only if authenticated
      const result = await CompetitionsService.registrationCompetition(
        payload,
        isAuthenticated ? session?.user?.access_token : undefined
      );

      if (result && result.success && result.data && result.transaction) {
        const orderId = result.transaction.order_id;

        // Store email in localStorage for guest payment flow
        if (!isAuthenticated) {
          localStorage.setItem("guest_payment_email", data.email);
        }

        router.push(`/payment?orderId=${orderId}`);
      } else {
        console.error("Unexpected response format:", result);
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed", error);
      const errorMsg = error instanceof Error ? error.message : "Registration failed";
      toast.error(errorMsg);
    }
  };

  const handleApplyVoucher = async (VoucherCode: string) => {
    setIsApplyVoucher(true);
    setIsErrorMessage(null);

    try {
      const result = await VoucherService.applyVoucher(
        {
          voucher_code: VoucherCode,
          original_amount: originalPrice,
        },
        undefined
      );

      setIsErrorMessage(result.message);
      setIsAppliedVoucher({
        code: result.data.code,
        promoCodeId: result.data.promo_code_id,
        discount: result.data.discount_amount,
        final_amount: result.data.final_amount,
      });

      setIsErrorMessage(result.message);
      toast.success("Voucher applied successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to apply voucher";

      setIsErrorMessage(errorMessage);
      setIsAppliedVoucher(null);

      toast.error(errorMessage);
    } finally {
      setIsApplyVoucher(false);
    }
  };

  const handleRemoveVoucher = () => {
    setIsAppliedVoucher(null);
    setIsErrorMessage(null);
    toast.info("Voucher removed");
  };

  return (
    <div className="container-lg mx-auto max-w-full px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-6">
        {/* Left Column - Competition Information */}
        <div className="space-y-6 mb-8">
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

          {!isMobile && (
            <p className="text-3xl font-bold mb-4">Competition details</p>
          )}

          <div className="bg-white">
            <div className="space-y-3">
              {CompetitionsDetail(name_comp, competition_date, location).map(
                (tag, idx) => (
                  <CompetitionTag key={idx} {...tag} />
                )
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Registration & Payment */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white ">
              <div className="py-2 mb-8 relative w-[calc(100%+2rem)] -mx-4 md:-mx-6">
                <div className="bg-gray-300 absolute left-0 right-0 py-[4px]"></div>
              </div>

              {/* Guest/Authenticated Banner */}
              {!isAuthenticated && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Registering as guest</strong> - Payment confirmation will be sent to your email.
                  </p>
                </div>
              )}

              {isAuthenticated && userEmail && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-green-800">
                    Logged in as <strong>{userEmail}</strong>
                  </p>
                </div>
              )}

              <h3 className="text-lg font-semibold mb-4 mt-3">Informations</h3>
              <div className="space-y-4">
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    readOnly={isAuthenticated}
                    className={cn(
                      "w-full p-2 border rounded",
                      isAuthenticated && "bg-gray-100 cursor-not-allowed text-gray-600"
                    )}
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

            <PromoCodeInput
              register={register}
              errorMessage={errorMessage}
              setValue={setValue}
              getValues={getValues}
              onApply={handleApplyVoucher}
              onRemove={handleRemoveVoucher}
              isLoading={isApplyingVoucher}
              appliedCode={appliedVoucher?.code || null}
              discountAmount={discountAmount}
              className="mb-2 mt-4"
            />

            <div className="bg-white rounded-2xl ">
              <Separator />

              <h3 className="text-xl font-semibold mb-4">Payment detail</h3>

              <div className="flex justify-between mb-2">
                <span>Price</span>
                <span>{displayIDRCurrency(price)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between mb-2">
                  <span>Promo</span>
                  <span className="text-red-500">
                    -Rp {discountAmount.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-[#174038] mb-4 font-bold">
                <span>Total</span>
                <span>
                  Rp {(originalPrice - discountAmount).toLocaleString()}
                </span>
              </div>

              <div className="mt-[100px] grid min-h-[200px] items-start">
                <Button
                  type="submit"
                  disabled={!nameValue || isSubmitting}
                  className="w-full bg-background-button-rc text-[#E1FFA0] font-semibold rounded-lg hover:bg-white hover:text-black hover:border-2"
                >
                  {isSubmitting ? "Processing..." : "Continue"}
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