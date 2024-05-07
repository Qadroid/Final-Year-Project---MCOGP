<script lang=ts>
    export let projects;

    // For header
    import * as Select from '$lib/components/ui/select/index.js';
    import { Button } from '$lib/components/ui/button/index.js';
    import { Anchor, Plus } from 'lucide-svelte';
    import { goto } from '$app/navigation';

    $: selectedProjectName = projects[0].name;
  
    // $: {
    //     if (selectedProjectName) {
    //         redirect(301, `/console/${selectedProjectName}/dashboard`);
    //     }
    // }

    // For content    
    import { page } from '$app/stores';
    const navItems = [
        {
            sectionTitle: "Menu",
            sectionContent: [
                { title: "Dashboard", href: "dashboard" },
                { title: "Apps", href: "apps" },
            ],
        },
        {
            sectionTitle: "Advanced - Resources",
            sectionContent: [
                { title: "Containers", href: "containers" },
                { title: "Deployments", href: "deployments" },
                { title: "Services", href: "services" },
                { title: "Volumes", href: "volumes" },
                { title: "Ingress", href: "ingress" },
            ],
        },
        {
            sectionTitle: "Project",
            sectionContent: [
                { title: "Clusters", href: "clusters" },
                { title: "Nodes", href: "nodes" },
                { title: "Plan", href: "plan" }
            ]
        }
    ]

    let variant = "ghost"

    // For footer
    import * as Avatar from "$lib/components/ui/avatar/index.js";
	import { CircleUser, MessageCircle, SettingsIcon } from "lucide-svelte";


</script>

<div class="flex-col flex h-screen w-64 bg-zinc-950 border-r">
    
    <!-- Top bound -->
    
    <div class="flex-grow">
        
        <!-- Navbar header -->
        <div class="">
            <div class="space-x-1 flex h-15 p-2 items-center">
                <div>
                  <Button class="w-9 h-9 p-2" variant="outline" href="/">
                    <Anchor />
                  </Button>
                </div>
                <div>
                    <Select.Root 
                        selected={selectedProjectName}
                        onSelectedChange={(v) =>
                            v && (selectedProjectName = v.value)}
                    >
                        <Select.Trigger class="w-[200px]">
                        <Select.Value placeholder="Select a project" />
                        </Select.Trigger>
                        <Select.Content>
                        <Select.Group>
                            <Select.Label class="text-zinc-400 rounded-md bg-zinc-900 text-center opacity-70 m-1">Projects</Select.Label>
                            
                            {#each projects as project}
                                <Select.Item value={project.name} label="{project.name}"
                                >{project.name}</Select.Item
                                >
                            {/each} 
                            
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
        </div>
    
        <div class="border-b"/>
        
        <!-- Navbar content -->
        <div class="grow">
            <nav class="flex flex-col mt-1 space-y-2 p-5 border-zinc-900">
                {#each navItems as section}
                    <div class="m-1 px-2 py-1 h-7 text-left text-xs font-semibold text-zinc-300 bg-zinc-900 opacity-65 rounded-md">
                        {section.sectionTitle}
                    </div>
                    {#each section.sectionContent as button}
                        {#if ($page.url.pathname === "/console/" + selectedProjectName + "/" + button.href)} 
                            <Button class="menu-button w-full justify-start opacity-75 h-8" variant="default" href="/console/{selectedProjectName}/{button.href}">{button.title}</Button>
                        {:else}
                            <Button class="menu-button w-full justify-start opacity-75 h-8" variant="ghost" href="/console/{selectedProjectName}/{button.href}">{button.title}</Button>
                        {/if}
                    {/each}
                    <div id="separator">
                        <div class="pb-5"/>
                        <div class="border-b"/>
                        <div class="pb-5"/>
                    </div>
                    
                {/each}  
            </nav> 
        </div>

    </div>

    <!-- Bottom bound -->

    <!-- Navbar footer -->
    <div class="h-14 p-1 border-t">
        <div class="flex justify-between w-full space-x-3 p-1">
            <div class="flex p-1">
                <Button class="h-8 w-8 rounded-full" href='/console/account'>
                    <Avatar.Root class="w-8 h-8">
                        <!-- {#if link == null} -->
                            <CircleUser class="h-5 w-5" />
                        <!-- {:else} -->
                            <!-- <Avatar.Image src={} alt={user.displayName} /> -->
                        <!-- {/if} -->
                        <!-- <Avatar.Fallback>{}</Avatar.Fallback> -->
                    </Avatar.Root>
                </Button>
            </div>
            <div class="flex space-x-1">
                <Button class="h-9 w-9 p-2" variant="outline"><SettingsIcon /></Button>
                <Button class="h-9 w-9 p-2" variant="outline"><MessageCircle /></Button>
            </div>
        </div>
    </div>
</div>