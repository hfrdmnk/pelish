<script lang="ts">
	import type { Shorturl } from '$lib/databaseItem.types';

	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import ShorturlsTableActions from './shorturls-table-actions.svelte';

	export let shorturls: Shorturl[];

	// Generate table
	const table = createTable(readable(shorturls));

	const columns = table.createColumns([
		table.column({
			accessor: 'title',
			header: 'Title'
		}),
		table.column({
			accessor: ({ short_url }) => `/${short_url}`,
			header: 'Short URL'
		}),
		table.column({
			accessor: 'redirect_url',
			header: 'Redirect URL'
		}),
		table.column({
			accessor: (item) => item,
			header: '',
			cell: (item) => {
				return createRender(ShorturlsTableActions, { item: item.value });
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
