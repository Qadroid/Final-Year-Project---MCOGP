<script lang='ts'>
  import { readable } from 'svelte/store';
  import { createTable, Render, Subscribe, createRender } from "svelte-headless-table";
  import * as Table from "$lib/components/ui/table";
  import DataTableActions from './data-table-actions.svelte';

  export let nodes: node[];

  type node = {
    name: string,
    status: string,
    age: number,
    architecture: string,
    kubeletVersion: string,
  }

  let table;
  let columns;
  let initialized = false;

  table = createTable(readable(nodes))
  
  columns = table.createColumns([
      table.column({ accessor: 'name', header: 'Name' }),
      table.column({ accessor: 'status', header: 'Status' }),
      table.column({ accessor: 'age', header: 'Age (days)' }),
      table.column({ accessor: 'architecture', header: 'Architecture' }),
      table.column({ accessor: 'kubeletVersion', header: 'Kubelet Version' }),
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