"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import { OtpInFormSchema } from "@/constant/types/zodSchema";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export function InputOTPForm() {
  const [counter, setCounter] = useState<number>(120);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isPendingResend, setIsPendingResendCode] = useState<boolean>(false);
  const [isMessageError, setIsMessageError] = useState<string | null>("");

  // show button
  const [showButtonResend, setShowResendButton] = useState<boolean>(false);
  // == params ==
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm<OtpInFormSchema>({
    resolver: zodResolver(OtpInFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  // == function ==
  async function onSubmit(data: OtpInFormSchema) {
    try {
      setIsPending(true);
      console.log(data);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/users/verifyOTP`,
        {
          email,
          otp: data.otp,
        },
        { withCredentials: true }
      );

      toast.success(response.data.message);
      setIsPending(false);
      setIsPendingResendCode(false);

      router.push("/sign-in");
    } catch (error: any) {
      if (error?.response?.data.errors === "OTP Expired") {
        // setIsMessageError(error.response.data.errors);
        toast.error(error.response.data.errors);
        setShowResendButton(true);
        setIsPending(false);
        setIsPendingResendCode(false);
      } else {
        setIsMessageError(
          error.response?.data?.errors || "Verification failed"
        );
      }
    } finally {
      setIsPending(false);
      setIsPendingResendCode(false);
    }
  }

  const sendOtp = async () => {
    try {
      setIsPendingResendCode(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/users/re-send-otp`,
        { email }
      );

      // reset
      form.reset();

      setCounter(120);
      setShowResendButton(false);
      setIsMessageError("");
      toast.success(response.data.message);
      setIsPendingResendCode(false);
    } catch (error: any) {
      setIsMessageError(error.response?.data?.errors || "Failed to resend OTP");
      toast.error(error.response.data.errors);
    } finally {
      setIsPendingResendCode(false);
    }
  };

  // Countdown OTP expiration
  // == effect ==
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (counter > 0) {
      timer = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [counter]);

  return (
    <section>
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle>Verify OTP</CardTitle>
          <CardDescription>
            Enter the one-time password sent to your phone or email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          {Array.from({ length: 6 }, (_, index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              className="w-16 h-16 text-2xl text-center"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your phone.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormDescription className="font-bold">
                Token expired in{" "}
                <span className="font-mono text-red-600">
                  {Math.floor(counter / 60)}
                </span>{" "}
                <span className="font-mono text-red-600">
                  {counter % 60 < 10 ? "0" : ""}
                </span>{" "}
                {counter % 60} seconds
              </FormDescription>

              {/* Display error message */}
              {isMessageError && (
                <div className="text-destructive text-sm mt-2 text-center">
                  {isMessageError}
                </div>
              )}

              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Verifying..." : "Verify"}
              </Button>
            </form>
            {showButtonResend && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={isPendingResend}
                  className="text-blue-600 hover:underline"
                >
                  {isPendingResend ? "Resending ..." : "Resend OTP"}
                </button>
              </div>
            )}
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}

export default InputOTPForm;
