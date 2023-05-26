import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';

const loginSchema = z.object({
	username: z.string(),
	password: z.string()
});

// If the user exists, redirect authenticated users to the profile page.
export async function load({ locals }) {
	// Redirect user if already signed in
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/');

	const form = await superValidate(loginSchema);
	return { form };
}

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, loginSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const key = await auth.useKey('username', form.data.username, form.data.password);
			const session = await auth.createSession(key.userId);
			locals.auth.setSession(session);
		} catch {
			message(form, 'Invalid credentials');
			return fail(400, { form });
		}
	}
};
