import type { Actions, PageServerLoad } from "./$types";
import { fail, superValidate } from "sveltekit-superforms"
import { registerSchema } from "../AuthSchema";
import { zod } from "sveltekit-superforms/adapters"
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    return {
        registerForm: await superValidate(zod(registerSchema)),
    };
}

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const registerForm = await superValidate(request, zod(registerSchema));
        if (!registerForm.valid) {
            return fail(400, {
                registerForm,
            })
        }

        // Insert the new user into the `users` table
        const { data: userData, error: userError } = await locals.supabase.auth.signUp({
                email: registerForm.data.email,
                password: registerForm.data.password,
        })

        if (userError) {
            console.error('Error inserting user:', userError);
            return fail(500, {
                registerForm,
                error: 'Error inserting user',
            });
        }

        // Insert a new row into the `userSettings` table using the user ID
        const { error: userSettingsError } = await locals.supabase
            .from('userSettings')
            .insert({
                user_id: userData.user?.id,
                selectedProject: null,
            });

        if (userSettingsError) {
            console.error('Error inserting user settings:', userSettingsError);
            return fail(500, {
                registerForm,
                error: 'Error inserting user settings',
            });
        }

        return redirect(303, '/console')
    }
}