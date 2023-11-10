<script lang="ts">
	import DeleteLinkDialog from './delete-link-dialog.svelte';
	import { toast } from 'svelte-sonner';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import { Copy, ExternalLink, Trash2 } from 'lucide-svelte';
	import type { Shorturl } from '$lib/databaseItem.types';
	import type { ActionData } from './$types';

	export let item: Shorturl;
	export let formData: ActionData;

	function copyLink() {
		navigator.clipboard.writeText(`${window.location.origin}/${item.short_url}`);
		toast.success('Copied shorturl to clipboard!');
	}
</script>

<div class="flex items-center gap-2">
	<Button variant="outline" size="icon" class="relative w-8 h-8 p-0" on:click={copyLink}>
		<Copy class="w-4 h-4" />
		<span class="sr-only">Copy shorturl</span>
	</Button>
	<Button
		variant="outline"
		size="icon"
		class="relative w-8 h-8 p-0"
		on:click={() => window.open(`${window.location.origin}/${item.short_url}`, '_blank')}
	>
		<ExternalLink class="w-4 h-4" />
		<span class="sr-only">Open shorturl</span>
	</Button>
	<AlertDialog.Root open={formData?.deleteOpen}
		><AlertDialog.Trigger>
			<Button variant="destructive" size="icon" class="relative w-8 h-8 p-0">
				<Trash2 class="w-4 h-4" />
				<span class="sr-only">Delete Shorturl</span>
			</Button>
		</AlertDialog.Trigger><DeleteLinkDialog {item} /></AlertDialog.Root
	>
</div>
