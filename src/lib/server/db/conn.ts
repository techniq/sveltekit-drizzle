import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { env } from '$env/dynamic/private';

// const connectionString = env.POSTGRES_URL + '?sslmode=require'; // Vercel Postgres
const connectionString = env.DATABASE_URL + '?sslmode=require'; // Neon

export const pool = new Pool({ connectionString });
export const conn = drizzle(pool);
