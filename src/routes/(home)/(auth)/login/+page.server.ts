import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms"
import { loginSchema } from "../AuthSchema";
import { zod } from "sveltekit-superforms/adapters"
import { type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    return {
        loginForm: await superValidate(zod(loginSchema)),
    };
}

export const actions: Actions = {
    default: async ({ locals, request} ) => {
        const form = await superValidate(request, zod(loginSchema))
        if (!form.valid) {
            return {
                status: 400,
                form
            }
        }
        try {
            await locals.pb.collection('users').authWithPassword(form.data.email, form.data.password)
            locals.user = locals.pb.authStore.model
            return {
                status: 303,
                form,
                redirect: '/console'
                
            }
        } catch (err) {
            return {
                status: 400,
                form
            }
        }
    }
}