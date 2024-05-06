import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:projects');
	const { data: projects } = await supabase.from('projects').select('id, name').order('name');
	return { projects: projects || [] }
};