import type { Actions, PageServerLoad } from "./$types";
import { fail, superValidate } from "sveltekit-superforms"
import { loginSchema } from "../AuthSchema";
import { zod } from "sveltekit-superforms/adapters"
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    return {
        loginForm: await superValidate(zod(loginSchema)),
    };
}

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const loginForm = await superValidate(request, zod(loginSchema));
        if (!loginForm.valid) {
            return fail(400, {
                loginForm,
            })
        }

        const { error } = await locals.supabase.auth.signInWithPassword({  
            email: loginForm.data.email, 
            password: loginForm.data.password 
        });

        if (error) {
            console.log(error);
            return redirect(302, '/auth')
        } else {
            return redirect(303, '/console')
        }
    }
}