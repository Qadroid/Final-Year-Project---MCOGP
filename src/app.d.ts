// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			loginForm: superValidated;
			registerForm: superValidated;
		}
		interface LayoutData {
			loggedIn: boolean;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
