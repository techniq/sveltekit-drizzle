import {
	pgTable,
	integer,
	serial,
	varchar,
	bigint,
	boolean,
	uniqueIndex,
	timestamp
} from 'drizzle-orm/pg-core';

export const PageInsights = pgTable('page_insights', {
	id: serial('id').notNull(),
	views: integer('views').notNull()
});

/*
 * Lucia schema - https://lucia-auth.com/adapters/postgresql#database-schema
 */

export const user = pgTable(
	'auth_user',
	{
		id: varchar('id', {
			length: 15 // change this when using custom user ids
		}).primaryKey(),

		// other user attributes
		username: varchar('username', {
			length: 15
		}).notNull(),

		firstName: varchar('first_name', {
			length: 15
		}),

		lastName: varchar('last_name', {
			length: 15
		}),

		email: varchar('email', {
			length: 15
		}),

		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
	},
	(user) => {
		return {
			usernameIndex: uniqueIndex('username_idx').on(user.username)
		};
	}
);

export const session = pgTable('auth_session', {
	id: varchar('id', {
		length: 128
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	activeExpires: bigint('active_expires', {
		mode: 'number'
	}).notNull(),
	idleExpires: bigint('idle_expires', {
		mode: 'number'
	}).notNull()
});

export const key = pgTable('auth_key', {
	id: varchar('id', {
		length: 255
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	primaryKey: boolean('primary_key').notNull(),
	hashedPassword: varchar('hashed_password', {
		length: 255
	}),
	expires: bigint('expires', {
		mode: 'number'
	})
});
