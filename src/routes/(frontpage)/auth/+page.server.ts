import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms"
import { loginSchema, registerSchema } from "@/schemas/authSchema";
import { zod } from "sveltekit-superforms/adapters"
import { supabase } from "@/supabase";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    return {
        loginForm: await superValidate(zod(loginSchema)),
        registerForm: await superValidate(zod(registerSchema)),
    };
}

export const actions: Actions = {
    login: async (event) => {
        const loginForm = await superValidate(event, zod(loginSchema));
        if (!loginForm.valid) {
            return fail(400 , {
                loginForm
            })
        }

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: loginForm.data.email,
                password: loginForm.data.password
            })
            if (error) throw error
        } catch(error) {
            console.log(error)
        }
    },

    register: async (event) => {
        const registerForm = await superValidate(event, zod(registerSchema));
        if (!registerForm.valid) {
            return fail(400 , {
                registerForm
            })
        }

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: registerForm.data.email,
                password: registerForm.data.password
            })
            if (error) throw error
        } catch(error) {
            console.log(error)
        }
    }
}