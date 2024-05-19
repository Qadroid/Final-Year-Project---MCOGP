<script lang="ts">
	import { Button } from "@/components/ui/button";
	import { Plus } from "lucide-svelte";
	import DataTable from "./data-table.svelte";
	import { selectedProject } from "@/stores/projects";

    export let data
    let { namespaces } = data
</script>

<div class="px-8 pt-3 flex justify-between items-center">
    <h1 class="text-4xl font-bold">Namespaces</h1>
    <Button variant="outline" href="/console/{$selectedProject?.id}/namespaces/create">
        Create Namespace
        <Plus class="h-5 w-5 ml-2" />
    </Button>
</div>


<div class="container mx-auto py-10">
    <DataTable {namespaces} />
</div>
