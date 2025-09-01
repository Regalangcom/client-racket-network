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
  CardDescription,
} from "@/components/ui/card";
import { SignUpFormData, SignUpFormSchema } from "@/constant/types/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputError from "../components/input-errors";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { iconGoogle } from "@/public";
// module api
import axios from "axios";
// Toast
import { toast } from "sonner";

import { Eye, EyeOff } from "lucide-react";

// interface SignUpFromProps {
//   action: (formdata: FormData) => Promise<void>;
// }

// interface SignUpFormProps {
//   action: (formData: SignUpFormData) => Promise<void>;
// }

function SignUpPage() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isMessageError, setIsMessageError] = useState<string | null>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const router = useRouter();

  // handle toogle hide password
  const toogleIsVisibility = () => setIsVisible((prevState) => !prevState);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
    mode: "onChange",
  });

  console.log("register", register);
  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsPending(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/api/v1/users/register`,
        data,
        { withCredentials: true }
      );
      toast.success(response.data.message);

      router.push(`/otp?email=${response.data.email}`);
      setIsPending(false);
      reset();
      // await action(data);
      return response.data.data;
    } catch (error: any) {
      if (error.response) {
        setIsMessageError(error.response.data.message);
        toast.error(error.response.data.errors);
      } else {
        setIsMessageError("Terjadi kesalahan, coba lagi!");
      }
      setIsPending(false);
    }
  };

  /**
   * Handle login with Google.
   * @param {React.MouseEvent<HTMLButtonElement>} e Mouse event.
   * @returns {Promise<void>}
   */
  const handleLoginGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("click", e);
    // await signIn("google", { redirect: true });
    window.open("http://localhost:8000/auth/google", "_self");
  };

  return (
    <>
      {/* =============================== */}
      {/* MOBILE AND DESKTOP RESPONSIVE FORM */}
      {/* =============================== */}
      <section className="flex flex-col sm:flex-row mx-auto py-3 sm:px-8 min-h-screen">
        {/* Kolom Kiri: Judul */}
        {/* flex-1 flex justify-center items-center sm:items-start sm:max-w-6xl  sm:mt-36 */}
        <div className="justify-center sm:justify-center items-start md:items-start sm:max-w-6xl sm:mt-24">
          <h1 className="text-[40px] sm:text-[81px] font-bold text-green-rc mb-6 sm:mb-64 tracking-tight sm:text-left md:mx-1">
            Bergabung dengan Racket Network
          </h1>
        </div>

        {/* Kolom Kanan: Formulir Sign Up */}
        <div className="flex-1 max-w-md mx-auto sm:mx-0">
          <Card className="w-full border-none shadow-none">
            <CardHeader className="p-0 mb-3">
              <CardDescription className="text-[18px] sm:text-[21px] w-full sm:w-[370px] text-left">
                Buat akunmu dengan mengisi formulir di bawah ini
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Button
                type="button"
                onClick={handleLoginGoogle}
                className="w-full sm:w-[360px] h-12 border border-gray-300 flex items-center justify-center py-3 bg-white text-black rounded-md hover:bg-background-button-rc hover:text-white mb-4"
              >
                <Image
                  src={iconGoogle.src}
                  alt="Google Icon"
                  width={24}
                  height={24}
                  className="mr-2"
                  priority
                />
                Daftar dengan Google
              </Button>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full sm:w-[360px]"
                noValidate
              >
                <div className="flex items-center mt-5 justify-center space-x-2">
                  <div className="flex-1 border-t border-gray-400"></div>
                  <span className="text-sm text-gray-500">atau</span>
                  <div className="flex-1 border-t border-gray-400"></div>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                  <Label htmlFor="username"></Label>
                  <Input
                    {...register("username")}
                    id="username"
                    type="text"
                    className="border border-gray-300 w-full h-11"
                    placeholder="Masukkan nama lengkap"
                    aria-invalid={errors.username ? "true" : "false"}
                  />
                  <InputError error={errors.username?.message} />
                </div>

                <div className="space-y-5">
                  <Label htmlFor="phone_number"></Label>
                  <Input
                    {...register("phone_number")}
                    id="phone_number"
                    type="text"
                    className="border border-gray-300 w-full h-11"
                    aria-invalid={errors.phone_number ? "true" : "false"}
                    placeholder="Masukkan no telepon"
                  />
                  <InputError error={errors.phone_number?.message} />
                </div>

                <div className="space-y-5">
                  <Label htmlFor="email"></Label>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    className="border border-gray-300 w-full h-11"
                    aria-invalid={errors.email ? "true" : "false"}
                    placeholder="Masukkan email"
                  />
                  <InputError error={errors.email?.message} />
                </div>

                <div className="space-y-5">
                  <Label htmlFor="password"></Label>
                  <div className="relative">
                    <Input
                      {...register("password")}
                      id="password"
                      type={isVisible ? "text" : "password"}
                      className="border border-gray-300 w-full h-11 pr-10"
                      aria-invalid={errors.password ? "true" : "false"}
                      placeholder="Masukkan password"
                    />
                    <button
                      type="button"
                      onClick={toogleIsVisibility}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2"
                    >
                      {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <InputError error={errors.password?.message} />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Minimal 8 karakter, harus mengandung setidaknya satu huruf
                  besar, satu huruf kecil, dan satu angka
                </p>

                <div className="space-y-5">
                  <Label htmlFor="confirmPassword"></Label>
                  <div className="relative">
                    <Input
                      {...register("confirmPassword")}
                      id="confirmPassword"
                      type={isVisible ? "text" : "password"}
                      className="border border-gray-300 w-full h-11 pr-10"
                      placeholder="Konfirmasi password"
                    />
                    <button
                      type="button"
                      onClick={toogleIsVisibility}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2"
                    >
                      {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <InputError error={errors.confirmPassword?.message} />
                </div>
                {isMessageError}

                {/* Button Daftar */}
                <div className="py-5">
                  <Button
                    disabled={isPending}
                    className="bg-background-button-rc border border-gray-300 w-full sm:w-[360px] h-11 block"
                    type="submit"
                  >
                    <span className="text-[#E1FFA0]">
                      {isPending ? "Daftar..." : "Daftar"}
                    </span>
                  </Button>
                </div>

                {/* Tautan ke Halaman Login */}
                <p className="text-center text-sm text-zinc-600">
                  Sudah punya akun?{" "}
                  <Link
                    href="/sign-in"
                    className="text-blue-600 hover:underline"
                  >
                    Masuk
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

export default function Page() {
  return <SignUpPage />;
}
