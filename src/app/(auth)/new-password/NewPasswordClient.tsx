"use client";

import React, { useState } from "react";
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
} from "@/components/ui/card";
import { NewPasswordFormSchema } from "@/constant/types/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputError from "@/app/components/input-errors";
import axios from "axios";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export default function NewPasswordClient() {
  const params = useSearchParams();
  const router = useRouter();
  const getToken = params.get("token");

  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordFormSchema>({
    resolver: zodResolver(NewPasswordFormSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: NewPasswordFormSchema) => {
    try {
      setIsPending(true);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_URL_API}/auth/api/v1/users/requestPasswordReset`,
        {
          token: getToken,
          newPassword: data.password,
        }
      );

      toast.success(response.data.message);
      router.push("/sign-in");
    } catch (error) {
      console.error(error);
      toast.error("Failed to reset password");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section>
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">New Password</CardTitle>
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
                htmlFor="password"
                className={errors.password ? "text-destructive" : ""}
              >
                Create New Password
              </Label>
              <Input
                {...register("password")}
                id="password"
                type="password"
                placeholder="Enter your password"
                className={
                  errors.password ? "border-destructive ring-destructive" : ""
                }
                aria-invalid={errors.password ? "true" : "false"}
              />
              <InputError error={errors.password?.message} />
            </div>
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
