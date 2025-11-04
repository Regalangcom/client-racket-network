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
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Silakan masukkan email yang valid"
      ),
    // .email("Silakan masukkan email yang valid"),
    username: z
      .string()
      .min(5, { message: "Username minimal 5 karakter" })
      .max(10, { message: "Username maksimal 10 karakter" }),
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

export const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z
    .string()
    .toLowerCase()
    .trim()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Silakan masukkan email yang valid"
    ),
  phone_number: z.string().min(10, { message: "Phone number is required" }),
  level: z.enum(["Beginner", "Intermediate", "Advanced"], {
    message: "Please select a level",
  }),
  picture: z.string().optional(),
});

// Skema validasi menggunakan Zod
export const CompetitionPaymentSchema = z.object({
  email: z
    .string()
    .toLowerCase()
    .trim()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Silakan masukkan email yang valid"
    ),
  name: z.string().min(2, "Nama minimal 2 karakter"),
  phoneNumber: z.string().min(10, "Nomor telepon tidak valid"),
  level: z.enum(["Beginner", "Intermediate", "Advanced"], {
    error: "Pilih level yang valid",
  }),
  promoCode: z.string().optional(),
  additionalInfo: z.string().optional(),
});

export const registrationMatchSchema = z.object({
  email: z
    .string()
    .toLowerCase()
    .trim()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Silakan masukkan email yang valid"
    ),
  name: z.string().min(2, "Nama minimal 2 karakter"),
  phoneNumber: z.string().min(10, "Nomor telepon tidak valid"),
  level: z.enum(["Beginner", "Intermediate", "Advanced"], {
    error: "Pilih level yang valid",
  }),

  additionalInfo: z.string().optional(),
});

export const clubFormSchema = z.object({
  sport_category: z.string().min(1, "Please select a sport"),

  clubName: z
    .string()
    .min(3, "Club name must be at least 3 characters")
    .max(50, "Club name must be less than 50 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters")
    .optional()
    .or(z.literal("")),

  privacy: z.enum(["PUBLIC", "PRIVATE"], {
    error: "Please select privacy setting",
  }),

  location: z.string().min(1, "Please select a location"),

  home_court: z.string().min(1, "Please select a HomeCourt"),

  gender: z.enum(["all", "men", "women"], {
    error: "Please select gender preference",
  }),

  // Logo is optional, handled separately as File
  logo: z.any().optional(),
});

export const matchFormSchema = z.object({
  type_event: z.string().min(1, "Select event type"),

  event_title: z.string().min(2, "This field title is required"),
  // date: z.string(),
  date: z.string().optional(),
  location: z.string().min(1, "This field location is required"),

  TimeSlot: z
    .array(
      z.object({
        start_time: z.string().min(1, "Start time is required"),
        end_time: z.string().min(1, "End time is required"),
      })
    )
    .min(1, "At least one time slot is required")
    .max(5, "Maximum 5 time slots allowed")
    .refine(
      (slots) => {
        // Validate semua slots punya start_time dan end_time
        return slots.every((slot) => slot.start_time && slot.end_time);
      },
      { message: "All time slots must have start and end time" }
    )
    .refine(
      (slots) => {
        // Validate start_time < end_time
        return slots.every((slot) => slot.start_time < slot.end_time);
      },
      { message: "Start time must be before end time" }
    ),

  dateRange: z
    .object({
      from: z.string().optional(),
      to: z.string().optional(),
    })
    .optional(), // Date range

  gender: z.enum(["all", "men", "women"], {
    error: "Please select gender preference",
  }),
  level: z.enum(["Beginner", "Intermediate", "Advanced"], {
    error: "Pilih level yang valid",
  }),
  price: z
    .string()
    .nonempty("Price is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Price must be a number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Price must be greater than 0",
    }),

  quota: z
    .string()
    .nonempty("Participant count is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Participant must be a number",
    })
    .refine((val) => Number(val) >= 1, {
      message: "Participant must be at least 1",
    }),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters")
    .optional()
    .or(z.literal("")),
  banner_match: z.any().optional(),
});

export const competitionsFormSchema = z.object({
  type_event: z.string().min(1, "Select event type"),

  event_title: z.string().min(2, "This field title is required"),
  // date: z.string(),
  date: z.string().optional(),
  location: z.string().min(1, "This field location is required"),

  gender: z.enum(["all", "men", "women"], {
    error: "Please select gender preference",
  }),
  level: z.enum(["Beginner", "Intermediate", "Advanced"], {
    error: "Pilih level yang valid",
  }),
  price: z
    .string()
    .nonempty("Price is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Price must be a number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Price must be greater than 0",
    }),

  quota: z
    .string()
    .nonempty("Participant count is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Participant must be a number",
    })
    .refine((val) => Number(val) >= 1, {
      message: "Participant must be at least 1",
    }),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters")
    .optional()
    .or(z.literal("")),
  banner: z.any().optional(),
});

export type RegistrationMatchForm = z.infer<typeof registrationMatchSchema>;
export type SignUpFormSchema = z.infer<typeof SignUpFormSchema>;
export type SignInFormSchema = z.infer<typeof SignInFormSchema>;
export type OtpInFormSchema = z.infer<typeof OtpInFormSchema>;
export type reqPasswordFormSchema = z.infer<typeof reqPasswordFormSchema>;
export type NewPasswordFormSchema = z.infer<typeof NewPasswordFormSchema>;
export type ProfileFormData = z.infer<typeof profileFormSchema>;
export type RegistrationFormData = z.infer<typeof CompetitionPaymentSchema>;
export type ClubFormValues = z.infer<typeof clubFormSchema>;
export type MatchFormValues = z.infer<typeof matchFormSchema>;
export type CompetitionFormValues = z.infer<typeof competitionsFormSchema>;
export type ClubFormData = ClubFormValues & {
  logoPreview?: string;
};
