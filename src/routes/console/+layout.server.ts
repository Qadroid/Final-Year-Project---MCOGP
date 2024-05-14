import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
    const selectedProject: string = await locals.supabase.from('userSettings').select('selectedProject').single().then(({ data }) => data?.selectedProject)
    return {
        selectedProject,
    }
}