import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms"
import { registerSchema } from "../AuthSchema";
import { zod } from "sveltekit-superforms/adapters"

export const load: PageServerLoad = async () => {
    return {
        registerForm: await superValidate(zod(registerSchema)),
    };
}
