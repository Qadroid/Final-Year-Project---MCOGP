<script lang=ts>
	import DataTable from "./data-table.svelte";
    export let data;
    let { podList } = data
</script>

<div class="p-6">
    <h1 class="text-5xl font-bold">Pods</h1>
</div>


<div class="container mx-auto py-10">
    <DataTable {podList} />
</div>