<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Button } from 'svelte-ux';

	export let data;

	// $: console.log('user', data.user);
	// $: console.log('session', data.session);
</script>

<p class="mb-2">
	{#await data.streamed.views}
		Loading...
	{:then views}
		This page has been viewed {views} times.
		<Button on:click={() => invalidateAll()} variant="fill">Refresh</Button>
	{:catch error}
		{error.message}
	{/await}
</p>

{#if data.user}
	Signed in as: {data.user?.firstName}
	{data.user?.lastName} ({data.user?.username})
	<Button href="/auth/logout" variant="fill">Sign out</Button>
{:else}
	<Button href="/auth/register" variant="fill">Register</Button>
	<Button href="/auth/login" variant="fill">Login</Button>
	<Button href="/auth/github/login" variant="fill">Login to Github</Button>
{/if}
