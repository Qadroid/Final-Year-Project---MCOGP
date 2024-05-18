import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms"
import { registerSchema } from "../AuthSchema";
import { zod } from "sveltekit-superforms/adapters"
import type { Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    return {
        registerForm: await superValidate(zod(registerSchema)),
    };
}

export const actions: Actions = {
    default: async ({ locals, request }) => {
        const form = await superValidate(request, zod(registerSchema))
        if (!form.valid) {
            return {
                status: 400,
                form
            }
        }
        try {
            await locals.pb.collection('users').create(form.data)
            return {
                status: 303,
                form
            }
        } catch (err) {
            return {
                status: 400,
                form
            }
        }
    }
}