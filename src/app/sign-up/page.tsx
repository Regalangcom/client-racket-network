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
import { SignUpFormData, SignUpFormSchema } from "@/types/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputError from "../components/input-errors";
import Link from "next/link";
import { iconGoogle } from "../images";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

// interface SignUpFromProps {
//   action: (formdata: FormData) => Promise<void>;
// }

interface SignUpFormProps {
  action: (formData: SignUpFormData) => Promise<void>;
}

function SignInPage({ action }: SignUpFormProps) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isMessageError, setisMessageError] = useState<string | null>("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
    mode: "onTouched",
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
      alert("Registrasi berhasil! OTP telah dikirim ke email.");

      router.push(`/otp?email=${response.data.email}`);

      setIsPending(false);
      // await action(data);
      return response.data.data;
    } catch (error: any) {
      if (error.response) {
        setisMessageError(error.response.data.message);
      } else {
        setisMessageError("Terjadi kesalahan, coba lagi!");
      }
      setIsPending(false);
    }
  };

  const handleLoginGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("click", e);
    // await signIn("google", { redirect: true });
    window.open("http://localhost:8000/auth/google", "_self");
  };

  return (
    <section>
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in your account</CardTitle>
          <CardDescription>
            Welcome! Please fill in the details to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            //   onSubmit={handleSubmit((data, e) => {
            //     // Mengubah data form ke dalam FormData dan mengirimnya
            //     const formData = new FormData(e?.target)
            //     submitForm(formData)
            //   })}
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
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className={errors.password ? "text-destructive" : ""}
              >
                Password
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
              {/* <InputError error={isError?.password} /> */}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className={errors.username ? "text-destructive" : ""}
              >
                username
              </Label>
              <Input
                {...register("username")}
                id="username"
                type="username"
                placeholder="Enter your username"
                className={
                  errors.username ? "border-destructive ring-destructive" : ""
                }
                aria-invalid={errors.username ? "true" : "false"}
              />
              <InputError error={errors.username?.message} />
              {/* <InputError error={isError?.password} /> */}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className={errors.name ? "text-destructive" : ""}
              >
                name
              </Label>
              <Input
                {...register("name")}
                id="name"
                type="name"
                placeholder="Enter your name"
                className={
                  errors.name ? "border-destructive ring-destructive" : ""
                }
                aria-invalid={errors.name ? "true" : "false"}
              />
              <InputError error={errors.name?.message} />
              {/* <InputError error={isError?.password} /> */}
            </div>
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? "Sign Up ..." : "Sign Up"}
            </Button>
            <p className="text-center text-sm text-zinc-600">
              i have account ?{" "}
              <Link href="/sign-in" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
            {/* Tampilkan pesan error jika ada */}
            {isMessageError && (
              <div className="text-destructive text-sm mt-2 text-center">
                {isMessageError}
              </div>
            )}
          </form>
          <div className="mt-4">
            <Button
              onClick={handleLoginGoogle}
              className="w-full  flex items-center justify-center"
            >
              <Image
                src={iconGoogle.src}
                alt="Google Icon"
                width={24}
                height={24}
                className="mr-2"
              />
              Sign In with Google
            </Button>
          </div>
          <p className="text-muted-foreground mt-4 text-center text-sm">
            By joining, you agree to our{" "}
            <a href="/terms" className="hover:text-primary underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="hover:text-primary underline">
              Privacy Policy
            </a>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

export default SignInPage;
