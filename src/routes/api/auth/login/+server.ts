import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { supabase } from '$lib/utils/supabase';

export const post: RequestHandler = async ({ body }) => {
    const { email, password } = JSON.parse(body);

    try {
        const { user, session, error: authError } = await supabase.auth.signIn({
            email,
            password
        })
        if (authError) throw authError
        return { status: 200, body: { user, session } }
    } catch (error) {
        if (error.status === 400) { // Typically bad request due to invalid email/password
            return { status: 400, body: 'Invalid email or password' };
        }
        return { status: 500, body: 'Something went wrong with the server' }; // For unexpected errors
    }
}