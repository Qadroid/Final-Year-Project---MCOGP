import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
    const session = await event.locals.session;
  
    if (session) {
      throw redirect(301, '/account');
    }
  
    return { session };
}