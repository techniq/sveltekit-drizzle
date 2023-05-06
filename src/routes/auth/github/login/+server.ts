import { auth, githubAuth } from '$lib/auth/auth.server';

// https://lucia-auth.com/oauth/start-here/getting-started
// https://lucia-auth.com/oauth/providers/github

export async function GET({ cookies }) {
	// get url to redirect the user to, with the state
	const [url, state] = await githubAuth.getAuthorizationUrl();

	// the state can be stored in cookies or localstorage for request validation on callback
	cookies.set('github_oauth_state', state, {
		path: '/',
		maxAge: 60 * 60
	});

	// redirect to authorization url
	return new Response(null, {
		status: 302,
		headers: {
			location: url.toString()
		}
	});
}
