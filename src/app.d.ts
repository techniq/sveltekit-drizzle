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
			// see: User in `schema.ts` and lucia's `transformDatabaseUser()`
			// Uses table names and not drizzle ORM
			username: string;
			first_name: string;
			last_name: string;
			email: string;
		};
	}
}

// THIS IS IMPORTANT!!!
export {};
