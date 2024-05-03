import type { LayoutServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms"
import { loginSchema, registerSchema } from "@/schemas/authSchema";
import { zod } from "sveltekit-superforms/adapters"

export const load: LayoutServerLoad = async () => {
    return {
        loginForm: await superValidate(zod(loginSchema)),
        registerForm: await superValidate(zod(registerSchema)),
    };
}