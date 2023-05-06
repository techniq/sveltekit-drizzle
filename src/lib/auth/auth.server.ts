import lucia from 'lucia-auth';
import { sveltekit } from 'lucia-auth/middleware';
import { github } from '@lucia-auth/oauth/providers';
// Use `pg` (node) until Vercel Postgres (based on https://github.com/neondatabase/serverless likely) adapter is available
import postgres from 'pg';
import { pg } from '@lucia-auth/adapter-postgresql';

import { dev } from '$app/environment';

const connectionPool = new postgres.Pool({
	connectionString: process.env.POSTGRES_URL + '?sslmode=require'
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