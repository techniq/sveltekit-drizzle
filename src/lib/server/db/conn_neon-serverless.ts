import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

if (dev) {
	// https://github.com/neondatabase/serverless#run-on-node
	neonConfig.webSocketConstructor = ws;
}

// const connectionString = env.POSTGRES_URL; // Vercel Postgres
const connectionString = env.DATABASE_URL; // Neon

export const pool = new Pool({ connectionString });
export const conn = drizzle(pool);
