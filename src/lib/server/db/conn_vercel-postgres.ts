import { drizzle } from 'drizzle-orm/vercel-postgres';
import { createPool } from '@vercel/postgres';

import { env } from '$env/dynamic/private';

// Note: @vercel/postgres requires `process.env.POSTGRES_URL`.  Can also pass `connectionString` to `createPool()`

// const connectionString = env.POSTGRES_URL; // Vercel Postgres
// const connectionString = env.DATABASE_URL; // Neon

export const pool = createPool();
export const conn = drizzle(pool);
