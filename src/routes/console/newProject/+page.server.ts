import { superValidate } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types";
import { projectSchema } from "./projectSchema";
import { zod } from "sveltekit-superforms/adapters";


export const load: PageServerLoad = async () => {
    return {
        projectForm: await superValidate(zod(projectSchema)),
    }
}
