<script lang="ts">
	import type { Link } from '$lib/databaseItem.types';

	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { writable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import ShorturlsTableActions from './shorturls-table-actions.svelte';
	import type { ActionData } from './$types';

	export let shorturls: Link[];
	export let formData: ActionData;

	let shorturlsStore = writable(shorturls);

	$: $shorturlsStore = shorturls;

	// Generate table
	const table = createTable(shorturlsStore);

	const columns = table.createColumns([
		table.column({
			accessor: 'title',
			header: 'Title'
		}),
		table.column({
			accessor: ({ slug }) => `/${slug}`,
			header: 'Slug'
		}),
		table.column({
			accessor: 'redirect_url',
			header: 'Redirect URL'
		}),
		table.column({
			accessor: (item) => item,
			header: '',
			cell: (item) => {
				return createRender(ShorturlsTableActions, { item: item.value, formData });
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="border rounded-md">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									{#if cell.id === 'title'}
										<div class="font-bold">
											<Render of={cell.render()} />
										</div>
									{:else}
										<Render of={cell.render()} />
									{/if}
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
