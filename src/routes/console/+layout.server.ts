import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const session = await event.locals.session;

  if (!session) {
    throw redirect(302, '/auth');
  }

  return { session };
}