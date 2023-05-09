import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { createInsertSchema } from 'drizzle-zod';
import { User } from '$lib/server/db/schema';

// const userSchema = createInsertSchema(User);

const userSchema = z.object({
	firstName: z.string().nonempty(),
	lastName: z.string().nonempty(),
	email: z.string().email(),
	username: z.string().min(4),
	password: z.string().min(6)
});

export async function load({ locals }) {
	// Redirect user if already signed in
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/');

	const form = await superValidate(userSchema);
	return { form };
}

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, userSchema);

		console.log(form);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const user = await auth.createUser({
				primaryKey: {
					providerId: 'username',
					providerUserId: form.data.username,
					password: form.data.password
				},
				attributes: {
					username: form.data.username,
					first_name: form.data.firstName,
					last_name: form.data.lastName,
					email: form.data.email
				}
			});
			const session = await auth.createSession(user.id);
			locals.auth.setSession(session);

			console.log('user created');
			message(form, 'User created!');
		} catch {
			// username already in use
			console.log('User already exists!');
			message(form, 'User already exists!');
			return fail(400);
		}
	}
};
