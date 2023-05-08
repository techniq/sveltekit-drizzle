import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

import { env } from '$env/dynamic/private';

// const connectionString = env.POSTGRES_URL + '?sslmode=require'; // Vercel Postgres
const connectionString = env.DATABASE_URL + '?sslmode=require'; // Neon

export const pool = new pg.Pool({ connectionString });
export const db = drizzle(pool);
