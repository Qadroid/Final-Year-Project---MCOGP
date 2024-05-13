import type { Actions } from "./$types";
import { fail, superValidate } from "sveltekit-superforms"
import { projectSchema } from "$routes/console/newProject/project-schema";
import { zod } from "sveltekit-superforms/adapters"
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
    depends('supabase:db:projects')
    
    return {
        projectForm: await superValidate(zod(projectSchema)),
    }
}

export const actions: Actions = {
    newProject: async ({ request, locals: { supabase } }) => {
        console.log('newProject action');
        const projectForm = await superValidate(request, zod(projectSchema));
        if (!projectForm.valid) {
            return fail(400, {
                projectForm,
            })
        }

        if (projectForm.data.kubeConfigType === 'upload') {
            const kubeConfigFile = projectForm.data.kubeConfigFile;
            if (!kubeConfigFile) {
                return fail(400, {
                    projectForm,
                })
            }

            const { data, error: storageError } = await supabase.storage.from('kubeConfigFiles').upload(projectForm.data.name ,projectForm.data.kubeConfigFile);
            if (storageError) {
                console.log(storageError);
                return redirect(302, '/console')
            }

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
            const { error } = await supabase.from('projects').insert({
                name: projectForm.data.name,
                description: projectForm.data.description,
                kubeconfig: projectForm.data.kubeConfigPaste,

            });

            if (error) {
                console.log(error);
                return redirect(302, '/console')
            } else {
                return redirect(303, '/console')
            }
        }

        const { error } = await supabase.from('projects').insert({
            name: projectForm.data.name,
        });

        if (error) {
            console.log(error);
            return redirect(302, '/console')
        } else {
            return redirect(303, '/console')
        }
    
    }
}