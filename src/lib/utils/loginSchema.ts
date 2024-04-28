// import { superForm, type SuperValidated } from "sveltekit-superforms";
import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email({ message: "Invalid email" }).min(1, { message: "Email is required" }),
    password: z.string()
    .min(1, { message: "Password is required" })
    .refine(value => /[A-Z]/.test(value), { message: "Password must contain at least one uppercase letter" })
    .refine(value => /[a-z]/.test(value), { message: "Password must contain at least one lowercase letter" })
    .refine(value => /\d/.test(value), { message: "Password must contain at least one number" })
    .refine(value => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value), { message: "Password must contain at least one symbol" })
    .refine(value => /^[A-Za-z\d@$!%*?&]+$/g.test(value), { message: "Password contains illegal characters" }),
    confirmPassword: z.string()
    .min(1, { message: "Password confirmation is required" })
    .refine(value => value === registerSchema.password, { message: "Passwords do not match" })
});

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email" }).min(1, { message: "Email is required" }),
    password: z.string()
    .min(1, { message: "Password is required" })
});

export type RegisterSchema = typeof registerSchema;
export type LoginSchema = typeof loginSchema;