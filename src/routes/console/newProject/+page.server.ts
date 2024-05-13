import type { Actions } from "./$types";
import { fail, superValidate } from "sveltekit-superforms"
import { projectSchema } from "$routes/console/newProject/project-schema";
import { zod } from "sveltekit-superforms/adapters"
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import jsyaml from "js-yaml";

export const load: PageServerLoad = async () => {
    return {
        projectForm: await superValidate(zod(projectSchema)),
    }
}

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const projectForm = await superValidate(request, zod(projectSchema));
        if (!projectForm.valid) {
            return fail(400, {
                projectForm,
            })
        }

        console.log('before the if')
        console.log(projectForm)
        if (projectForm.data.kubeConfigType === 'upload') {
            console.log('inside the if')
            const kubeConfigFile = projectForm.data.kubeConfigFile;
            if (!kubeConfigFile) {
                return fail(400, {
                    projectForm,
                })
            }

            console.log('before supabase storage the if')
            const { data, error: storageError } = await supabase.storage.from('kubeConfigFiles').upload(projectForm.data.name ,projectForm.data.kubeConfigFile);
            if (storageError) {
                console.log(storageError);
                return redirect(302, '/console')
            }

            console.log('before the insert')

            const { error: insertError } = await supabase.from('projects').insert({
                name: projectForm.data.name,
                description: projectForm.data.description,
                kubeconfigfile: data.id,
            });

            if (insertError) {
                console.log(insertError);
                return redirect(302, '/console')
            }
        } else {
            console.log('past the if else')
            const kubeConfigJson = jsyaml.load(projectForm.data.kubeConfigPaste);

            console.log('before the insert 2')

            const { error } = await supabase.from('projects').insert({
                name: projectForm.data.name,
                description: projectForm.data.description,
                kubeconfig: kubeConfigJson,
                user_id: supabase.auth.getUser()?.id,

            });

            if (error) {
                console.log(error);
                return redirect(302, '/console')
            } else {
                return redirect(303, '/console')
            }
        }
    
    }
}