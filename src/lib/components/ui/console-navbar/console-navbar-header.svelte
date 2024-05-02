<script lang=ts>
    import * as Avatar from '$lib/components/ui/avatar/index.js';
    import * as Select from '$lib/components/ui/select/index.js';
	  import { Button } from '$lib/components/ui/button/index.js';
	import { Anchor, Plus } from 'lucide-svelte';
   
    const projects = [
      { value: "default", label: "default" },
      { value: "hr", label: "hr" },
      { value: "research", label: "research" },
      { value: "web-app", label: "web-app" },
      { value: "load-balancer", label: "load-balancer" }
    ];
</script>

<div class="">
  <!-- <p class="text-zinc-500 text-sm">Project:</p> -->
  <Button class="w-9 h-9 p-2" variant="outline" href="/">
    <Anchor class="" />
  </Button>
</div>
<div class="">
  <Select.Root>
    <Select.Trigger class="w-[200px]">
      <Select.Value placeholder="Select a project" />
    </Select.Trigger>
    <Select.Content>
      <Select.Group>
        <Select.Label class="text-zinc-400 rounded-md bg-zinc-900 text-center opacity-70">Projects</Select.Label>
        {#each projects as project}
          <Select.Item value={project.value} label="{project.label}"
            >{project.label}</Select.Item
          >
        {/each}
      </Select.Group>
      <Button class="w-full mt-1" variant="outline">
        Create new project
        <Plus class="w-4 h-4 ml-2" />
      </Button>
    </Select.Content>
    <Select.Input name="favoriteproject" />
  </Select.Root>
</div>