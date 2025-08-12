import { z } from "zod";

export type SignInFormData = {
  email: string;
  password: string;
};

export type SignUpFormData = {
  email: string;
  notelpon: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export const SignUpFormSchema = z
  .object({
    email: z.email("Silakan masukkan email yang valid").toLowerCase().trim(),
    username: z
      .string()
      .min(5, { message: "Username minimal 5 karakter" })
      .max(10, { message: "Username maksimal 10 karakter" }),
    // .transform((val) => val.replace(/\s+/g, "")),

    notelpon: z
      .string()
      .nonempty({ message: "Nomor telepon wajib diisi" })
      .regex(/^[0-9]+$/, { message: "Nomor telepon hanya boleh angka" }),
    confirmPassword: z
      .string()
      .min(10, { message: "Minimal 10 karakter" })
      .regex(/[a-zA-Z]/, { message: "Harus mengandung minimal 1 huruf" })
      .regex(/[0-9]/, { message: "Harus mengandung minimal 1 angka" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Harus mengandung minimal 1 karakter spesial",
      }),

    password: z
      .string()
      .min(10, { message: "Minimal 10 karakter" })
      .regex(/[a-zA-Z]/, { message: "Harus mengandung minimal 1 huruf" })
      .regex(/[0-9]/, { message: "Harus mengandung minimal 1 angka" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Harus mengandung minimal 1 karakter spesial",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });

export const SignInFormSchema = z.object({
  email: z.email("Please enter a valid email").toLowerCase().trim(),
  password: z
    .string()
    .min(10, { message: "Be at least 10 character ling" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
    .regex(/[0-9]/, { message: "Contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Contain at least special characters" }),
});

export const OtpInFormSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "your one-time pasword must be 6 characters" }),
});

export const reqPasswordFormSchema = z.object({
  email: z.email("Please enter a valid email").toLowerCase().trim(),
});

export const NewPasswordFormSchema = z.object({
  password: z
    .string()
    .min(10, "Be at least 10 character ling")
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
    .regex(/[0-9]/, { message: "Contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Contain at least special characters" }),
});
export type SignUpFormSchema = z.infer<typeof SignUpFormSchema>;
export type SignInFormSchema = z.infer<typeof SignInFormSchema>;
export type OtpInFormSchema = z.infer<typeof OtpInFormSchema>;
export type reqPasswordFormSchema = z.infer<typeof reqPasswordFormSchema>;
export type NewPasswordFormSchema = z.infer<typeof NewPasswordFormSchema>;
