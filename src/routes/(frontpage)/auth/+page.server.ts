import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms"
import { loginSchema, registerSchema } from "@/schemas/authSchema";
import { zod } from "sveltekit-superforms/adapters"
import { account, ID } from '$lib/appwrite';
import { fail, redirect } from "@sveltejs/kit";

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
            const result = await account.createEmailPasswordSession(
                loginForm.data.email, 
                loginForm.data.password
            )
    
            console.log(result)

        } catch(exception) {
            console.log(exception)
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
            const result = await account.create(
                ID.unique(),
                registerForm.data.email,
                registerForm.data.password,
            );

            console.log(result)

            alert("Account created successfully!")
            redirect(301, '/auth/login')

        } catch( exception ) {
            console.log(exception)
        }
    }
}