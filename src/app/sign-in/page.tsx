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
import { SignInFormSchema, SignInFormData } from "@/types/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputError from "../components/input-errors";
import Link from "next/link";
import { iconGoogle } from "../images";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// interface SignUpFromProps {
//   action: (formdata: FormData) => Promise<void>;
// }

interface SignInFormProps {
  action: (formData: SignInFormData) => Promise<void>;
}

function SignInPage({ action }: SignInFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);

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
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? "Sign in ..." : "Sign in"}
            </Button>
            <p className="text-center text-sm text-zinc-600">
              i don't have account ?{" "}
              <Link href="/sign-up" className="text-blue-600 hover:underline">
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
          {/* forget password */}
          <Link
            href="/reset-password"
            className="text-blue-600 hover:underline text-sm"
          >
            Forget Password
          </Link>
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
