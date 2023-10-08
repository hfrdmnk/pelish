<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import NewLinkDialog from './NewLinkDialog.svelte';

	export let data;
	export let form;
</script>

<div class="container mt-8">
	<Dialog.Root open={form?.open}>
		<header class="flex justify-between">
			<h1 class="text-2xl font-bold">Welcome back!</h1>

			<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>
				Create new link
			</Dialog.Trigger>
		</header>
		<NewLinkDialog form={data.form} />
	</Dialog.Root>
	<main class="grid grid-cols-[20rem_1fr] gap-8">
		<form method="POST" use:enhance action="?/logout">
			<Button variant="outline">Logout</Button>
		</form>
	</main>
</div>
