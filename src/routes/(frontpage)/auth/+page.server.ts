import type { Actions, PageServerLoad } from "./$types";
import { fail, superValidate } from "sveltekit-superforms"
import { loginSchema, registerSchema } from "@/schemas/authSchema";
import { zod } from "sveltekit-superforms/adapters"
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    return {
        loginForm: await superValidate(zod(loginSchema)),
        registerForm: await superValidate(zod(registerSchema)),
    };
}

export const actions: Actions = {
    login: async ({ request, locals: { supabase } }) => {
        const loginForm = await superValidate(request, zod(loginSchema));
        if (!loginForm.valid) {
            return fail(400, {
                loginForm,
            })
        }

        const { error } = await supabase.auth.signInWithPassword({  
            email: loginForm.data.email, 
            passowrd: loginForm.data.password 
        });

        if (error) {
            console.log(error);
            return redirect(302, '/auth')
        } else {
            return redirect(303, '/console')
        }
    },

    signup: async ({ request, locals: { supabase } }) => {
        const registerForm = await superValidate(request, zod(registerSchema));
        if (!registerForm.valid) {
            return fail(400, {
                registerForm,
            })
        }

        const { error } = await supabase.auth.signUp({  
            email: registerForm.data.email, 
            passowrd: registerForm.data.password 
        });

        if (error) {
            console.log(error);
            return redirect(302, '/auth')
        } else {
            return redirect(303, '/')
        }
    }
}