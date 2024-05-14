import type { Actions, PageServerLoad } from "./$types";
import { fail, superValidate } from "sveltekit-superforms"
import { registerSchema } from "../AuthSchema";
import { zod } from "sveltekit-superforms/adapters"
import { redirect } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

export const load: PageServerLoad = async () => {
    return {
        registerForm: await superValidate(zod(registerSchema)),
    };
}

export const actions: Actions = {
    default: async ({ request }) => {
        const registerForm = await superValidate(request, zod(registerSchema));
        if (!registerForm.valid) {
            return fail(400, {
                registerForm,
            })
        }

        const { error } = await supabase.auth.signUp({  
            email: registerForm.data.email, 
            password: registerForm.data.password 
        });

        if (error) {
            console.log(error);
            return redirect(302, '/auth')
        } else {
            return redirect(303, '/')
        }
    }
}