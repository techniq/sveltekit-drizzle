<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, errors, message, enhance, delayed, submitting } = superForm(data.form, {});
</script>

<div>
	<h1>Sign in</h1>
	<form method="POST" use:enhance>
		<label for="username">Username</label><br />
		<input id="username" name="username" /><br />
		<label for="password">Password</label><br />
		<input type="password" id="password" name="password" /><br />
		<input type="submit" value="Continue" />
	</form>
</div>

{#if $message}
	<div style:color="red">{$message}</div>
{/if}
