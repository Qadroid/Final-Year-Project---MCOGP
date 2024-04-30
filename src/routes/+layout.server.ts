import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const session = await event.locals.session;
  
  return { session };
}