
<script lang=ts>
	import { Button } from "@/components/ui/button";
	// import DataTable from "./data-table.svelte";
	import { Plus } from "lucide-svelte";
    export let data;
    let { volumeList } = data
</script>

<div class="px-8 pt-3 flex justify-between items-center">
    <h1 class="text-4xl font-bold">Volumes</h1>
    <Button variant="outline" href="/console/+/volumes/create">
        Create Volume
        <Plus class="h-5 w-5 ml-2" />
    </Button>
</div>


<div class="container mx-auto py-10">
    <!-- <DataTable {volumeList} /> -->
</div>

