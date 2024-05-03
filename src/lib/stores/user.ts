import { writable } from 'svelte/store';
import { ID, account } from '@/appwrite';
import { type Models } from 'appwrite';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { registerSchema } from '@/schemas/authSchema';

interface AuthState {
	isLoggedIn: boolean;
	session: Models.Session | null;
	error: string | null;
	isLoading: boolean;
}

const authStore = writable<AuthState>({
	isLoggedIn: false,
	session: null,
	error: null,
	isLoading: false,
});

const register = async (event) => {
	
	// Form validation
	const registerForm = await superValidate(event, zod(registerSchema));
	if (!registerForm.valid) {
		return fail(400 , {
			registerForm
		})
	}

	// Authentication
	try {
		authStore.update(store => ({ ...store, isLoading: true }))
		const user = await account.create(ID.unique(), registerForm.data.email, registerForm.data.password);
		console.log("Registered user", user);
	} catch (error) {
		authStore.update(store => ({ ...store, error: error.message }))
	} finally {
		authStore.update(store => ({ ...store, isLoading: false }))
	}
}

const login = async (email: string, password: string) => {
	try {
		authStore.update(store => ({ ...store, isLoading: true }))
		const session = await account.createEmailPasswordSession(email, password);
		authStore.update(store => ({ ...store, isLoggedIn: true, session, error: null}))
	} catch (error) {
		authStore.update(store => ({ ...store, error: error.message }))
	} finally {
		authStore.update(store => ({ ...store, isLoading: false }))
	}
}
