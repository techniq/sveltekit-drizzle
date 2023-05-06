// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface Locals {
			auth: import('lucia-auth').AuthRequest;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

/// <reference types="lucia-auth" />
declare global {
	namespace Lucia {
		type Auth = import('$lib/server/auth').Auth;
		type UserAttributes = {
			// see: `schema.ts` and lucia's `transformDatabaseUser()`
			username: string;
		};
	}
}

// THIS IS IMPORTANT!!!
export {};
