<script lang=ts>
	import { Button } from "@/components/ui/button";
	import DataTable from "./data-table.svelte";
	import { Plus } from "lucide-svelte";
	import { selectedProject } from "@/stores/projects";
    
    export let data;
    let { volumes } = data
</script>

<div class="px-8 pt-3 flex justify-between items-center">
    <h1 class="text-4xl font-bold">Volumes</h1>
    <Button variant="outline" href="/console/{$selectedProject?.id}/volumes/create">
        Create Volume
        <Plus class="h-5 w-5 ml-2" />
    </Button>
</div>


<div class="container mx-auto py-10">
    <DataTable {volumes} />
</div>