import { supabase } from '$lib/utils/supabase';
import type { RequestHandler } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit/types/private';

export const post: RequestHandler = async (event: RequestEvent) => {
    try {
        const requestBody = JSON.parse(event.request.body as string);
        const { email, password } = requestBody;

        if (typeof email !== 'string' || typeof password !== 'string') {
            return { status: 400, body: { error: 'Invalid input' } };
        }

        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            return { status: 401, body: { error: error.message } };
        }

        const { user } = data;
        
        return { status: 200, body: { user } };
    } catch (error) {
        // Log the error or send it to an error tracking service
        console.error('Registration error:', error);
        return { status: 500, body: { error: 'Server error' } };
    }
};
