import { z } from "zod";

export type SignInFormData = {
  email: string;
  password: string;
};

export type SignUpFormData = {
  email: string;
  phone_number: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export const SignUpFormSchema = z
  .object({
    email: z
      .string()
      .toLowerCase()
      .trim()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Silakan masukkan email yang valid"),
    // .email("Silakan masukkan email yang valid"),
    username: z.string().min(5, { message: "Username minimal 5 karakter" }).max(10, { message: "Username maksimal 10 karakter" }),
    // .transform((val) => val.replace(/\s+/g, "")),

    phone_number: z
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
  password: z.string(),
  // .min(8, { message: "Be at least 8 character long" })
  // .regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
  // .regex(/[0-9]/, { message: "Contain at least one number" })
  // .regex(/[^a-zA-Z0-9]/, { message: "Contain at least special characters" }),
});

export const OtpInFormSchema = z.object({
  otp: z.string().min(6, { message: "your one-time pasword must be 6 characters" }),
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

export const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z
    .string()
    .toLowerCase()
    .trim()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Silakan masukkan email yang valid"),
  phone: z.string().min(10, { message: "Phone number is required" }),
  level: z.enum(["Beginner", "Intermediate", "Advanced"], {
    message: "Please select a level",
  }),
});

// Skema validasi menggunakan Zod
export const CompetitionPaymentSchema = z.object({
  email: z
    .string()
    .toLowerCase()
    .trim()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Silakan masukkan email yang valid"),
  name: z.string().min(2, "Nama minimal 2 karakter"),
  phoneNumber: z.string().min(10, "Nomor telepon tidak valid"),
  level: z.enum(["Beginner", "Intermediate", "Advanced"], {
    error: "Pilih level yang valid",
  }),
  additionalInfo: z.string().optional(),
});

export const registrationMatchSchema = z.object({
  email: z
    .string()
    .toLowerCase()
    .trim()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Silakan masukkan email yang valid"),
  name: z.string().min(2, "Nama minimal 2 karakter"),
  phoneNumber: z.string().min(10, "Nomor telepon tidak valid"),
  level: z.enum(["Beginner", "Intermediate", "Advanced"], {
    error: "Pilih level yang valid",
  }),
  additionalInfo: z.string().optional(),
});

export type RegistrationMatchForm = z.infer<typeof registrationMatchSchema>;
export type SignUpFormSchema = z.infer<typeof SignUpFormSchema>;
export type SignInFormSchema = z.infer<typeof SignInFormSchema>;
export type OtpInFormSchema = z.infer<typeof OtpInFormSchema>;
export type reqPasswordFormSchema = z.infer<typeof reqPasswordFormSchema>;
export type NewPasswordFormSchema = z.infer<typeof NewPasswordFormSchema>;
export type ProfileFormData = z.infer<typeof profileFormSchema>;
export type RegistrationFormData = z.infer<typeof CompetitionPaymentSchema>;
