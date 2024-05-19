<script lang="ts">
    import Ellipsis from "lucide-svelte/icons/ellipsis";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Button } from "$lib/components/ui/button";
	import { selectedProject } from "@/stores/projects";
   
    export let id: string;
    
    async function handleNodeDelete() {
        const res = await fetch(`/api/nodes/${id}`, {
            method: "DELETE",
        });
    }
</script>
   
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button
        variant="ghost"
        builders={[builder]}
        size="icon"
        class="relative h-8 w-8 p-0"
      >
        <span class="sr-only">Open menu</span>
        <Ellipsis class="h-4 w-4" />
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Group>
        <DropdownMenu.Label>Actions</DropdownMenu.Label>
        <DropdownMenu.Item on:click={() => navigator.clipboard.writeText(id)}>
          Copy Node Name
        </DropdownMenu.Item>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <DropdownMenu.Item on:click={handleNodeDelete}>Delete Node</DropdownMenu.Item>
      <DropdownMenu.Item href="/console/{$selectedProject?.id}/pods/${id}">View Node details</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>