import { loginSchema, registerSchema } from "$lib/schemas/authSchema.js";
import { supabase } from "$lib/utils/supabase"
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export function load({ cookies }) {
    const session = cookies.get("session")
    return {
        session
    }
}

export const actions = {
    login: async ({ cookies, request }) => {
        const loginForm = await superValidate(request, zod(loginSchema));
        if (!loginForm.valid) {
            return fail(400, {
                loginForm,
            });
        }
        const { data, error } = await supabase.auth.signInWithPassword({
            email: loginForm.data.email,
            password: loginForm.data.password,
        })
    },
    
    register: async ({ cookies, request }) => {
        const registerForm = await superValidate(request, zod(registerSchema));
        if (!registerForm.valid) {
            return fail(400, {
                registerForm,
            });
        }
        const { data, error } = await supabase.auth.signUp({
            email: registerForm.data.email,
            password: registerForm.data.password,
        })
    }
}