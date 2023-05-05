<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;
</script>

<p>
	{#await data.streamed.views}
		Loading...
	{:then views}
		This page has been viewed {views} times.
	{:catch error}
		{error.message}
	{/await}
</p>

<button on:click={() => invalidate($page.url)}>Refresh</button>
