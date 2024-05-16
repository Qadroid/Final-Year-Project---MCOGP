import { superValidate } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types";
import { projectSchema } from "./projectSchema";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import { databases, ID } from "@/appwrite";
import yaml from "js-yaml";

export const load: PageServerLoad = async () => {
    return {
        projectForm: await superValidate(zod(projectSchema)),
    }
}

export const actions: Actions = {
    default: async ({ request }) => {
        const projectForm = await superValidate(request, zod(projectSchema));
        if (!projectForm.valid) {
            return fail(400, {
                projectForm,
            })
        }

        const userKubeConfigYaml = yaml.dump(projectForm.data.kubeConfig);
        const userKubeConfigBase64 = Buffer.from(userKubeConfigYaml).toString('base64');
    
        databases.createDocument(
            "mcogp", 
            "projects",
            ID.unique(),
            {
                name: projectForm.data.name,
                description: projectForm.data.description,
                kubeConfig: userKubeConfigBase64,
            }
        )
    }
}