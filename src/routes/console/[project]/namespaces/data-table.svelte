<script lang="ts">
  import { createTable, Render, Subscribe, createRender } from "svelte-headless-table";
  import * as Table from "$lib/components/ui/table";
  import DataTableActions from './data-table-actions.svelte';
	import { onMount } from "svelte";
	import { readable } from "svelte/store";

  export let namespaces: namespace[];

  type namespace = {
    name: string,
    creationTimeStamp: string,
    phase: string,
    label: string,
  }

  let table;
  let columns;
  let initialized = false;

  table = createTable(readable(namespaces))

  columns = table.createColumns([
    table.column({ accessor: 'name', header: 'Name' }),
    table.column({ 
      accessor: 'creationTimeStamp',
      header: 'Creation Time',
      cell: ({ value }) => {
        const formatted = new Date(value).toLocaleString();
        return formatted 
      }
    }),
    table.column({ accessor: 'phase', header: 'Phase' }),
    table.column({ accessor: 'label', header: 'Label' }),
    table.column({
      accessor: ({ name }) => name,
      header: '',
      cell: ({ value }) => {
        return createRender(DataTableActions, { id: value });
      }
    })
  ])

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs } =
      table.createViewModel(columns);
</script>

<div class="rounded-md border max-h-full">
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
                  <Render of={cell.render()} />
                </Table.Cell>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
