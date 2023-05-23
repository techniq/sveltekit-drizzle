#!/usr/bin/env node --loader ts-node/esm
import * as path from 'path';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';

const configFile = '.env.development.local';
const myEnv = config({ path: path.resolve(process.cwd(), configFile), debug: true });
// Expand variables
expand(myEnv);

// const connectionString = process.env.POSTGRES_URL + '?sslmode=require'; // Vercel Postgres
const connectionString = process.env.DATABASE_URL + '?sslmode=require'; // Neon

const pool = new pg.Pool({ connectionString });
const db = drizzle(pool, { logger: true });

// this will automatically run needed migrations on the database
await migrate(db, { migrationsFolder: './drizzle' });
