<script lang="ts">
	import { invalidateAll } from '$app/navigation';

	export let data;

	// $: console.log('user', data.user);
	// $: console.log('session', data.session);
</script>

<p>
	{#await data.streamed.views}
		Loading...
	{:then views}
		This page has been viewed {views} times.
		<button on:click={() => invalidateAll()}>Refresh</button>
	{:catch error}
		{error.message}
	{/await}
</p>

{#if data.user}
	Signed in as: {data.user?.username}
	<a href="/auth/github/logout">Sign out</a>
{:else}
	<a href="/auth/github/login">Login to Github</a>
{/if}
