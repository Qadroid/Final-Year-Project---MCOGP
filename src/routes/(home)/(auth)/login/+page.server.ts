import type { PageServerLoad } from "./$types";
import { fail, superValidate } from "sveltekit-superforms"
import { loginSchema } from "../AuthSchema";
import { zod } from "sveltekit-superforms/adapters"
import { type Actions } from "@sveltejs/kit";
import { login } from "@/stores/user";

export const load: PageServerLoad = async () => {
    return {
        loginForm: await superValidate(zod(loginSchema)),
    };
}

export const actions: Actions = {
    default: async ({ request }) => {
        
        const loginForm = await superValidate(request, zod(loginSchema));
        if (!loginForm.valid) {
            return fail(400, {
                loginForm,
            })
        }

        try {
            await login(loginForm.data.email, loginForm.data.password)
        } catch (error) {
            console.error(error)
          }
    }
}