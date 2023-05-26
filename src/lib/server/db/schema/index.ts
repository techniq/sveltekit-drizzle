import { pgTable, integer, serial } from 'drizzle-orm/pg-core';

export * from './auth';

export const PageInsights = pgTable('page_insights', {
	id: serial('id').primaryKey(),
	views: integer('views').notNull()
});
