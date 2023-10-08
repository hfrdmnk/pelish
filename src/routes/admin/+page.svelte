<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import type { Database } from '$lib/database.types';
	import { toast } from 'svelte-sonner';
	import * as Dialog from '$lib/components/ui/dialog';
	import NewLinkDialog from './NewLinkDialog.svelte';

	export let data;
	export let form;

	$: if (form?.success) {
		if (form?.action === 'create') {
			toast.success('Link created successfully!');
		}

		if (form?.action === 'delete') {
			toast.success('Link deleted successfully!');
		}
		getShortUrls();
	}

	$: if (!form?.success) {
		if (form?.action === 'delete') {
			toast.error('There was an error deleting the link.');
		}
	}

	let shorturls: Database['public']['Tables']['links']['Row'][];
	async function getShortUrls() {
		if (!data.session) return;
		const { data: result } = await data.supabase
			.from('links')
			.select('*')
			.eq('owner_id', data.session.user.id)
			.order('created_at', { ascending: false });

		result ? (shorturls = result) : [];
	}

	$: if (data.session) {
		getShortUrls();
	}

	const handleDeleteLink = async (id: string) => {
		const { error } = await data.supabase.from('links').delete().eq('id', id);

		if (error) {
			toast.error('There was an error deleting the link.');
		} else {
			toast.success('Link deleted successfully!');
			getShortUrls();
		}
	};
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
		<div>
			{#if shorturls}
				{#each shorturls as shorturl}
					<h2 class="font-bold">{shorturl.title}</h2>
					<p>
						/{shorturl.short_url} &rightarrow; {shorturl.redirect_url}
					</p>
					<form method="POST" use:enhance action="?/deletelink">
						<input type="hidden" name="id" value={shorturl.id} />
						<Button>Delete</Button>
					</form>
				{/each}
			{/if}
		</div>
	</main>
</div>
