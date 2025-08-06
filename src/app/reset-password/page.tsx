"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { reqPasswordFormSchema } from "@/types/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputError from "../components/input-errors";
import axios from "axios";
import { toast } from "sonner";

function ResetPasswordPage() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [showResendLink, setShowResendLink] = useState<boolean>(false);
  // counter for link expiration
  const [isCounter, setIsCounter] = useState<number>(0); // Initially 0, will set to 300 after success

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<reqPasswordFormSchema>({
    resolver: zodResolver(reqPasswordFormSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: reqPasswordFormSchema) => {
    // logic for email submission
    try {
      setIsPending(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/users/requestLinkPasswordReset`,
        { email: data.email }
      );
      toast.success(response.data.message); // Show success toast
      setIsPending(false); // Enable button again
      setShowResendLink(true);

      // Start countdown (300 seconds = 5 minutes)
      setIsCounter(300);
      reset(); // reset the form after success
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
      setIsPending(false); // Enable button again in case of error
    }
  };

  // Countdown for OTP link expiration
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isCounter > 0) {
      timer = setInterval(() => {
        setIsCounter((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isCounter]);

  return (
    <section>
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Input your email</CardTitle>
          <CardDescription>
            Welcome! Please fill in the details to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className={errors.email ? "text-destructive" : ""}
              >
                Email
              </Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="Enter your email"
                className={
                  errors.email ? "border-destructive ring-destructive" : ""
                }
                aria-invalid={errors.email ? "true" : "false"}
              />
              <InputError error={errors.email?.message} />
            </div>
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? "Sending ..." : "Send"}
            </Button>

            {showResendLink && (
              <div className="mt-2">
                <button
                  type="button"
                  disabled={isPending || isCounter === 0}
                  className="text-blue-600 hover:underline"
                >
                  {isPending ? "Resending ..." : "Resend OTP"}
                </button>
              </div>
            )}
          </form>
        </CardContent>
        {showResendLink && (
          <CardFooter>
            <span className="font-normal">
              Link will expire in{" "}
              <span className="text-red-600">
                {Math.floor(isCounter / 60)}:
              </span>
              <span className="text-red-600">
                {isCounter % 60 < 10 ? "0" : ""}
                {isCounter % 60} seconds
              </span>
            </span>
          </CardFooter>
        )}
      </Card>
    </section>
  );
}

export default ResetPasswordPage;
