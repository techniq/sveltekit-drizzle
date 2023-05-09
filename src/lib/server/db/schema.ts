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

export const User = pgTable(
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
			length: 100
		}),

		lastName: varchar('last_name', {
			length: 100
		}),

		email: varchar('email', {
			length: 255
		}),

		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
	},
	(user) => {
		return {
			usernameIndex: uniqueIndex('username_idx').on(user.username)
		};
	}
);

export const Session = pgTable('auth_session', {
	id: varchar('id', {
		length: 128
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => User.id),
	activeExpires: bigint('active_expires', {
		mode: 'number'
	}).notNull(),
	idleExpires: bigint('idle_expires', {
		mode: 'number'
	}).notNull()
});

export const Key = pgTable('auth_key', {
	id: varchar('id', {
		length: 255
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => User.id),
	primaryKey: boolean('primary_key').notNull(),
	hashedPassword: varchar('hashed_password', {
		length: 255
	}),
	expires: bigint('expires', {
		mode: 'number'
	})
});
