import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms"
import { loginSchema, registerSchema } from "@/schemas/authSchema";
import { zod } from "sveltekit-superforms/adapters"
import { fail, redirect } from "@sveltejs/kit";
import { user } from '@/stores/user';

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
            user.login(loginForm.data.email, loginForm.data.password);
        } catch (error) {
            console.log(error);
        }

        console.log('Logged in');
        redirect(301, '/');
    },

    register: async (event) => {
        const registerForm = await superValidate(event, zod(registerSchema));
        if (!registerForm.valid) {
            return fail(400 , {
                registerForm
            })
        }

        try {
            user.register(registerForm.data.email, registerForm.data.password);
        } catch (error) {
            console.log(error);
        }

        console.log('Logged in');
        redirect(301, '/');
    }
}