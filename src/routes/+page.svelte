<script>
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex items-center justify-center min-h-screen">
	<div class="container">
		<h1 class="text-2xl font-bold">Welcome to Pelish</h1>
		<p class="mb-4">The (Simple) Personal Link Shortener.</p>
		<Button on:click={() => goto('/admin/login')}>Go to login</Button>
	</div>
</div>
