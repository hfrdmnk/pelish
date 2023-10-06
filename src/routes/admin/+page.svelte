<script>
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="container mt-8">
	<header class="flex justify-between">
		<h1 class="text-2xl font-bold">Welcome back!</h1>

		<Button>Create new link</Button>
	</header>
	<main class="grid grid-cols-[20rem_1fr] gap-8">
		<form method="POST" use:enhance action="?/logout">
			<Button variant="outline">Logout</Button>
		</form>
	</main>
</div>
