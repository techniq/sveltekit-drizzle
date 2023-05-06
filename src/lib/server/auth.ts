import lucia from 'lucia-auth';
import { sveltekit } from 'lucia-auth/middleware';
import { github } from '@lucia-auth/oauth/providers';
import { Pool } from '@neondatabase/serverless';
import { pg } from '@lucia-auth/adapter-postgresql';

import { dev } from '$app/environment';

const connectionPool = new Pool({
	connectionString: process.env.POSTGRES_URL
});

export const auth = lucia({
	adapter: pg(connectionPool),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	transformDatabaseUser(user) {
		return { id: user.id, username: user.username };
	}
});

export const githubAuth = github(auth, {
	clientId: process.env.GITHUB_CLIENT_ID ?? 'MISSING',
	clientSecret: process.env.GITHUB_CLIENT_SECRET ?? 'MISSING'
});

export type Auth = typeof auth;
