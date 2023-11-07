<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import * as Dialog from '$lib/components/ui/dialog';
	import NewLinkDialog from './new-link-dialog.svelte';
	import ShorturlsTable from './shorturls-table.svelte';

	export let data;
	export let form;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	$: if (form?.success) {
		if (form?.action === 'create') {
			toast.success('Link created successfully!');
		}

		if (form?.action === 'delete') {
			toast.success('Link deleted successfully!');
		}
	}

	$: if (!form?.success) {
		if (form?.action === 'delete') {
			toast.error('There was an error deleting the link.');
		}
	}
</script>

<div class="container mt-8">
	<Dialog.Root open={form?.open}>
		<header class="flex justify-between mb-16">
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
		<div>
			<ShorturlsTable shorturls={data.shorturls} />
		</div>
	</main>
</div>
