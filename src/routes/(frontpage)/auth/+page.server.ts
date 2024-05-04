import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms"
import { loginSchema, registerSchema } from "@/schemas/authSchema";
import { zod } from "sveltekit-superforms/adapters"
import { fail, redirect } from "@sveltejs/kit";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { userStore } from "sveltefire";

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

        const auth = getAuth()
        signInWithEmailAndPassword(auth, loginForm.data.email, loginForm.data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            })
        
        userStore(auth)

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

        const auth = getAuth()
        createUserWithEmailAndPassword(auth, registerForm.data.email, registerForm.data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            })

        console.log('Account created. Please login to continue');
        redirect(301, '/');
    }
}