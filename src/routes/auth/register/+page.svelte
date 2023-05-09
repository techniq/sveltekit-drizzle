<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, errors, message, enhance, delayed, submitting } = superForm(data.form, {
		resetForm: true
	});

	$: console.log($errors, $message);
</script>

{#if $message}
	<h4>{$message}</h4>
{/if}

<div>
	<h1>Create an account</h1>
	<form method="POST" use:enhance>
		<label for="firstName">First name</label><br />
		<input id="firstName" name="firstName" bind:value={$form.firstName} /><br />
		{#if $errors.firstName}
			<small style:display="block">{$errors.firstName}</small>
		{/if}

		<label for="lastName">Last name</label><br />
		<input id="lastName" name="lastName" bind:value={$form.lastName} /><br />
		{#if $errors.lastName}
			<small style:display="block">{$errors.lastName}</small>
		{/if}

		<label for="email">Email</label><br />
		<input id="email" name="email" bind:value={$form.email} /><br />
		{#if $errors.email}
			<small style:display="block">{$errors.email}</small>
		{/if}

		<label for="username">Username</label><br />
		<input id="username" name="username" bind:value={$form.username} /><br />
		{#if $errors.username}
			<small style:display="block">{$errors.username}</small>
		{/if}

		<label for="password">Password</label><br />
		<input type="password" id="password" name="password" bind:value={$form.password} /><br />
		{#if $errors.password}
			<small style:display="block">{$errors.password}</small>
		{/if}

		<input type="submit" value="Signup" />
		{#if $submitting}
			submitting...
		{/if}
	</form>
</div>
