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
import { SignInFormSchema, SignInFormData } from "@/types/zodSchema"; // Pastikan tipe data yang digunakan konsisten
import { zodResolver } from "@hookform/resolvers/zod";
import InputError from "../components/input-errors";
import Link from "next/link";
import { iconGoogle } from "../images";
import Image from "next/image";

// import { Toaster } from "@/components/ui/sonner";
// import { Router } from "next/router";

// interface SignUpFromProps {
//   action: (formdata: FormData) => Promise<void>;
// }

interface SignInFormProps {
  action: (formData: SignInFormData) => Promise<void>;
}

function SignInPage({ action }: SignInFormProps) {
  // const { data: session } = useSession();
  const [isPending, setIsPending] = useState<boolean>(false);
  // const [isResponse, setIsResponse] = useState<string | null>("");
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
      await action(data);
      setIsPending(false);
    } catch (error) {
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
              {/* <InputError error={isError?.email} /> */}
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
            <Button className="w-full" type="submit" disabled={isPending}>
              Sign In
            </Button>

            {/* Tombol Sign In dengan Google */}
            {/* {!session?.user && (
            <div className="mt-4">
              <Button className="w-full  flex items-center justify-center">
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
            )} */}
            <p className="text-center text-sm text-zinc-600">
              i don't have account ?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
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
