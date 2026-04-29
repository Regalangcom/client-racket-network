"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignInFormSchema, SignInFormData } from "@/constant/types/zodSchema";
import InputError from "@/app/_components/input-errors";

export default function FotograferLoginForm() {
  const [isPending, setIsPending] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInFormSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      setIsPending(true);
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      if (result?.ok) {
        toast.success("Login berhasil!");
        window.location.href = "/fotografer/dashboard";
        return;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Terjadi kesalahan, silakan coba lagi");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full max-w-[340px] flex flex-col gap-3"
    >
      <div>
        <Input
          {...register("email")}
          id="email"
          type="email"
          placeholder="Email"
          className="bg-white/90 border-0 h-11"
          aria-invalid={errors.email ? "true" : "false"}
        />
        <InputError error={errors.email?.message} />
      </div>

      <div>
        <div className="relative">
          <Input
            {...register("password")}
            id="password"
            type={isVisible ? "text" : "password"}
            placeholder="Password"
            className="bg-white/90 border-0 h-11 pr-10"
            aria-invalid={errors.password ? "true" : "false"}
          />
          <button
            type="button"
            onClick={() => setIsVisible((prev) => !prev)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
          >
            {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <InputError error={errors.password?.message} />
      </div>

      <div className="flex justify-end">
        <Link href="/reset-password" className="text-blue-500 text-sm hover:underline">
          Lupa password?
        </Link>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="bg-background-button-rc w-full h-11"
      >
        <span className="text-[#E1FFA0]">{isPending ? "Masuk..." : "Masuk"}</span>
      </Button>
    </form>
  );
}
