
// import { handleNewDefaultProject } from '@/kubernetes/kubernetes'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
    depends('supabase:db:projects')
    
    const { data: projects } = await supabase
        .from('projects')
        .select('name')

    return {
        projects,
    }
}

// const defaultProjectExists = async ({ depends, supabase }) => {
//     depends('supabase:db:projects')

//     const { data: projects } = await supabase
//         .from('projects')
//         .select('name')
//         .eq('name', 'default')
//         .single()

//     if (!projects) {
//         return false
//     } else {
//         return true
//     }
// }

// if (!defaultProjectExists) {
//     handleNewDefaultProject({ locals: { user, supabase } })
//     console.log('Default project created')
// }

// console.log(defaultProjectExists)