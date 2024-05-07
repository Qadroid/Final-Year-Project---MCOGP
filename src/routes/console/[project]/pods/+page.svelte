<script lang=ts>
	import { Button } from "@/components/ui/button";
	import DataTable from "./data-table.svelte";
	import { Plus } from "lucide-svelte";
    export let data;
    let { podList } = data
</script>

<div class="px-8 pt-3 flex justify-between items-center">
    <h1 class="text-4xl font-bold">Pods</h1>
    <Button variant="outline" href="/console/+/containers/create">
        Create Pod
        <Plus class="h-5 w-5 ml-2" />
    </Button>
</div>


<div class="container mx-auto py-10">
    <DataTable {podList} />
</div>