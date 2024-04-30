import { loginSchema, registerSchema } from "$lib/schemas/authSchema.js";
import { supabase } from "$lib/utils/supabase"
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { setLoginLoading, setRegisterLoading } from "$stores/authLoadingState";


export const load: PageServerLoad = async () => {
    return {
      loginForm: await superValidate(zod(loginSchema)),
      registerForm: await superValidate(zod(registerSchema)),
    };
};

export const actions = {
    login: async ({ request }) => {
        setLoginLoading(true)
        const loginForm = await superValidate(request, zod(loginSchema));
        if (!loginForm.valid) {
            return fail(400, {
                loginForm,
            });
        }

        try {

            const { error } = await supabase.auth.signInWithPassword({
                email: loginForm.data.email,
                password: loginForm.data.password,
            })
            
            
            if (error) throw error;
            
            throw redirect(303, "/")
        } catch (error) {
            console.error(error)
        } finally {
            setLoginLoading(false)
        }
    },
    
    register: async ({ request }) => {
        setRegisterLoading(true)
        const registerForm = await superValidate(request, zod(registerSchema));
        if (!registerForm.valid) {
            return fail(400, {
                registerForm,
            });
        }
        
        try {
            const { data, error } = await supabase.auth.signUp({
                email: registerForm.data.email,
                password: registerForm.data.password,
            })
            
            if (error) throw error;

            throw redirect(303, "/")
        } catch (error) {
            console.error(error)
        } finally {
            setRegisterLoading(false)
        }
        
    } 
}