import { auth } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

export async function GET({ locals }) {
	const session = await locals.auth.validate();

	if (session) {
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie
	} else {
		// Not currently logged in
		throw fail(401);
	}

	throw redirect(302, '/');
}
