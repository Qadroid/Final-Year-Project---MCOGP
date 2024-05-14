import { writable } from 'svelte/store';
import { supabase } from '@/supabaseClient';
import type { AuthUser } from '@supabase/supabase-js';

export const user = writable<AuthUser | null>(null);

export async function getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        console.error('Error getting user:', error);
    } else {
        user.set(data.user);
    }
}

export async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        console.error('Error signing up:', error);
    } else {
        user.set(data.user);
    }
}

export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        console.error('Error signing in:', error);
    } else {
        user.set(data.user);
    }
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error signing out:', error);
    } else {
        user.set(null);
    }
}

supabase.auth.onAuthStateChange(async (event, session) => {
    if (session) {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
            console.error('Error getting user:', error);
        } else {
            user.set(data.user);
        }
    } else {
        user.set(null);
    }
});

getUser();
