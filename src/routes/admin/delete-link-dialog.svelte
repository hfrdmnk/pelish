<script lang="ts">
	import { enhance } from '$app/forms';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import type { Link } from '$lib/databaseItem.types';

	export let item: Link;
</script>

<AlertDialog.Content>
	<AlertDialog.Header>
		<AlertDialog.Title
			>Are you absolutely sure that you want to delete {window.location
				.origin}/{item.slug}?</AlertDialog.Title
		>
		<AlertDialog.Description>
			This action cannot be undone. This will permanently delete all data associated with this
			shorturl.
		</AlertDialog.Description>
	</AlertDialog.Header>
	<AlertDialog.Footer>
		<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
		<form method="POST" action="?/delete" use:enhance>
			<input type="hidden" bind:value={item.id} name="id" />
			<Button variant="destructive">Delete</Button>
		</form>
	</AlertDialog.Footer>
</AlertDialog.Content>
