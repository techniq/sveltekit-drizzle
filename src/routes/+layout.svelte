<script lang="ts">
	import { inject } from '@vercel/analytics';
	import { AppBar, AppLayout, Button, NavItem } from 'svelte-ux';

	import { dev } from '$app/environment';
	import { page } from '$app/stores';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<AppLayout>
	<nav slot="nav" class="h-full">
		<NavItem text="Home" path="/" currentUrl={$page.url} class="pl-6 py-2 mt-4" />
	</nav>

	<AppBar title="sveltekit-drizzle">
		<div slot="actions">
			<!-- App actions -->
		</div>
	</AppBar>

	<main class="p-4">
		<slot />
	</main>
</AppLayout>

<style lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	:global(body) {
		@apply bg-black/10;
	}
</style>
