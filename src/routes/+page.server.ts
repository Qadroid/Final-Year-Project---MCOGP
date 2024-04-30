import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { loginSchema } from "$lib/schemas/authSchema.js";
 
export const load: PageServerLoad = async () => {
  return {
    loginForm: await superValidate(zod(loginSchema)),
  };
};
 
export const actions: Actions = {
  login: async (event) => {
    const form = await superValidate(event, zod(loginSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(form.data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return fail(response.status, {
        error: 'Failed to login'
      });
    }

    const data = await response.json();
    if (data.error) {
      return fail(400, {
        error: data.error
      });
    }
    return {
      form,
    };
  },
};