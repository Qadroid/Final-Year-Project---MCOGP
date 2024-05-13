import { superValidate } from 'sveltekit-superforms'
import type { PageServerLoad } from "./$types";
import { zod } from 'sveltekit-superforms/adapters'
import { projectSchema } from '$routes/console/newProject/project-schema'

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
    depends('supabase:db:projects')
    
    const { data: projects } = await supabase
        .from('projects')
        .select('*')

    return {
        projects,
        projectForm: await superValidate(zod(projectSchema)),
    }
}