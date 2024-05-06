<script lang=ts>
  import * as Select from '$lib/components/ui/select/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
	import { Anchor, Plus } from 'lucide-svelte';
</script>

<div class="space-x-1 flex h-15 p-2">
  <div>
    <Button class="w-9 h-9 p-2" variant="outline" href="/">
      <Anchor />
    </Button>
  </div>
  <div>
    <Select.Root>
      <Select.Trigger class="w-[200px]">
        <Select.Value placeholder="Select a project" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label class="text-zinc-400 rounded-md bg-zinc-900 text-center opacity-70 m-1">Projects</Select.Label>
          
            <!-- {#each projects as project}
              <Select.Item value={project} label="{project.projectName}"
                >{project.projectName}</Select.Item
              >
            {/each}   -->
            
        </Select.Group>
          <div class="m-1 mt-2">
            <Button class="w-full" disabled variant="outline">
                Create new project
              <Plus class="w-4 h-4 ml-2" />
            </Button>
          </div>
      </Select.Content>
      <Select.Input name="favoriteproject" />
    </Select.Root>
  </div>
</div>