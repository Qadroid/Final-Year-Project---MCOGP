// See https://kit.svelte.dev/docs/types#app

import type { PocketBase, AuthModel } from 'pocketbase'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: PocketBase
			user: AuthModel | undefined
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface LoadEvent {
			locals: Locals
		}
	}
}

export {};
