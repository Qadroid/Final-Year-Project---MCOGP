<script lang='ts'>
  import { readable } from 'svelte/store';
  import { createTable, Render, Subscribe } from "svelte-headless-table";
  import * as Table from "$lib/components/ui/table";

  export let serviceList: service[];

  type service = {
      name: string,
      namespace: string,
      type: string,
      clusterIP: string,
      ports: string, 
      creationTimestamp: string,
  }

  let table;
  let columns;
  let initialized = false;

  table = createTable(readable(serviceList));
  
  columns = table.createColumns([
      table.column({ accessor: 'name', header: 'Name' }),
      table.column({ accessor: 'namespace', header: 'Namespace' }),
      table.column({ accessor: 'type', header: 'Type' }),
      table.column({ accessor: 'clusterIP', header: 'Cluster IP' }),
      table.column({ accessor: 'ports', header: 'Ports' }),
      table.column({ 
          accessor: 'creationTimestamp', 
          header: 'Creation Timestamp', 
          cell: ({ value }) => new Date(value).toLocaleString() 
      })
  ]);

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
                    {#if cell.id === "phase"}
                        <div class="">
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