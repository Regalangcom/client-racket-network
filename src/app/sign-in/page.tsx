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
import { SignInFormSchema, SignInFormData } from "@/constant/types/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputError from "../components/input-errors";
import Link from "next/link";
import { iconGoogle } from "../../public";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

// interface SignUpFromProps {
//   action: (formdata: FormData) => Promise<void>;
// }

// interface SignInFormProps {
//   action: (formData: SignInFormData) => Promise<void>;
// }

function SignInPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInFormSchema),
    mode: "onTouched",
  });

  // handle toogle hide password
  const toogleIsVisibility = () => setIsVisible((prevState) => !prevState);
  const onSubmit = async (data: SignInFormData) => {
    try {
      setIsPending(true);
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) console.log("login failed", result?.error);
      if (!result?.error) {
        router.refresh();
        router.push("/profile");
      }

      setIsPending(false);
    } catch (error) {
      setIsPending(false);
    }
  };

  const handleLoginGoogle = async () => {
    window.open("http://localhost:8000/auth/google", "_self");
  };

  // const resetPassword = async (data: SignInFormData) => {
  //   try {
  //     setIsPending(true);
  //     const response = await axios.put(
  //       `${process.env.NEXT_PUBLIC_URL_API}/api/v1/users/requestLinkPasswordReset`,
  //       {
  //         email: data.email,
  //       },
  //       { withCredentials: true }
  //     );

  //     toast.success(response.data.message);
  //     setIsPending(false);
  //     // const result = response.data.data;
  //     // return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      {/* =============================== */}
      {/* MOBILE AND DESKTOP RESPONSIVE FORM */}
      {/* =============================== */}
      <section className="flex flex-col sm:flex-row mx-auto py-3 sm:px-8 min-h-screen">
        {/* Kolom Kiri: Judul */}
        {/* flex-1 flex */}
        <div className="justify-center sm:justify-center items-start md:items-start sm:max-w-6xl  sm:mt-24">
          <h1 className="text-[40px] sm:text-[81px] font-bold text-green-rc mb-6 tracking-tight sm:text-left md:mx-1">
            Bergabung dengan Racket Network
          </h1>
        </div>

        {/* Kolom Kanan: Formulir Sign In */}
        <div className="flex-1 sm:items-start sm:max-w-6xl md:max-w-md sm:mx-0">
          <Card className="full border-none shadow-none">
            <CardHeader className="p-0 mb-3">
              <CardDescription className="text-[18px] sm:text-[21px] w-full sm:w-[370px] text-left">
                Masuk ke Racket Network
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
                {/* ======================= */}
                {/* Reset Password */}
                {/* ======================= */}
                <div className="w-full flex justify-end py-3">
                  <Link
                    href="/reset-password"
                    className="text-blue-600 text-sm hover:underline "
                  >
                    Lupa password ?
                  </Link>
                </div>
                {/* Button Daftar */}
                <div className="py-5">
                  <Button
                    disabled={isPending}
                    className="bg-background-button-rc border border-gray-300 w-full sm:w-[360px] h-11 block"
                    type="submit"
                  >
                    <span className=" text-[#E1FFA0]">
                      {isPending ? "Masuk..." : "Masuk"}
                    </span>
                  </Button>
                </div>

                {/* Tautan ke Halaman Login */}
                <p className="text-center text-sm text-zinc-600">
                  belum punya akun?{" "}
                  <Link
                    href="/sign-up"
                    className="text-blue-600 hover:underline"
                  >
                    Daftar
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
  return <SignInPage />;
}
