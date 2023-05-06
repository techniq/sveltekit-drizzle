import { auth } from '$lib/auth/auth.server';
import { redirect } from '@sveltejs/kit';

// TODO: This should be a generic `/auth/logout/` instead of `/auth/github/logout`?
export async function GET({ locals }) {
	const { user, session } = await locals.auth.validateUser();

	if (session) {
		auth.invalidateSession(session.sessionId);
	} else {
		// Not currently logged in
	}

	throw redirect(302, '/');
}
