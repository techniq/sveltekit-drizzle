import { auth } from '$lib/server/auth';

export async function handle({ event, resolve }) {
	event.locals.auth = auth.handleRequest(event);
	return await resolve(event);
}
