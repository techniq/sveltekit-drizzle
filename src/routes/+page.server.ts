import { eq } from 'drizzle-orm';

import { conn } from '$lib/db/conn.server.js';
import { PageInsights } from '$lib/db/schema.js';

export async function load() {
	return { streamed: { views: fetchViews() } };
}

const fetchViews = async () => {
	// prettier-ignore
	const insights = await conn
		.select()
		.from(PageInsights)
		.where(eq(PageInsights.id, 1));

	const views = ++insights[0].views;

	// prettier-ignore
	await conn
		.update(PageInsights)
		.set({ views })
		.where(eq(PageInsights.id, 1))
		.returning();

	return views;
};
