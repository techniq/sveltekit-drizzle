<script lang="ts">
	import { Button, TextField } from 'svelte-ux';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, errors, message, enhance, delayed, submitting } = superForm(data.form, {
		resetForm: true
	});
</script>

{#if $message}
	<h4>{$message}</h4>
{/if}

<div>
	<h1 class="text-xl mb-2">Create an account</h1>
	<form method="POST" use:enhance class="grid gap-2">
		<TextField
			label="First name"
			name="firstName"
			bind:value={$form.firstName}
			error={$errors.firstName}
		/>

		<TextField
			label="Last name"
			name="lastName"
			bind:value={$form.lastName}
			error={$errors.lastName}
		/>

		<TextField label="Email" name="email" bind:value={$form.email} error={$errors.email} />

		<TextField
			label="Username"
			name="username"
			bind:value={$form.username}
			error={$errors.username}
		/>

		<TextField
			label="Password"
			name="password"
			type="password"
			bind:value={$form.password}
			error={$errors.password}
		/>

		<div>
			<Button
				type="submit"
				value="Signup"
				variant="fill"
				color="blue"
				loading={$submitting}
				disabled={$submitting}
			>
				Signup
			</Button>
		</div>
	</form>
</div>
