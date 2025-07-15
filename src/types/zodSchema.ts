import { z } from "zod";

export type SignInFormData = {
  email: string;
  password: string;
};

export const SignUpFormSchema = z.object({
  email: z.email("Please enter a valid email").toLowerCase().trim(),
  username: z.string().max(30, { message: "Username maksimal 30 karakter" }),
  password: z
    .string()
    .min(10, { message: "Be at least 10 character ling" })
    .regex(/a-zA-Z/, { message: "Contain at least one letter" })
    .regex(/0-9/, { message: "Contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Contain at least special characters" }),
});

export const SignInFormSchema = z.object({
  email: z.email("Please enter a valid email").toLowerCase().trim(),
  password: z
    .string()
    .min(10, { message: "Be at least 10 character ling" })
    .regex(/a-zA-Z/, { message: "Contain at least one letter" })
    .regex(/0-9/, { message: "Contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Contain at least special characters" }),
});

export type SignUpFormSchema = z.infer<typeof SignUpFormSchema>;
export type SignInFormSchema = z.infer<typeof SignInFormSchema>;
