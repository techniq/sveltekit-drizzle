import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { PageInsights } from '$lib/server/db/schema';

export async function load({ locals }) {
	const { user, session } = await locals.auth.validateUser();
	return { user, session, streamed: { views: fetchViews() } };
}

const fetchViews = async () => {
	// prettier-ignore
	const insights = await db
		.select()
		.from(PageInsights)
		.where(eq(PageInsights.id, 1));

	const views = (insights?.[0]?.views ?? 0) + 1;

	// prettier-ignore
	await db
		.insert(PageInsights)
		.values({ id: 1, views })
		.onConflictDoUpdate({ target: PageInsights.id, set: { views } });

	return views;
};
