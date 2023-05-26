import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { PageInsights } from '$lib/server/db/schema';
import { cache } from '$lib/server/cache/index.js';

export async function load({ locals, route }) {
	const { user, session } = await locals.auth.validateUser();
	return { user, session, streamed: { views: fetchViews(route.id) } };
}

async function fetchViews(routeId: string) {
	return await cache.incr(routeId);
}

// async function fetchViews() {
// 	// prettier-ignore
// 	const insights = await db
// 		.select()
// 		.from(PageInsights)
// 		.where(eq(PageInsights.id, 1));

// 	const views = (insights?.[0]?.views ?? 0) + 1;

// 	// prettier-ignore
// 	await db
// 		.insert(PageInsights)
// 		.values({ id: 1, views })
// 		.onConflictDoUpdate({ target: PageInsights.id, set: { views } });

// 	return views;
// }
