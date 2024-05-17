import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms"
import { loginSchema } from "../AuthSchema";
import { zod } from "sveltekit-superforms/adapters"

export const load: PageServerLoad = async () => {
    return {
        loginForm: await superValidate(zod(loginSchema)),
    };
}