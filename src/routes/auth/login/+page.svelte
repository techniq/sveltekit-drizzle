<script lang="ts">
	import { Button, TextField } from 'svelte-ux';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, errors, message, enhance, delayed, submitting } = superForm(data.form, {});
</script>

<div>
	<h1 class="text-xl mb-3">Log in</h1>
	<form method="POST" use:enhance class="grid gap-2">
		{#if $message}
			<div class="bg-red-50 border-l-2 border-red-500 py-2 px-2 text-red-800 rounded">
				{$message}
			</div>
		{/if}

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

		<Button type="submit" variant="fill" color="accent">Log in</Button>
	</form>
</div>
