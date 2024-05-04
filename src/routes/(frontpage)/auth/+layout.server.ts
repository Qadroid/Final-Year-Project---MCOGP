import type { LayoutServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms"
import { loginSchema, registerSchema } from "@/schemas/authSchema";
import { zod } from "sveltekit-superforms/adapters"
import { SignedIn } from "sveltefire";
import { onMount } from "svelte";
import { redirect } from "@sveltejs/kit";

onMount(() => {
    if (SignedIn) {
        console.log('User is signed in');
        redirect(302, '/');
    }
})

export const load: LayoutServerLoad = async () => {
    return {
        loginForm: await superValidate(zod(loginSchema)),
        registerForm: await superValidate(zod(registerSchema)),
    };
}