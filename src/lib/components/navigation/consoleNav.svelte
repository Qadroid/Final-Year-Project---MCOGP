<script lang="ts">
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";
  import { tick } from "svelte";
	import { Cog } from "lucide-svelte";
	import { Avatar } from "../ui/avatar";
 
  const projects = [
    {
      value: "projectA",
      label: "Project A",
    },
    {
      value: "projectB",
      label: "Project B",
    },
    {
      value: "projectC",
      label: "Project C",
    },
  ];
 
  let open = false;
  let value = "";
 
  $: selectedValue =
    projects.find((f) => f.value === value)?.label ??
    "Select a project...";
 
  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }
</script>

<div class="flex w-full justify-center bg-gray-600">
  <!-- Sidebar header -->
  <div id="sidebarHeader" class="w-full flex">
    <Avatar />
    <Popover.Root bind:open let:ids>
        <Popover.Trigger asChild let:builder>
          <Button
            builders={[builder]}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            class="w-[200px] justify-between"
          >
            {selectedValue}
            <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </Popover.Trigger>
        <Popover.Content class="w-[200px] p-0">
          <Command.Root>
            <Command.Input placeholder="Search projects..." />
            <Command.Empty>No project found.</Command.Empty>
            <Command.Group>
              {#each projects as project}
                <Command.Item
                  value={project.value}
                  onSelect={(currentValue) => {
                    value = currentValue;
                    closeAndFocusTrigger(ids.trigger);
                  }}
                >
                  <Check
                    class={cn(
                      "mr-2 h-4 w-4",
                      value !== project.value && "text-transparent"
                    )}
                  />
                  {project.label}
                </Command.Item>
              {/each}
            </Command.Group>
          </Command.Root>
        </Popover.Content>
      </Popover.Root>
    </div>
    <div id="sidebarContent" class="w-full">
      <Button variant="outline" class="w-full" href="/console">Dashboard</Button>
      <Button variant="outline" class="w-full" href="/console/apps">Apps</Button>
      <Button variant="outline" class="w-full" href="/console/deployments">Deployments</Button>
      <Button variant="outline" class="w-full" href="/console/resources">Resources</Button>
    </div>
    <div id="sidebarFooter" class="w-full flex float-left"> 
      <Button variant="secondary" class="w-12 h-12" href="/console/account"><Avatar /></Button>
      <Button variant="secondary" class="w-12 h-12" href="/console/settings"><Cog /></Button>
    </div>
</div>