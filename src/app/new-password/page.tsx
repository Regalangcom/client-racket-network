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
import InputError from "../components/input-errors";
import axios from "axios";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

function NewPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();
  const getToken = params.get("token");

  // == hooks ==
  const [isPending, setIsPending] = useState<boolean>(false);

  // RHF
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordFormSchema>({
    resolver: zodResolver(NewPasswordFormSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: NewPasswordFormSchema) => {
    // logic is here
    try {
      setIsPending(true);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/users/requestPasswordReset`,
        {
          token: getToken,
          newPassword: data.password,
        }
      );
      toast.success(response.data.message);
      setIsPending(false);
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl ">New Password</CardTitle>
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
                Create New Passoword
              </Label>
              <Input
                {...register("password")}
                id="passowrd"
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
              {isPending ? "Create ..." : "Create"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default NewPasswordPage;
