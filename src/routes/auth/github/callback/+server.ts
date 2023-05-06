import { auth, githubAuth } from '$lib/auth/auth.server';
import { redirect } from '@sveltejs/kit';

export async function GET({ cookies, url, locals }) {
	// get code and state params from url
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	// get stored state from cookies
	const storedState = cookies.get('github_oauth_state');

	// validate state
	if (state !== storedState) throw new Response(null, { status: 401 });

	try {
		const { existingUser, providerUser, createUser } = await githubAuth.validateCallback(code);

		const getUser = async () => {
			if (existingUser) {
				console.log('existing user', existingUser);
				return existingUser;
			}
			// create a new user if the user does not exist
			return await createUser({
				// attributes
				username: providerUser.login
			});
		};
		const user = await getUser();
		console.log({ user });
		const session = await auth.createSession(user.id);
		locals.auth.setSession(session);
	} catch (e) {
		// invalid code
		return new Response(null, {
			status: 500
		});
	}
	throw redirect(302, '/');
}