import lucia from 'lucia-auth';
import { sveltekit } from 'lucia-auth/middleware';
import { github } from '@lucia-auth/oauth/providers';
import { pg } from '@lucia-auth/adapter-postgresql';

import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { pool } from './db';

export const auth = lucia({
	adapter: pg(pool),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	transformDatabaseUser(user) {
		return { id: user.id, username: user.username };
	}
});

export const githubAuth = github(auth, {
	clientId: env.GITHUB_CLIENT_ID ?? 'MISSING',
	clientSecret: env.GITHUB_CLIENT_SECRET ?? 'MISSING'
});

export type Auth = typeof auth;
